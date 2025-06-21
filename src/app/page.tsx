'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { CHAIN_NAMESPACES, IProvider } from '@web3auth/base';
import TonWeb from 'tonweb';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
}

export default function Home() {
  const router = useRouter();
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [status, setStatus] = useState<string>('Initializing...');
  const [tonAddress, setTonAddress] = useState<string>('');
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || '';
        const web3authInstance = new Web3AuthNoModal({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.OTHER,
            ticker: "TON",
            displayName: "TON Mainnet",
          },
          web3AuthNetwork: "sapphire_mainnet",
        });

        const openloginAdapter = new OpenloginAdapter();
        web3authInstance.configureAdapter(openloginAdapter);
        await web3authInstance.init();
        
        setWeb3auth(web3authInstance);

        if (web3authInstance.provider) {
          await getTonAddress(web3authInstance.provider);
        } else {
          setStatus('Ready to Login');
        }

      } catch (error) {
        console.error(error);
        setStatus('Initialization failed');
      }
    };
    init();
  }, []);

  const getTonAddress = async (provider: IProvider) => {
    setStatus('Getting TON Address...');
    const tonweb = new TonWeb(new TonWeb.HttpProvider());
    const privateKey = await provider.request({ method: "private_key" });
    const keyPair = TonWeb.utils.keyPairFromSeed(TonWeb.utils.hexToBytes(privateKey as string));
    const wallet = tonweb.wallet.create({ publicKey: keyPair.publicKey });
    const address = await wallet.getAddress();
    setTonAddress(address.toString(true, true, true));
    setStatus('Logged In!');
  };

  const handleLogin = async () => {
    if (!web3auth) {
      console.log("Web3Auth not initialized yet");
      return;
    }

    try {
      setStatus('Verifying User...');
       const tg = window.Telegram?.WebApp;

      if (!tg) {
        throw new Error("Not running inside a Telegram Mini App");
      }
      
      const initData = new URLSearchParams(tg.initData);
      const user = JSON.parse(initData.get('user') || '{}') as TelegramUser;
      setTelegramUser(user);
      
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(initData)),
      });

      if (!response.ok) {
        throw new Error('Telegram user verification failed.');
      }
      
      setStatus('Verification successful, logging in...');

      const provider = await web3auth.connectTo('openlogin', {
        loginProvider: 'jwt',
        extraLoginOptions: {
          id_token: btoa(tg.initData),
          verifierIdField: 'id',
          domain: "https://nodius-wallet.vercel.app" 
        },
      });

      if (provider) {
        await getTonAddress(provider);
      }
    } catch (error) {
      console.error(error);
      setStatus('Login Failed');
    }
  };
  
  useEffect(() => {
    if (tonAddress) {
      const timer = setTimeout(() => router.push('/dashboard'), 1500);
      return () => clearTimeout(timer);
    }
  }, [tonAddress, router]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-background text-foreground">
      <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      <p className="mt-4 text-lg">{status}</p>
      {status === 'Ready to Login' && (
        <Button onClick={handleLogin} className="mt-6">
          Login with Telegram
        </Button>
      )}
      {tonAddress && (
        <div className="mt-4 text-center">
            <p>Welcome, {telegramUser?.first_name || 'User'}!</p>
            <p className="text-xs text-gray-500 break-all">{tonAddress}</p>
        </div>
      )}
    </div>
  );
}
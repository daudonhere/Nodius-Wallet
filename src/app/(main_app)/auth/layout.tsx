'use client';

import { PrivySync } from './components/PrivySync';
import { PrivyProvider } from '@privy-io/react-auth';


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivyProvider 
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        config={{
            appearance: {
            accentColor: "#ff00c8",
            theme: "dark",
            showWalletLoginFirst: false,
            // logo: "logo.png",
        },
        loginMethods: [
            "google",
            "telegram",
            "wallet"
        ],
        embeddedWallets: {
            ethereum: {
                createOnLogin: undefined
            },
            solana: {
                createOnLogin: undefined
            },
                requireUserPasswordOnCreate: false,
            },
        }}
    >
        <PrivySync/>
        {children}
    </PrivyProvider>
  );
}
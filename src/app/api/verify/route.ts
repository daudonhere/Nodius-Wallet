import { NextRequest, NextResponse } from 'next/server';
import { validate, parse } from '@telegram-apps/init-data-node';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { initData } = await req.json();

    if (!initData) {
      return NextResponse.json({ error: 'initData is required' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const jwtPrivateKey = process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const keyId = process.env.JWT_KEY_ID;
    const web3AuthClientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID;

    if (!botToken || !jwtPrivateKey || !keyId || !web3AuthClientId) {
      throw new Error('Server environment variables are not fully configured.');
    }

    await validate(initData, botToken, { expiresIn: 3600 });
    const parsedData = parse(initData);
    
    if (!parsedData.user || !parsedData.user.id) {
        throw new Error("User data is missing or invalid in initData.");
    }

    const payload = {
      sub: parsedData.user.id.toString(),
      name: parsedData.user.firstName,
      aud: web3AuthClientId, 
      iss: "NodiusWallet",
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    };

    const idToken = jwt.sign(
      payload,
      jwtPrivateKey,
      {
        algorithm: 'RS256',
        header: {
          alg: 'RS256',
          kid: keyId,
          typ: 'JWT'
        }
      }
    );

    return NextResponse.json({ token: idToken }, { status: 200 });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown server error occurred';
    console.error("Verification API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function GET() {
  try {
    const publicKeyPem = process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n');
    const kid = process.env.JWT_KEY_ID;

    if (!publicKeyPem || !kid) { throw new Error('JWKS env vars not set.'); }

    const publicKey = await jose.importSPKI(publicKeyPem, 'RS256');
    const jwk = await jose.exportJWK(publicKey);

    const jwks = { keys: [{ ...jwk, kid: kid, use: 'sig', alg: 'RS256' }] };
    return NextResponse.json(jwks);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
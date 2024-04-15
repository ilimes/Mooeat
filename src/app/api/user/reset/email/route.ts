import { NextRequest, NextResponse, userAgent } from 'next/server';

export async function POST(req: NextRequest) {
  const email = await req.json();

  const headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.PNfKo6O33BzNllo7lUaKTz2sgm8GOpcuKxcZddllbDg',
  };

  const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/reset/email`, {
    cache: 'no-store',
    method: 'POST',
    headers,
    body: email ? JSON.stringify({ email }) : undefined,
  });

  const data = await res.json();

  return NextResponse.json({ data });
}

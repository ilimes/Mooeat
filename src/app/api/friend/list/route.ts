import { NextRequest, NextResponse, userAgent } from 'next/server';
import { headers } from 'next/headers'

export async function POST(req: NextRequest) {
  const user_seq = await req.json();
  
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/list`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user_seq)
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
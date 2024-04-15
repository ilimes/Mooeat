import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/list`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}

import { NextRequest, NextResponse, userAgent } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  const formData = await req.json();

  let headers: any = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: formData?.token,
  }
  if (formData?.type) {
    headers.type = formData?.type
  }

  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/info`, {
    cache: 'no-store',
    method: 'POST',
    headers,
    body: formData?.type ? JSON.stringify(formData?.user) : undefined
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { headers } from 'next/headers';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const session: any = await getToken({ req, secret, /* raw: true */ })
  
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/statistics`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: session?.user?.data?.token
    },
    body: JSON.stringify(formData)
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  // const { ua } = userAgent(req);

  // const headersList = headers();
  // const ip = headersList.get("x-forwarded-for");
  // console.log(ip)
  
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/menu/list`, {
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
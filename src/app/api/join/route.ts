import { NextRequest, NextResponse, userAgent } from 'next/server';
import { headers } from 'next/headers';
import { NextApiRequest } from 'next';

export async function PUT(req: NextRequest) {
  // const { ua } = userAgent(req);

  // const headersList = headers();
  // const ip = headersList.get("x-forwarded-for");
  // console.log(ip)
  const body = await req.json();
  
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/put`, {
    cache: 'no-store',
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
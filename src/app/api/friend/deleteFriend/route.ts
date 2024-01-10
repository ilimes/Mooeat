import { NextRequest, NextResponse, userAgent } from 'next/server';
import { headers } from 'next/headers';
import { NextApiRequest } from 'next';

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  
  const res = await fetch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/deleteFriend`, {
    cache: 'no-store',
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  return NextResponse.json({ data });
}
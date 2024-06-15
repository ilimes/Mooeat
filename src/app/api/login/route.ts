import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('로그인 API 호출 시작');
    const body = await req.json();
    console.log('요청 바디:', body);

    const backendUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/login`;
    console.log('백엔드 URL:', backendUrl);

    const res = await fetch(backendUrl, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`백엔드 요청 실패: ${res.status} ${res.statusText}, 응답 내용: ${errorText}`);
      return NextResponse.json({ error: '백엔드 요청 실패' }, { status: res.status });
    }

    const data = await res.json();
    console.log('백엔드 응답 데이터:', data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error('로그인 API 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

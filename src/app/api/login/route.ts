import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const pre = process.env.NEXT_PUBLIC_BACKEND_URL === '127.0.0.1:5000' ? 'http://' : 'https://';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendUrl = `${pre}${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/login`;

    const res = await axios.post(backendUrl, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({ data: res.data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(
        `백엔드 요청 실패: ${error.response.status} ${error.response.statusText}, 응답 내용: ${error.response.data}`,
      );
      return NextResponse.json({ error: '백엔드 요청 실패' }, { status: error.response.status });
    }
    console.error('로그인 API 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

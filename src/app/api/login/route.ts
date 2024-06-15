import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    console.log('로그인 API 호출 시작');
    const body = await req.json();
    console.log('요청 바디:', body);

    const backendUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/login`;
    console.log('백엔드 URL:', backendUrl);

    const res = await axios.post(backendUrl, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('백엔드 응답 데이터:', res.data);

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

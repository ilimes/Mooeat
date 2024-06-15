import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const pre = process.env.NEXT_PUBLIC_BACKEND_URL === '127.0.0.1:5000' ? 'http://' : 'https://';

export async function POST(req: NextRequest) {
  try {
    console.log('유저 정보 API 호출 시작');
    const formData = await req.json();
    console.log('요청 바디:', formData);

    const backendUrl = `${pre}${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/info`;
    console.log('백엔드 URL:', backendUrl);

    const headers: any = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: formData?.token,
    };

    if (formData?.type) {
      headers.type = formData?.type;
    }

    const res = await axios.post(backendUrl, formData?.type ? formData?.user : {}, {
      headers,
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
    console.error('유저 정보 API 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

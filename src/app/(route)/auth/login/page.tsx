'use client'

import { useEffect } from "react";
import { Alert, Button, message } from "antd";
import styled from "styled-components";
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import Mail from '@/public/svg/mail.svg';
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const required = searchParams?.get('required');
  const success = searchParams?.get('success');

  return (
    <div style={{ marginTop: 30 }}>
      {
        required &&
        <div className="fade" style={{ marginBottom: 20 }}>
          <Alert message="로그인 후 이용 가능한 서비스입니다." type="warning" showIcon style={{ fontSize: 14 }} />
        </div>
      }
      {
        success &&
        <div className="fade" style={{ marginBottom: 20 }}>
          <Alert message="성공적으로 가입되었습니다." type="success" showIcon style={{ fontSize: 14 }} />
        </div>
      }
      <Title>Mooeat 로그인</Title>
      <Explain>Mooeat에 로그인 합니다.</Explain>
      <div style={{ margin: '40px 0' }}>
        <RegisterButton icon={<Kakao style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom', fill: '#3C1E1E' }} />} onClick={() => signIn('kakao')} style={{ background: '#FAE100', color: '#3C1E1E' }}>카카오로 로그인</RegisterButton>
        <RegisterButton icon={<GoogleIcon style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />} onClick={() => message.info('준비중 입니다.')}>구글로 로그인</RegisterButton>
        <RegisterButton type="primary" icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />} onClick={() => router.push('/auth/login/email')}>이메일로 로그인</RegisterButton>
      </div>
      <BtnGroup>
        <StyledSpan onClick={() => router.push('/auth/passwordIssue')} style={{ marginLeft: 0 }}>비밀번호 재설정</StyledSpan>{/*  · <StyledSpan onClick={() => router.push('/auth/findAccount')}>계정 찾기</StyledSpan> */}
        {" "} · {" "}
        <StyledSpan onClick={() => router.push('/auth/join')}>회원가입</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default Login;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

export const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

export const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`

export const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
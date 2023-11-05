'use client'

import { Button } from "antd";
import styled from "styled-components";
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import Mail from '@/public/svg/mail.svg';
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <div style={{ marginTop: 30 }}>
      <Title>Mooeat 로그인</Title>
      <Explain>Mooeat에 로그인 합니다.</Explain>
      <RegisterButton icon={<GoogleIcon style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>구글로 로그인</RegisterButton>
      <RegisterButton icon={<Kakao style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>카카오로 로그인</RegisterButton>
      <RegisterButton icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />} onClick={() => router.push('/auth/login/email')}>이메일로 로그인</RegisterButton>
      <BtnGroup>
        <StyledSpan onClick={() => router.push('/auth/passwordIssue')} style={{ marginLeft: 0 }}>비밀번호 재설정</StyledSpan> · <StyledSpan onClick={() => router.push('/auth/findAccount')}>계정 찾기</StyledSpan> · <StyledSpan onClick={() => router.push('/auth/join')}>회원가입</StyledSpan>
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
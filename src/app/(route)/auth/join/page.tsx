'use client'

import { Button, Tooltip } from "antd";
import styled from "styled-components";
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import Mail from '@/public/svg/mail.svg';
import { useRouter } from "next/navigation";

const Join = () => {
  const router = useRouter();
  return (
    <div style={{ marginTop: 30 }}>
      <Title>Mooeat 회원가입</Title>
      <Explain>Mooeat에 회원가입 합니다.</Explain>
      <RegisterButton icon={<GoogleIcon style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>구글로 회원가입</RegisterButton>
      <Tooltip title={'3초만에 시작할 수 있어요!'}>
        <RegisterButton icon={<Kakao style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>카카오로 회원가입</RegisterButton>
      </Tooltip>
      <RegisterButton icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />} onClick={() => router.push('/auth/join/email')}>이메일로 회원가입</RegisterButton>
      <BtnGroup>
        <span>이미 계정이 있으신가요?</span>
        <StyledSpan onClick={() => router.push('/auth/login')}>로그인</StyledSpan>
      </BtnGroup>
      <BtnGroup>
        <StyledSpan style={{ marginLeft: 0 }} onClick={() => router.push('/auth/findAccount')}>계정 찾기</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default Join;

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
'use client'

import { Button, Tooltip, message } from "antd";
import styled from "styled-components";
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import Mail from '@/public/svg/mail.svg';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState } from 'react';
import TopTitle from "@/components/SharedComponents/TopTitle";

const Join = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <div style={{ marginTop: 30 }}>
      <TopTitle title="Mooeat 회원가입" explain="Mooeat에 회원가입 합니다." />
      <div style={{ margin: '40px 0' }}>
        <Tooltip placement="topRight" title={'3초만에 시작할 수 있어요!'} open={open} zIndex={1} overlayStyle={{ fontWeight: 700, fontSize: 13 }}>
          <RegisterButton icon={<Kakao style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom', fill: '#3C1E1E' }} />} onClick={() => signIn('kakao')} style={{ background: '#FAE100', color: '#3C1E1E' }}>카카오로 회원가입</RegisterButton>
        </Tooltip>
        <RegisterButton icon={<GoogleIcon style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />} onClick={() => signIn('google')}>구글로 회원가입</RegisterButton>
        <RegisterButton type="primary" icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />} onClick={() => router.push('/auth/join/email')}>이메일로 회원가입</RegisterButton>
      </div>
      <BtnGroup>
        <span>이미 계정이 있으신가요?</span>
        <StyledSpan onClick={() => router.push('/auth/login')}>로그인</StyledSpan>
      </BtnGroup>
      <BtnGroup>
        <StyledSpan style={{ marginLeft: 0 }} onClick={() => router.push('/auth/passwordIssue')}>비밀번호 재설정</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default Join;

const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`

const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`
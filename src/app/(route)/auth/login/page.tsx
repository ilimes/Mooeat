'use client';

import { Button, message } from 'antd';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import GoogleIcon from '@/public/svg/google.svg';
import Kakao from '@/public/svg/kakao.svg';
import Mail from '@/public/svg/mail.svg';
import TopTitle from '@/src/components/SharedComponents/TopTitle';
import TopMsg from '@/src/components/Login/TopMsg';

const Login = () => {
  const router = useRouter();

  return (
    <div style={{ marginTop: 30 }}>
      <TopMsg />
      <TopTitle title="Mooeat 로그인" explain="Mooeat에 로그인 합니다." />
      <div style={{ margin: '40px 0' }}>
        <RegisterButton
          icon={
            <Kakao
              style={{
                width: 20,
                height: 20,
                margin: '0 10px',
                verticalAlign: 'text-bottom',
                fill: '#3C1E1E',
              }}
            />
          }
          onClick={() => signIn('kakao')}
          style={{ background: '#FAE100', color: '#3C1E1E' }}
        >
          카카오로 로그인
        </RegisterButton>
        <RegisterButton
          icon={
            <GoogleIcon
              style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }}
            />
          }
          onClick={() => signIn('google')}
        >
          구글로 로그인
        </RegisterButton>
        <RegisterButton
          type="primary"
          icon={
            <Mail
              style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }}
            />
          }
          onClick={() => router.push('/auth/login/email')}
        >
          이메일로 로그인
        </RegisterButton>
      </div>
      <BtnGroup>
        <StyledSpan onClick={() => router.push('/auth/passwordIssue')} style={{ marginLeft: 0 }}>
          비밀번호 재설정
        </StyledSpan>
        {/*  · <StyledSpan onClick={() => router.push('/auth/findAccount')}>계정 찾기</StyledSpan> */}{' '}
        · <StyledSpan onClick={() => router.push('/auth/join')}>회원가입</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default Login;

const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`;

const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

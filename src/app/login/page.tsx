'use client'

import { Button } from "antd";
import styled from "styled-components";
import GoogleIcon from '../../../public/svg/google.svg';
import Kakao from '../../../public/svg/kakao.svg';
import Mail from '../../../public/svg/mail.svg';

const Login = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <Title>Mooeat 로그인</Title>
      <Explain>Mooeat에 로그인 합니다.</Explain>
      <RegisterButton icon={<GoogleIcon style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>구글로 로그인</RegisterButton>
      <RegisterButton icon={<Kakao style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>카카오로 로그인</RegisterButton>
      <RegisterButton icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>이메일로 로그인</RegisterButton>
      <BtnGroup>
        <span>비밀번호 재설정</span> · <span>계정 찾기</span> · <span>회원가입</span>
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
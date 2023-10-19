'use client'

import { Button } from "antd";
import styled from "styled-components";
import GoogleIcon from '../../../public/svg/google.svg';
import Kakao from '../../../public/svg/kakao.svg';
import Mail from '../../../public/svg/mail.svg';

const Join = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <Title>Mooeat 회원가입</Title>
      <Explain>Mooeat에 회원가입 합니다.</Explain>
      <RegisterButton icon={<GoogleIcon style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>구글로 회원가입</RegisterButton>
      <RegisterButton icon={<Kakao style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>카카오로 회원가입</RegisterButton>
      <RegisterButton icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>이메일로 회원가입</RegisterButton>
      <BtnGroup>
        <span>이미 계정이 있으신가요?</span>
      </BtnGroup>
      <BtnGroup>
        <span>계정 찾기</span>
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
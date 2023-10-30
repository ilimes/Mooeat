'use client'

import { Button } from "antd";
import styled from "styled-components";
import Mail from '@/public/svg/mail.svg';
import { useRouter } from "next/navigation";

const FindId = () => {
  const router = useRouter();
  return (
    <div style={{ marginTop: 30 }}>
      <Title>계정 찾기</Title>
      <Explain>아래 방법 중 한 가지를 선택하여 계정을 찾을 수 있습니다.</Explain>
      <RegisterButton icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>이메일로 계정찾기</RegisterButton>
      <BtnGroup>
        위 방법으로 계정을 찾을 수 없나요? <StyledSpan onClick={() => router.push('/help')}>문의하기</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default FindId;

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
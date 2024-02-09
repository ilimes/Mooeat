'use client'

import { Button } from "antd";
import styled from "styled-components";
import Mail from '@/public/svg/mail.svg';
import { useRouter } from "next/navigation";
import TopTitle from "@/components/SharedComponents/TopTitle";

const FindId = () => {
  const router = useRouter();
  return (
    <div style={{ marginTop: 30 }}>
      <TopTitle title="계정 찾기" explain="아래 방법 중 한 가지를 선택하여 계정을 찾을 수 있습니다." />
      <div style={{ margin: '40px 0' }}>
        <RegisterButton type="primary" icon={<Mail style={{ width: 20, height: 20, margin: '0 10px', verticalAlign: 'text-bottom' }} />}>이메일로 계정찾기</RegisterButton>
      </div>
      <BtnGroup>
        위 방법으로 계정을 찾을 수 없나요? <StyledSpan onClick={() => router.push('/service')}>문의하기</StyledSpan>
      </BtnGroup>
    </div>
  );
};

export default FindId;

const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
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
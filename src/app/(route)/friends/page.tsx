'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Friends = () => {
  const router = useRouter();
  return (
    <div>
      <Title>친구목록</Title>
      <Explain>친구목록 입니다.</Explain>
      ㅇ
    </div>
  );
};

export default Friends;

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
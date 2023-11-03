'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Feed = () => {
  const router = useRouter();
  return (
    <div>
      <Title>피드</Title>
      <Explain>친구 및 구독한 유저의 글을 모아서 볼 수 있는 공간입니다.</Explain>
      ㅇ
    </div>
  );
};

export default Feed;

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
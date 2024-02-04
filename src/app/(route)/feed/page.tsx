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

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`
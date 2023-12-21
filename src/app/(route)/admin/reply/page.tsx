'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Reply = () => {
  const router = useRouter();
  return (
    <div>
      <Title>댓글 관리</Title>
      <Explain>댓글 관리 화면</Explain>
    </div>
  );
};

export default Reply;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`
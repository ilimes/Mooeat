'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";

const Share = () => {
  const router = useRouter();
  return (
    <div>
      <Title>공유하기</Title>
      <Explain>등록된 친구에게 내 식단을 공유해보세요.</Explain>
      <FileUpload />
    </div>
  );
};

export default Share;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`
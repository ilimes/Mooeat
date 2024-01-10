'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";

const Share = () => {
  const router = useRouter();
  return (
    <div>
      <Title>공유하기</Title>
      <Explain>등록된 친구에게 내 식단을 공유해보세요.</Explain>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Image src={"/img/share/share.png"} alt='Attendance' width={300} height={210} />
      </div>
      <FileUpload />
      <div style={{ marginTop: 10, textAlign: 'right' }}>
        <Button type="primary" style={{ width: 130, height: 50, fontWeight: 600 }}>공유하기</Button>
      </div>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <a href="https://kr.freepik.com/free-vector/colorful-icons-set-style_12067938.htm#query=share&position=5&from_view=search&track=sph&uuid=ff78e392-b332-4598-ac8b-18451751f2c3">작가 coolvector</a> 출처 Freepik
      </div>
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
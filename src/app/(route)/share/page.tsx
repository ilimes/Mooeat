'use client'

import { Button, Col, Input, Row, Select } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/FileUpload";
import Image from "next/image";

const Titles = ({name, required} : {name: string, required: boolean}) => {
  return (
    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 7 }}>
      <span>{name}</span> {required && <span style={{ color: 'red' }}>(*)</span>}
    </div>
  )
}

const Share = () => {
  const router = useRouter();
  return (
    <div>
      <Title>공유하기</Title>
      <Explain>등록된 친구에게 내 식단을 공유해보세요.</Explain>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <Image src={"/img/share/share.png"} alt='Attendance' width={300} height={210} />
      </div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <Titles name="대상 선택" required />
              <Select placeholder="공유할 친구를 선택해주세요." style={{ width: '100%' }} size="large" />
            </div>
            <div>
              <Titles name="내용" required />
              <Input.TextArea placeholder="내용을 작성해주세요." style={{ resize: 'none', height: 196 }} size="large" />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <FileUpload />
        </Col>
      </Row>
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
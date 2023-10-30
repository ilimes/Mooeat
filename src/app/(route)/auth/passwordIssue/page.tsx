'use client'

import { Button, Input } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const PasswordIssue = () => {
  const router = useRouter();
  return (
    <div style={{ marginTop: 30 }}>
      <Title>비밀번호 재설정</Title>
      <Explain>가입 시 입력한 이메일 주소로 재설정 메일을 보내드립니다.</Explain>
      <Input placeholder="이메일 주소" style={{ height: 40, marginBottom: 10 }} />
      <Button type="primary" htmlType="submit" style={{ width: '100%', height: 47, fontWeight: 'bold', fontSize: 14 }}>
        이메일 전송
      </Button>
    </div>
  );
};

export default PasswordIssue;

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
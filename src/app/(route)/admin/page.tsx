'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import LineChartComponent from '@/components/Admin/LineChartComponent';

const Admin = () => {
  const router = useRouter();
  return (
    <div>
      <Title>관리자 페이지 홈</Title>
      <Explain>관리자 페이지 메인 화면</Explain>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <div style={{ padding: 20, border: '1px solid #E1E1E2' }}>
          관리자 페이지 메인화면 작업중 ...
        </div>
        <div style={{ padding: 20, border: '1px solid #E1E1E2', height: 300 }}>
          <LineChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Admin;

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
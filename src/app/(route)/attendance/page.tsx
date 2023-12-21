'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Attendance = () => {
  const router = useRouter();
  return (
    <div>
      <Title>출석체크</Title>
      <Explain>출석체크 하는곳</Explain>
      ㅇ
    </div>
  );
};

export default Attendance;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`
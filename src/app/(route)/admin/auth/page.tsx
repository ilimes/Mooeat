'use client'

import React from 'react';
import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  return (
    <div>
      <Title>권한 관리</Title>
      <Explain>권한 관리 화면</Explain>
    </div>
  );
};

export default Auth;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`
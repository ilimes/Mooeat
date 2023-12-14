'use client'

import React from 'react';
import { Button, Col, Row } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons'
import styled from "styled-components";
import { useRouter } from "next/navigation";
import ApiCountChart from '@/components/Admin/ApiCountChart';
import ApiNameChart from '@/components/Admin/ApiNameChart';

const Api = () => {
  const router = useRouter();
  return (
    <div>
      <Title>API 통계</Title>
      <Explain>API 통계를 확인할 수 있는 페이지입니다. </Explain>
      <Title2>API 호출 횟수</Title2>
      <Explain><InfoCircleOutlined /> API 호출 횟수를 년, 월, 일 별로 조회할 수 있습니다. 기본값은 `월간` 입니다.</Explain>
      <ApiCountChart />
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <Title2>API 호출 순위 Top5</Title2>
          <Explain><InfoCircleOutlined /> API 호출 순위 Top5를 올해, 이번 달, 당일로 조회할 수 있습니다. 기본값은 `이번 달` 입니다.</Explain>
          <ApiNameChart />
        </Col>
      </Row>
    </div>
  );
};

export default Api;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

export const Title2 = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #5D559A;
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
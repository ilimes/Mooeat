'use client'

import React from 'react';
import { Button, Col, Row } from "antd";
import { InfoCircleOutlined } from '@ant-design/icons'
import styled from "styled-components";
import { useRouter } from "next/navigation";
import IpCountTable from '@/components/Admin/IpCountTable';

const Ip = () => {
  const router = useRouter();
  return (
    <div>
      <Title>IP 주소 통계</Title>
      <Explain>IP 주소 통계를 확인할 수 있는 페이지입니다. </Explain>
      <SubTitle>접속 IP 주소 및 횟수</SubTitle>
      <Explain><InfoCircleOutlined /> 올해 접속 IP 주소를 조회할 수 있습니다.</Explain>
      <IpCountTable />
      {/* <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <SubTitle>API 호출 순위 Top5</SubTitle>
          <Explain><InfoCircleOutlined /> API 호출 순위 Top5를 당해, 이번 달, 당일로 조회할 수 있습니다. 기본값은 `이번 달` 입니다.</Explain>
          <ApiNameChart />
        </Col>
      </Row> */}
    </div>
  );
};

export default Ip;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #5D559A;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`
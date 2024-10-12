'use client';

import React from 'react';
import { Button, Col, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import IpCountTable from '@/src/components/Admin/IpCountTable';
import TopTitle from '@/src/components/SharedComponents/TopTitle';

const Ip = () => {
  const router = useRouter();
  return (
    <>
      <TopTitle title="IP 주소 통계" explain="IP 주소 통계를 확인할 수 있는 페이지입니다." />
      <SubTitle>접속 IP 주소 및 횟수</SubTitle>
      <Explain>
        <InfoCircleOutlined /> 올해 접속 IP 주소를 조회할 수 있습니다.
      </Explain>
      <IpCountTable />
      {/* <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <SubTitle>API 호출 순위 Top5</SubTitle>
          <Explain><InfoCircleOutlined /> API 호출 순위 Top5를 당해, 이번 달, 당일로 조회할 수 있습니다. 기본값은 `이번 달` 입니다.</Explain>
          <ApiNameChart />
        </Col>
      </Row> */}
    </>
  );
};

export default Ip;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #5d559a;
`;

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`;

'use client';

import React from 'react';
import { Button, Col, Row } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ApiCountChart from '@/src/components/Admin/ApiCountChart';
import ApiNameChart from '@/src/components/Admin/ApiNameChart';
import TopTitle from '@/src/components/SharedComponents/TopTitle';

function Api() {
  return (
    <div>
      <TopTitle title="API 통계" explain="API 통계를 확인할 수 있는 페이지입니다." />
      <SubTitle>API 호출 횟수</SubTitle>
      <Explain>
        <InfoCircleOutlined /> API 호출 횟수를 년, 월, 일 별로 조회할 수 있습니다. 기본값은 `일간`
        입니다.
      </Explain>
      <ApiCountChart />
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
          <SubTitle>API 호출 순위 Top5</SubTitle>
          <Explain>
            <InfoCircleOutlined /> API 호출 순위 Top5를 당해, 이번 달, 당일로 조회할 수 있습니다.
            기본값은 `오늘` 입니다.
          </Explain>
          <ApiNameChart />
        </Col>
      </Row>
    </div>
  );
}

export default Api;

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

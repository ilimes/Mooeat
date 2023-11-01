'use client'

import { Button, Col, Row, Card, Divider, Avatar, Empty } from "antd";
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Friends = () => {
  const router = useRouter();
  return (
    <div>
      <Title>친구</Title>
      <Explain>새로운 친구를 등록하거나, 현재 등록된 친구 목록을 볼 수 있습니다.</Explain>
      <Row gutter={[15, 15]}>
        <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
          <Card title={[<div key={1} style={{ fontWeight: 'bold', float: 'left', fontSize: 18 }}>등록된 친구</div>, <Button key={2} size="middle" type="primary" style={{ float: 'right', fontSize: 13, fontWeight: 'bold', paddingRight: 22, height: 30 }}><PlusOutlined />추가</Button>]} bodyStyle={{ padding: '5px 17px', height: 'calc(100vh - 260px)', overflow: 'auto' }} style={{ background: '#F2F4F6' }}>
            <Row gutter={[10, 10]}>
              <Friend key={1} />
              <Friend key={2} />
              <Friend key={3} />
              <Friend key={4} />
              <Friend key={5} />
            </Row>
          </Card>
        </Col>
        <Col xs={0} sm={0} md={0} lg={18} xl={18} xxl={18}>
          <Card bodyStyle={{ height: 'calc(100vh - 203px)', overflow: 'auto' }}>
            <Empty description={<span style={{ fontSize: 14, color: '#1F1F1F' }}>항목이 존재하지 않습니다.</span>} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const Friend = () => {
  return (
    <Col span={24}>
      <StyledCard bodyStyle={{ padding: 15 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div>
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
          <StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 14 }}>라임</StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>ilimes@github.com</StyledOutDiv>
          </StyledOutDiv>
        </div>
      </StyledCard>
    </Col>
  )
}

export default Friends;

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

export const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`

export const StyledCard = styled(Card)`
  && {
    &:hover {
      border: 1px solid black;
      cursor: pointer;
    }
  }
`
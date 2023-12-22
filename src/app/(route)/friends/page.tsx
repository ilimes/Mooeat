'use client'

import { Button, Col, Row, Card, Divider, Avatar, Empty, Input, message, Badge, Tabs } from "antd";
import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { InfoTypes } from '@/interfaces/Common/Common.interface';

const Friends = () => {
  const router = useRouter();
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [activeKey, setActiveKey] = useState('all');
  const [items, setItems] = useState<InfoTypes[]>([
    {
      key: 'all',
      label: '전체',
    },
    {
      key: 'wait',
      label: '수락 대기 중',
    },
    {
      key: 'done',
      label: '수락 완료',
    },
  ]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };
  
  return (
    <div>
      <Title>친구</Title>
      <Explain>새로운 친구를 등록하거나, 현재 등록된 친구 목록을 볼 수 있습니다.</Explain>
      <Row gutter={[15, 15]}>
        <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
          <StyledLeftCard title={[<div key={1} style={{ fontWeight: 'bold', fontSize: 18 }}>친구 목록</div>, <Button key={2} size="middle" type="primary" onClick={openModal} style={{ float: 'right', fontSize: 14, fontWeight: 'bold', paddingRight: 22, height: 31 }}><UsergroupAddOutlined /> 추가</Button>]} bodyStyle={{ padding: '5px 15px', height: 'calc(100vh - 260px)', overflow: 'auto' }}>
          <Tabs activeKey={activeKey} items={items} onChange={onChange} style={{ fontWeight: 600 }} />
            <Row gutter={[10, 10]}>
              {/* <Friend key={1} />
              <Friend key={2} />
              <Friend key={3} />
              <Friend key={4} />
              <Friend key={5} /> */}
              <StyledEmpty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="등록된 친구가 없습니다."
              />
            </Row>
          </StyledLeftCard>
        </Col>
        <Col xs={0} sm={0} md={0} lg={18} xl={18} xxl={18}>
          <Card bodyStyle={{ height: 'calc(100vh - 203px)', overflow: 'auto' }}>
            <Empty description={<span style={{ fontSize: 14, color: '#1F1F1F' }}>자세한 정보를 보려면 친구를 클릭해주세요.</span>} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}/>
          </Card>
        </Col>
      </Row>
      <Modal title={'친구 등록'} isOpen={isOpen} closeModal={closeModal}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            이메일
          </Col>
          <Col span={24}>
            <Input placeholder="등록할 친구의 이메일을 입력해주세요." style={{ height: 40 }} />
          </Col>
          <Col span={24}>
            <Button type="primary" style={{ width: '100%', height: 40, fontWeight: 'bold', fontSize: 14 }} onClick={() => message.warning('존재하지 않는 이메일입니다. 이메일을 확인해주세요.')}>친구추가</Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

const Friend = () => {
  return (
    <Col span={24}>
      <StyledCard bodyStyle={{ padding: 15 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <div>
            <Badge
              offset={["-5%", "85%"]}
              style={{
                width: "13px",
                height: "13px",
                boxShadow: "0 0 0 3px #fff",
                backgroundColor: "#6384EB"
              }}
              dot={true}
            >
              <Avatar size={40} icon={<UserOutlined />} />
            </Badge>
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

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`

const StyledCard = styled(Card)`
  && {
    &:hover {
      border: 1px solid black;
      cursor: pointer;
    }
  }
`

const StyledLeftCard = styled(Card)`
  && {
    background: #F2F4F6;
    .ant-card-head {
      padding: 0 15px;
    }
    .ant-card-head-title {
      display: flex;
      justify-content: space-between;
      align-items: self-end;
    }
  }
`

const StyledEmpty = styled(Empty)`
  && {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 360px;
    justify-content: center;
    align-items: center;

    > .ant-empty-description {
      color: grey;
      font-size: 14px;
    }
  }
`;
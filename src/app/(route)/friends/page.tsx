'use client'

import { Button, Col, Row, Card, Divider, Avatar, Empty, Input, message, Badge, Tabs } from "antd";
import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { InfoTypes } from '@/types/Common/Common.interface';
import { useSession } from "next-auth/react";
import { FriendTypes } from "@/types/Friend/Friend.interface";

const Friends = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [activeKey, setActiveKey] = useState('all');
  const [userId, setUserId] = useState<any>(null);
  const [items, setItems] = useState<InfoTypes[]>([
    {
      key: 'all',
      label: '전체',
    },
    {
      key: 'get',
      label: '받은 요청'
    },
    {
      key: 'send',
      label: '보낸 요청',
    },
    {
      key: 'done',
      label: '서로 친구',
    },
  ]);
  const [friendList, setFriendList] = useState<FriendTypes[]>([]);
  const user_seq = session?.user?.token?.userInfo?.user_seq;
  // TODO: 친구 목록 조건 수정: 둘다 N일 경우 표시하지 않게
  const fromFriendList = friendList?.filter(e => e?.from_user_seq === user_seq && e?.agree === 'N');
  const toFriendList = friendList?.filter(e => e?.to_user_seq === user_seq && e?.agree === 'N');

  const friendList1 = friendList?.filter(e => e?.from_user_seq === user_seq && e?.agree === 'Y');
  const friendList2 = friendList?.filter(e => e?.to_user_seq === user_seq && e?.agree === 'Y');
  const pureFriendList = friendList1?.filter(e => friendList2?.find(ele => ele?.from_user_seq === e?.to_user_seq))

  const sendCondition = fromFriendList?.length != 0 && (activeKey === 'all' || activeKey === 'send');
  const getCondition = toFriendList?.length != 0 && (activeKey === 'all' || activeKey === 'get');
  const pureCondition = pureFriendList?.length != 0 && (activeKey === 'all' || activeKey === 'done');

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onOpen = () => {
    setUserId(null);
    openModal();
  }

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickReg(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onClickReg = async () => {
    if (!userId) {
      message.warning('등록할 이메일을 입력해주세요.');
      return;
    }

    const formData = {
      user_id: userId,
      from_user_seq: user_seq
    };

    const result = await fetchFriendData(formData);
    if (result?.success) {
      message.success("등록되었습니다.");
      closeModal();
    } else {
      message.warning(result?.message);
    }
  }

  const loadFriendList = async () => {
    const result = await fetchFriendList(user_seq);
    setFriendList(result?.list)
    console.log(result?.list)
  }

  useEffect(() => {
    if (status === 'authenticated') {
      loadFriendList();
    }
  }, [status])

  return (
    <div>
      <Title>친구</Title>
      <Explain>새로운 친구를 등록하거나, 현재 등록된 친구 목록을 볼 수 있습니다.</Explain>
      <Row gutter={[15, 15]}>
        <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
          <StyledLeftCard title={[<div key={1} style={{ fontWeight: 'bold', fontSize: 18 }}>친구 목록</div>, <Button key={2} size="middle" type="primary" onClick={onOpen} style={{ float: 'right', fontSize: 14, fontWeight: 'bold', paddingRight: 22, height: 31 }}><UsergroupAddOutlined /> 추가</Button>]} bodyStyle={{ padding: '5px 15px', height: 'calc(100vh - 260px)', overflow: 'auto' }}>
            <Tabs activeKey={activeKey} items={items} onChange={onChange} style={{ fontWeight: 600 }} tabBarGutter={20} />
            <Row gutter={[10, 10]}>
              {
                sendCondition &&
                (
                  <Col span={24}>
                    <Row gutter={[0, 10]}>
                      <div style={{ fontWeight: 600 }}>보낸 요청</div>
                      {toFriendList?.length != 0 && toFriendList?.map((e: FriendTypes, i) => <Friend key={i} user_nm={e?.from_user_nm} user_id={e?.from_user_id} />)}
                      <Divider style={{ margin: 0, borderColor: '#AEB8C2' }} />
                    </Row>
                  </Col>
                )
              }
              {
                getCondition &&
                (
                  <Col span={24}>
                    <Row gutter={[0, 10]}>
                      <div style={{ fontWeight: 600 }}>받은 요청</div>
                      {fromFriendList?.length != 0 && fromFriendList?.map((e: FriendTypes, i) => <Friend key={i} user_nm={e?.to_user_nm} user_id={e?.to_user_id} />)}
                      <Divider style={{ margin: 0, borderColor: '#AEB8C2' }} />
                    </Row>
                  </Col>
                )
              }
              {pureCondition && pureFriendList?.map((e: FriendTypes, i) => <Friend key={i} user_nm={e?.to_user_nm} user_id={e?.to_user_id} />)}
              {!friendList?.length &&
                (<StyledEmpty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="등록된 친구가 없습니다."
                />)
              }
            </Row>
          </StyledLeftCard>
        </Col>
        <Col xs={0} sm={0} md={0} lg={18} xl={18} xxl={18}>
          <Card bodyStyle={{ height: 'calc(100vh - 203px)', overflow: 'auto' }}>
            <Empty description={<span style={{ fontSize: 14, color: '#1F1F1F' }}>자세한 정보를 보려면 친구를 클릭해주세요.</span>} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }} />
          </Card>
        </Col>
      </Row>
      <Modal title={'친구 등록'} isOpen={isOpen} closeModal={closeModal}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <span style={{ fontWeight: 600 }}>이메일</span>
          </Col>
          <Col span={24}>
            <Input value={userId} placeholder="등록할 친구의 이메일을 입력해주세요." onChange={(e) => setUserId(e.target.value)} onKeyDown={(e) => handleOnKeyPress(e)} style={{ height: 40 }} />
          </Col>
          <Col span={24}>
            <Button type="primary" style={{ width: '100%', height: 40, fontWeight: 'bold', fontSize: 14 }} onClick={onClickReg}>친구추가</Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

const Friend = ({ user_nm, user_id }: { user_nm: string, user_id: string }) => {
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
            <StyledOutDiv style={{ fontSize: 14 }}>{user_nm}</StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>{user_id}</StyledOutDiv>
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

const fetchFriendList = async (user_seq: number) => {
  const res = await fetch(`/api/friend/list`, {
    method: "POST",
    body: JSON.stringify({ user_seq }),
  });
  const result = await res.json();

  return result?.data;
};

const fetchFriendData = async (formData: object) => {
  const res = await fetch(`/api/friend/add`, {
    method: 'PUT',
    body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}
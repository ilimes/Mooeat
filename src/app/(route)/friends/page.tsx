'use client'

import { Button, Col, Row, Card, Popconfirm, Avatar, Empty, Input, message, Badge, Tabs, Spin, TableColumnsType, Table } from "antd";
import { UsergroupAddOutlined, UserOutlined, ClockCircleOutlined, LeftOutlined } from '@ant-design/icons';
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import { InfoTypes } from '@/types/Common/Common.interface';
import { useSession } from "next-auth/react";
import { FriendTypes } from "@/types/Friend/Friend.interface";
import useIsMobile from "@/hooks/useIsMobile";
import { deleteFriendData, loadFriendList, loadRegUserInfo, putFriendData, updateFriendData } from '@/api/Api';
import moment from "moment";
import { DataType1, DataType2 } from "@/types/Board/Board.interface";

const Friends = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session, status } = useSession();
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [activeKey, setActiveKey] = useState('all');
  const [userId, setUserId] = useState<any>(null);
  const [clickSeq, setClickSeq] = useState<number | null>(null);
  const [nowState, setNowState] = useState<string>('default');
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
  const user_seq = session?.user?.info?.userInfo?.user_seq;

  const [clickUserInfo, setClickUserInfo] = useState<any>(null);

  // 받은 요청 리스트
  const receivedList = friendList?.filter(e => e.from_user_seq === user_seq && e?.agree === 'N' && e?.other_agree === 'Y');

  // 보낸 요청 리스트
  const sentList = friendList?.filter(e => e.from_user_seq === user_seq && e?.agree === 'Y' && e?.other_agree === 'N');

  const friendList1 = friendList?.filter(e => e?.from_user_seq === user_seq && e?.agree === 'Y');
  const friendList2 = friendList?.filter(e => e?.to_user_seq === user_seq && e?.agree === 'Y');
  const pureFriendList = friendList1?.filter(e => friendList2?.find(ele => ele?.from_user_seq === e?.to_user_seq))

  const sendCondition = sentList?.length != 0 && (activeKey === 'all' || activeKey === 'send');
  const getCondition = receivedList?.length != 0 && (activeKey === 'all' || activeKey === 'get');
  const pureCondition = pureFriendList?.length != 0 && (activeKey === 'all' || activeKey === 'done');

  const allCondition = (friendList?.length && activeKey === 'all' && !receivedList?.length && !sentList?.length && !pureFriendList?.length)
    || (friendList?.length && activeKey === 'get' && !receivedList?.length)
    || (friendList?.length && activeKey === 'send' && !sentList?.length)
    || (friendList?.length && activeKey === 'done' && !pureFriendList?.length);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onOpen = () => {
    setUserId(null);
    openModal();
  }

  const getRegUserInfo = async (user_seq: number) => {
    const formData = { user_seq };
    const result = await loadRegUserInfo(formData);
    if (result?.success) {
      setClickUserInfo(result?.data);
    } else {
      alert(result?.err || "에러발생");
    }
  };

  const getStateInfo = () => {
    let mod_dt = null;
    let title = null;
    let content = null;
    if (nowState === 'sent') {
      mod_dt = sentList?.find(e => e?.to_user_seq === clickSeq)?.mod_dt;
      title = <><img src={'/img/friend/agree1.png'} width={32} height={32} alt='agree1' />요청을 보낸 친구입니다.</>
      content = <div><div>상대방이 요청을 수락하면 서로 친구가 맺어집니다.</div><div>보낸 요청을 취소하시려면 `요청 취소` 버튼을 눌러주세요.</div></div>
    }
    if (nowState === 'received') {
      mod_dt = receivedList?.find(e => e?.to_user_seq === clickSeq)?.mod_dt;
      title = <><img src={'/img/friend/agree2.png'} width={32} height={32} alt='agree2' />요청을 받았습니다.</>
      content = '요청을 수락하시려면 `요청 수락` 버튼을 눌러주세요.'
    }
    if (nowState === 'pure') {
      mod_dt = pureFriendList?.find(e => e?.to_user_seq === clickSeq)?.mod_dt;
      title = <><img src={'/img/friend/friend1.png'} width={32} height={32} alt='friend' />서로 친구입니다.</>
      content = <div style={{ display: 'flex', flexDirection: 'column', gap: 20}}>
        <StyledCard
          title='회원 기본 정보'
          $isClicked={true}
          style={{ border: '1px solid #eee', boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div>
              <b>이름</b>
              <div>{clickUserInfo?.user_info?.user_nm}</div>
            </div>
            <div>
              <b>아이디</b>
              <div>{clickUserInfo?.user_info?.user_id}</div>
            </div>
            <div>
              <b>자기소개</b>
              <div>{clickUserInfo?.user_info?.introduce || '자기소개가 없습니다.'}</div>
            </div>
          </div>
        </StyledCard>
        <StyledCard
          title='최근 작성한 글 5개'
          $isClicked={true}
          style={{ border: '1px solid #eee', boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)' }}
        >
          {clickUserInfo?.recent_board_list?.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
        )}
        {clickUserInfo?.recent_board_list?.length != 0 && <Table rowKey={(record) => record?.board_seq} columns={columns1} dataSource={clickUserInfo?.recent_board_list} pagination={false} onRow={(record, rowIndex) => ({onClick: () => { router.push(`/articles/${record?.board_seq}`) }})} />}
        </StyledCard>
        <StyledCard
          title='최근 작성한 댓글 5개'
          $isClicked={true}
          style={{ border: '1px solid #eee', boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)' }}
        >
          <div>목록</div>
        </StyledCard>
      </div>
    }
    return (
      <>
        <div>
          <h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {title}
            </div>
          </h2>
          <ClockCircleOutlined /> {moment(mod_dt).format('YYYY년 MM월 DD일  HH시mm분ss초')}
          <div style={{ marginTop: 20 }}>{content}</div>
        </div>
      </>
    )
  }

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickReg(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const onClickReg = async () => {
    if (userId === session?.user?.info?.userInfo?.user_id) {
      message.warning('자기 자신은 친구로 등록할 수 없습니다.');
      return;
    }

    if (!userId) {
      message.warning('등록할 이메일을 입력해주세요.');
      return;
    }

    const formData = {
      user_id: userId,
      from_user_seq: user_seq
    };

    const result = await putFriendData(formData);
    if (result?.success) {
      message.success("등록되었습니다.");
      getFriendList();
      closeModal();
    } else {
      message.warning(result?.message);
    }
  }

  const getFriendList = async () => {
    const formData = { user_seq };
    const result = await loadFriendList(formData);
    setFriendList(result?.list)
  }

  const updateFriend = async (seq?: number, type?: string) => {
    if (!seq) {
      message.warning("seq가 존재하지 않습니다.");
      return;
    }

    if (!type) {
      message.warning("type이 존재하지 않습니다.");
      return;
    }

    const formData = { seq, type };
    const result = await updateFriendData(formData);
    if (result?.success) {
      if (type === 'accept') {
        message.success("요청이 수락되었습니다.");
      }
      if (type === 'cancel') {
        message.info("요청을 취소하였습니다.");
      }
      getFriendList();
      setClickSeq(null);
    } else {
      message.warning(result?.message);
    }
  }

  const deleteFriend = async (to_user_seq?: number, isBlock?: string) => {
    if (!to_user_seq) {
      message.warning("to_user_seq가 존재하지 않습니다.");
      return;
    }

    if (!isBlock) {
      message.warning("isBlock이 존재하지 않습니다.");
      return;
    }

    const formData = {
      to_user_seq,
      from_user_seq: user_seq,
      isBlock
    };

    const result = await deleteFriendData(formData);
    if (result?.success) {
      message.success("정상적으로 처리되었습니다.");
      getFriendList();
      setClickSeq(null);
    } else {
      message.warning(result?.message);
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      getFriendList();
    }
  }, [status])

  useEffect(() => {
    if (nowState === 'pure' && clickSeq != null) {
      getRegUserInfo(clickSeq);
    }
  }, [nowState, clickSeq])

  const props = { clickSeq, setClickSeq, updateFriend, deleteFriend, setNowState };

  return (
    <div>
      <Title>친구</Title>
      <Explain>새로운 친구를 등록하거나, 현재 등록된 친구 목록을 볼 수 있습니다.</Explain>
      <Row gutter={[15, 15]}>
        <Col xs={isMobile && clickSeq ? 0 : 24} sm={isMobile && clickSeq ? 0 : 24} md={isMobile && clickSeq ? 0 : 24} lg={7} xl={7} xxl={7}>
          <StyledLeftCard title={[<div key={1} style={{ fontWeight: 800, fontSize: 18 }}>친구 목록</div>, <Button key={2} size="middle" type="primary" onClick={onOpen} style={{ float: 'right', fontSize: 14, fontWeight: 'bold', paddingRight: 22, height: 31 }}><UsergroupAddOutlined /> 추가</Button>]} bodyStyle={{ padding: '5px 15px', height: isMobile ? '100%' : 'calc(100vh - 260px)', overflow: 'auto' }}>
            <Tabs activeKey={activeKey} items={items} onChange={onChange} style={{ fontWeight: 800 }} tabBarGutter={20} />
            <Row gutter={[10, 10]}>
              {
                getCondition &&
                (
                  <Col span={24}>
                    <Row gutter={[0, 10]} style={{ background: '#DEE3E9', padding: 10, borderRadius: 12 }}>
                      <div style={{ fontWeight: 700, margin: '0 auto' }}>받은 요청</div>
                      {receivedList?.length != 0 && receivedList?.map((e: FriendTypes, i) => <Friend key={i} {...props} element={e} state={'received'} />)}
                    </Row>
                  </Col>
                )
              }
              {
                sendCondition &&
                (
                  <Col span={24}>
                    <Row gutter={[0, 10]} style={{ background: '#DEE3E9', padding: 10, borderRadius: 12 }}>
                      <div style={{ fontWeight: 700, margin: '0 auto' }}>보낸 요청</div>
                      {sentList?.length != 0 && sentList?.map((e: FriendTypes, i) => <Friend key={i} {...props} element={e} state={'sent'} />)}
                    </Row>
                  </Col>
                )
              }
              {
                pureCondition &&
                (
                  <Col span={24}>
                    <Row gutter={[0, 10]} style={{ background: '#DEE3E9', padding: 10, borderRadius: 12 }}>
                      <div style={{ fontWeight: 700, margin: '0 auto' }}>서로 친구</div>
                      {pureFriendList?.length != 0 && pureFriendList?.map((e: FriendTypes, i) => <Friend key={i}  {...props} element={e} state={'pure'} />)}
                    </Row>
                  </Col>
                )
              }
              {(status === 'authenticated' && (!friendList?.length || allCondition)) ?
                (<StyledEmpty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="목록이 존재하지 않습니다."
                />)
                : ""
              }
              {status === 'loading' && (

                <Spin style={{ display: 'flex', flex: 1, height: 150, justifyContent: 'center', alignItems: 'center' }} />
              )}
            </Row>
          </StyledLeftCard>
        </Col>
        {
          !clickSeq &&
          <Col xs={isMobile && clickSeq ? 24 : 0} sm={isMobile && clickSeq ? 24 : 0} md={isMobile && clickSeq ? 24 : 0} lg={17} xl={17} xxl={17}>
            <StyledRightCard bodyStyle={{ height: 'calc(100vh - 203px)', overflow: 'auto' }}>
              <Empty description={<span style={{ fontSize: 14, color: '#1F1F1F' }}>자세한 정보를 보려면 친구를 클릭해주세요.</span>} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }} />
            </StyledRightCard>
          </Col>
        }
        {
          clickSeq &&
          <Col xs={isMobile && clickSeq ? 24 : 0} sm={isMobile && clickSeq ? 24 : 0} md={isMobile && clickSeq ? 24 : 0} lg={17} xl={17} xxl={17}>
            <StyledRightCard bodyStyle={{ height: 'calc(100vh - 203px)', overflow: 'auto' }}>
              {1 == 1 && (
                <div>
                  <Button onClick={() => setClickSeq(null)}><LeftOutlined /> 선택 취소</Button>
                </div>
              )}
              <div style={{ marginTop: 20 }}>

              </div>
              {getStateInfo()}
            </StyledRightCard>
          </Col>
        }
      </Row>
      <Modal title={'친구 등록'} isOpen={isOpen} closeModal={closeModal}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <span style={{ fontWeight: 700 }}>이메일 (계정)</span>
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

const Friend = ({ clickSeq, setClickSeq, updateFriend, deleteFriend, element, state, setNowState }: { clickSeq: number | null, setClickSeq: Dispatch<SetStateAction<number | null>>, updateFriend?: any, deleteFriend?: any, element: FriendTypes, state: string, setNowState: Dispatch<SetStateAction<string>> }) => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <Col span={24}>
        <StyledCard className="fade" bodyStyle={{ padding: 15 }} onClick={() => { setClickSeq(/* state === 'received' ? element?.from_user_seq : */ element?.to_user_seq); setNowState(state); }} $isClicked={clickSeq === element?.to_user_seq ? true : false}>
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
              <StyledOutDiv style={{ fontSize: 14 }}>{element?.to_user_nm}</StyledOutDiv>
              <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>{element?.to_user_id}</StyledOutDiv>
            </StyledOutDiv>
          </div>
          {state === 'received' && <Button type="primary" onClick={(e) => { e.stopPropagation(); updateFriend(element?.seq, 'accept'); }} style={{ width: '100%', marginTop: 10, fontWeight: 700 }}>요청 수락</Button>}
          {state === 'sent' && <Button type="primary" ghost onClick={(e) => { e.stopPropagation(); updateFriend(element?.seq, 'cancel'); }} style={{ width: '100%', marginTop: 10, fontWeight: 700 }}>요청 취소</Button>}
          {state === 'pure' && <Button danger onClick={(e) => { e.stopPropagation(); openModal(); }} style={{ width: '100%', marginTop: 10, fontWeight: 700 }}>친구 삭제</Button>}
        </StyledCard>
      </Col>
      {state === 'pure' && (
        <Modal title={'삭제'} isOpen={isOpen} closeModal={closeModal}>
          <div style={{ margin: '30px 0' }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>정말 삭제하시겠습니까?</div>
            <div style={{ color: 'grey' }}>차단 관리는 `마이페이지 {'>'} 친구 관리` 를 이용해주세요.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={closeModal}>취소</Button>
            <Button danger onClick={() => deleteFriend(element?.to_user_seq, 'F')}>친구 삭제</Button>
            <Button type="primary" danger onClick={() => deleteFriend(element?.to_user_seq, 'T')}>삭제 후 차단</Button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Friends;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
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

const StyledCard = styled(Card) <{ $isClicked: boolean }>`
  && {
    ${props => (props.$isClicked) && css`
      border: 1px solid black;
    `}
    &:hover {
      border: 1px solid grey;
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
    .ant-card-body {
      &::-webkit-scrollbar {
        width: 10px;
      }
    
      &::-webkit-scrollbar-thumb {
        background: #45556066;
        border-radius: 20px;
        background-clip: padding-box;
        border: 2px solid transparent;
      }
    }
  }
`

const StyledRightCard = styled(Card)`
  .ant-card-body {
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #45556066;
      border-radius: 20px;
      background-clip: padding-box;
      border: 2px solid transparent;
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

const updateFriendDatafetch = async (formData: object) => {
  const res = await fetch(`/api/friend/updateFriend`, {
    method: 'PATCH',
    body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}

const deleteFriendDatafetch = async (formData: object) => {
  const res = await fetch(`/api/friend/deleteFriend`, {
    method: 'DELETE',
    body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}

const columns1: TableColumnsType<DataType1> = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center'
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text) => moment(text).format("YYYY-MM-DD")
  },
]

const columns2: TableColumnsType<DataType2> = [
  {
    title: '게시글 제목',
    dataIndex: 'board_title',
    key: 'board_title',
    align: 'center'
  },
  {
    title: '댓글 내용',
    dataIndex: 'content',
    key: 'content',
    align: 'center'
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text) => moment(text).format("YYYY-MM-DD")
  },
]
'use client';

import {
  Button,
  Col,
  Row,
  Card,
  Popconfirm,
  Avatar,
  Empty,
  Input,
  message,
  Badge,
  Tabs,
  Spin,
  TableColumnsType,
  Table,
  Tooltip,
} from 'antd';
import {
  UsergroupAddOutlined,
  UserOutlined,
  ClockCircleOutlined,
  LeftOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { useModal } from '@/hooks/useModal';
import { InfoTypes } from '@/types/Common/Common.interface';
import { Friend, FriendTypes } from '@/types/Friend/Friend.interface';
import useIsMobile from '@/hooks/useIsMobile';
import {
  deleteFriendData,
  loadFriendList,
  loadRegUserInfo,
  putFriendData,
  updateFriendData,
} from '@/api/Api';
import { DataType1, DataType2 } from '@/types/Board/Board.interface';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import TopTitle from '@/components/SharedComponents/TopTitle';
import { clientsState } from '@/recoil/states';

const items: InfoTypes[] = [
  {
    key: 'all',
    label: '전체',
  },
  {
    key: 'get',
    label: '받음',
  },
  {
    key: 'send',
    label: '보냄',
  },
  {
    key: 'done',
    label: '서로 친구',
  },
];

const Friends = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: session, status } = useSession();
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const [activeKey, setActiveKey] = useState('all');
  const [userId, setUserId] = useState<any>(null);
  const [clickSeq, setClickSeq] = useState<number | null>(null);
  const [nowState, setNowState] = useState<string>('default');

  const [friendList, setFriendList] = useState<FriendTypes>({});
  const userSeq = session?.user?.info?.userInfo?.user_seq;

  const [clickUserInfo, setClickUserInfo] = useState<any>(null);

  const sendCondition = activeKey === 'all' || activeKey === 'send';
  const getCondition = activeKey === 'all' || activeKey === 'get';
  const pureCondition = activeKey === 'all' || activeKey === 'done';

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const onOpen = () => {
    setUserId(null);
    openModal();
  };

  const getRegUserInfo = async (user_seq: number) => {
    const formData = { user_seq };
    const result = await loadRegUserInfo(formData);
    if (result?.success) {
      setClickUserInfo(result?.data);
    } else {
      alert(result?.err || '에러발생');
    }
  };

  const getStateInfo = () => {
    let modDt = null;
    let title = null;
    let content = null;
    if (nowState === 'sent') {
      modDt = friendList?.sentList?.find((e) => e?.to_user_seq === clickSeq)?.mod_dt;
      title = (
        <>
          <div>
            <img src="/img/friend/agree1.png" width={32} height={32} alt="agree1" />
          </div>
          <div>요청을 보낸 친구입니다.</div>
        </>
      );
      content = (
        <StyledCard
          title="안내"
          $isClicked
          style={{
            border: '1px solid #eee',
            boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
          }}
        >
          <div>
            <div>
              상대방이 <b>요청을 수락</b>하면 <b>서로 친구</b>가 맺어집니다.
            </div>
            <div>
              보낸 요청을 취소하시려면 <b>`요청 취소`</b> 버튼을 눌러주세요.
            </div>
          </div>
        </StyledCard>
      );
    }
    if (nowState === 'received') {
      modDt = friendList?.receivedList?.find((e) => e?.to_user_seq === clickSeq)?.mod_dt;
      title = (
        <>
          <img src="/img/friend/agree2.png" width={32} height={32} alt="agree2" />
          요청을 받았습니다.
        </>
      );
      content = (
        <StyledCard
          title="안내"
          $isClicked
          style={{
            border: '1px solid #eee',
            boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
          }}
        >
          <div>
            요청을 수락하시려면 <b>`요청 수락`</b> 버튼을 눌러주세요.
          </div>
        </StyledCard>
      );
    }
    if (nowState === 'pure') {
      modDt = friendList?.pureList?.find((e) => e?.to_user_seq === clickSeq)?.mod_dt;
      title = (
        <>
          <img src="/img/friend/friend1.png" width={32} height={32} alt="friend" />
          서로 친구입니다.
        </>
      );
      content = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <StyledCard
            title="바로가기"
            $isClicked
            style={{
              border: '1px solid #eee',
              boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
            }}
          >
            <Tooltip title="선택한 친구에게 바로 식단을 공유합니다.">
              <Button
                type="primary"
                size="large"
                style={{ fontWeight: 700 }}
                onClick={() => router.push(`share?seq=${clickUserInfo?.user_info?.user_seq}`)}
              >
                <ShareAltOutlined />
                바로 식단 공유하기
              </Button>
            </Tooltip>
          </StyledCard>
          <StyledCard
            title="회원 기본 정보"
            $isClicked
            style={{
              border: '1px solid #eee',
              boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
            }}
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
            title="최근 작성한 글 5개"
            $isClicked
            style={{
              border: '1px solid #eee',
              boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
            }}
          >
            {clickUserInfo?.recent_board_list?.length === 0 && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
            )}
            {clickUserInfo?.recent_board_list?.length !== 0 && (
              <Table
                rowKey={(record) => record?.board_seq}
                columns={columns1}
                dataSource={clickUserInfo?.recent_board_list}
                pagination={false}
                onRow={(record, rowIndex) => ({
                  onClick: () => {
                    router.push(`/articles/${record?.board_seq}`);
                  },
                })}
              />
            )}
          </StyledCard>
          <StyledCard
            title="최근 작성한 댓글 5개"
            $isClicked
            style={{
              border: '1px solid #eee',
              boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
            }}
          >
            {clickUserInfo?.recent_reply_list?.length === 0 && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
            )}
            {clickUserInfo?.recent_reply_list?.length !== 0 && (
              <Table
                rowKey={(record) => record?.comment_seq}
                columns={columns2}
                dataSource={clickUserInfo?.recent_reply_list}
                pagination={false}
                onRow={(record, rowIndex) => ({
                  onClick: () => {
                    router.push(`/articles/${record?.board_seq}`);
                  },
                })}
              />
            )}
          </StyledCard>
        </div>
      );
    }
    return (
      <div>
        <h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {title}
          </div>
        </h2>
        <div style={{ marginBottom: 5 }}>
          <b>
            <ClockCircleOutlined /> 등록 시간
          </b>
        </div>
        {moment(modDt).format('YYYY년 MM월 DD일  HH시mm분ss초')}
        <div style={{ marginTop: 20 }}>{content}</div>
      </div>
    );
  };

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
      from_user_seq: userSeq,
    };

    const result = await putFriendData(formData);
    if (result?.success) {
      message.success('등록되었습니다.');
      getFriendList();
      closeModal();
    } else {
      message.warning(result?.message);
    }
  };

  const getFriendList = async () => {
    const formData: any = { user_seq: userSeq };
    const result = await loadFriendList(formData);
    setFriendList(result?.list);
  };

  const updateFriend = async (seq?: number, type?: string) => {
    if (!seq) {
      message.warning('seq가 존재하지 않습니다.');
      return;
    }

    if (!type) {
      message.warning('type이 존재하지 않습니다.');
      return;
    }

    const formData: any = { seq, type };
    const result = await updateFriendData(formData);
    if (result?.success) {
      if (type === 'accept') {
        message.success('요청이 수락되었습니다.');
      }
      if (type === 'cancel') {
        message.info('요청을 취소하였습니다.');
      }
      getFriendList();
      setClickSeq(null);
    } else {
      message.warning(result?.message);
    }
  };

  const deleteFriend = async (to_user_seq?: number, isBlock?: string) => {
    if (!to_user_seq) {
      message.warning('to_user_seq가 존재하지 않습니다.');
      return;
    }

    if (!isBlock) {
      message.warning('isBlock이 존재하지 않습니다.');
      return;
    }

    const formData = {
      to_user_seq,
      from_user_seq: userSeq,
      isBlock,
    };

    const result = await deleteFriendData(formData);
    if (result?.success) {
      message.success('정상적으로 처리되었습니다.');
      getFriendList();
      setClickSeq(null);
      closeModal();
    } else {
      message.warning(result?.message);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getFriendList();
    }
  }, [status]);

  useEffect(() => {
    if (nowState === 'pure' && clickSeq !== null) {
      getRegUserInfo(clickSeq);
    }
  }, [nowState, clickSeq]);

  const props = {
    clickSeq,
    setClickSeq,
    updateFriend,
    deleteFriend,
    setNowState,
  };

  // label에 따라서 친구 몇명인지 표시
  const getListCount = (key: string) => {
    if (key === 'all') {
      return (
        (friendList.pureList?.length || 0) +
        (friendList.receivedList?.length || 0) +
        (friendList.sentList?.length || 0)
      );
    }
    if (key === 'get') {
      return friendList?.receivedList?.length;
    }
    if (key === 'send') {
      return friendList?.sentList?.length;
    }
    if (key === 'done') {
      return friendList?.pureList?.length;
    }
    return 0;
  };

  return (
    <div>
      <TopTitle
        title="친구"
        explain="새로운 친구를 등록하거나, 현재 등록된 친구 목록을 볼 수 있습니다."
      />
      <Row gutter={[15, 15]}>
        <Col
          xs={isMobile && clickSeq ? 0 : 24}
          sm={isMobile && clickSeq ? 0 : 24}
          md={isMobile && clickSeq ? 0 : 24}
          lg={7}
          xl={7}
          xxl={7}
        >
          <StyledLeftCard
            title={[
              <div key={1} style={{ fontWeight: 800, fontSize: 18 }}>
                친구 목록
              </div>,
              <Button
                key={2}
                size="middle"
                type="primary"
                onClick={onOpen}
                style={{
                  float: 'right',
                  fontSize: 14,
                  fontWeight: 'bold',
                  paddingRight: 22,
                  height: 31,
                }}
              >
                <UsergroupAddOutlined /> 추가
              </Button>,
            ]}
            bodyStyle={{
              padding: '5px 15px',
              height: isMobile ? '100%' : 'calc(100vh - 260px)',
              overflow: 'auto',
            }}
          >
            <Tabs
              activeKey={activeKey}
              items={items.map((item) => ({
                ...item,
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {item.label}
                    <Badge count={getListCount(item.key) || '０'} size="small" color="#2c3846" />
                  </div>
                ),
              }))}
              onChange={onChange}
              style={{ fontWeight: 800 }}
              tabBarGutter={20}
            />
            <Row gutter={[10, 10]}>
              {getCondition && (
                <ListCard
                  list={friendList?.receivedList}
                  title="받음"
                  state="received"
                  loading={status === 'loading'}
                  friendProps={props}
                />
              )}
              {sendCondition && (
                <ListCard
                  list={friendList?.sentList}
                  title="보냄"
                  state="sent"
                  loading={status === 'loading'}
                  friendProps={props}
                />
              )}
              {pureCondition && (
                <ListCard
                  list={friendList?.pureList}
                  title="서로 친구"
                  state="pure"
                  loading={status === 'loading'}
                  friendProps={props}
                />
              )}
            </Row>
          </StyledLeftCard>
        </Col>
        {!clickSeq && (
          <Col
            xs={isMobile && clickSeq ? 24 : 0}
            sm={isMobile && clickSeq ? 24 : 0}
            md={isMobile && clickSeq ? 24 : 0}
            lg={17}
            xl={17}
            xxl={17}
          >
            <StyledRightCard
              bodyStyle={{ height: !isMobile ? 'calc(100vh - 203px)' : 'auto', overflow: 'auto' }}
            >
              <Empty
                description={
                  <span style={{ fontSize: 14, color: '#1F1F1F' }}>
                    자세한 정보를 보려면 친구를 클릭해주세요.
                  </span>
                }
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: '100%',
                }}
              />
            </StyledRightCard>
          </Col>
        )}
        {clickSeq && (
          <Col
            xs={isMobile && clickSeq ? 24 : 0}
            sm={isMobile && clickSeq ? 24 : 0}
            md={isMobile && clickSeq ? 24 : 0}
            lg={17}
            xl={17}
            xxl={17}
          >
            <StyledRightCard
              bodyStyle={{ height: !isMobile ? 'calc(100vh - 203px)' : 'auto', overflow: 'auto' }}
            >
              <div>
                <Button onClick={() => setClickSeq(null)}>
                  <LeftOutlined /> 선택 취소
                </Button>
              </div>
              <div style={{ marginTop: 20 }} />
              {getStateInfo()}
            </StyledRightCard>
          </Col>
        )}
      </Row>
      <Modal title="친구 등록" isOpen={isOpen} closeModal={closeModal}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <span style={{ fontWeight: 700 }}>이메일 (계정)</span>
          </Col>
          <Col span={24}>
            <Input
              value={userId}
              placeholder="등록할 친구의 이메일을 입력해주세요."
              onChange={(e) => setUserId(e.target.value)}
              onKeyDown={(e) => handleOnKeyPress(e)}
              style={{ height: 40 }}
            />
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              style={{
                width: '100%',
                height: 40,
                fontWeight: 'bold',
                fontSize: 14,
              }}
              onClick={onClickReg}
            >
              친구추가
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

const ListCard = ({
  list,
  title,
  loading,
  state,
  friendProps,
}: {
  list: any;
  title: any;
  loading: any;
  state: any;
  friendProps: any;
}) => (
  <Col span={24}>
    <Row gutter={[0, 10]} style={{ background: '#DEE3E9', padding: 10, borderRadius: 12 }}>
      <div style={{ fontWeight: 700, margin: '0 auto' }}>{title}</div>
      {list?.map((e: FriendTypes, i: number) => (
        <FriendCard key={i} {...friendProps} element={e} state={state} />
      ))}
      {loading ? (
        <Col span={24} style={{ background: '#fff', borderRadius: 12 }}>
          <Spin
            style={{
              display: 'flex',
              flex: 1,
              height: 134,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Col>
      ) : (
        !list?.length && (
          <Col span={24} style={{ background: '#fff', borderRadius: 12 }}>
            <StyledEmpty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="목록이 존재하지 않습니다."
            />
          </Col>
        )
      )}
    </Row>
  </Col>
);

const FriendCard = ({
  clickSeq,
  setClickSeq,
  updateFriend,
  deleteFriend,
  element,
  state,
  setNowState,
}: {
  clickSeq: number | null;
  setClickSeq: Dispatch<SetStateAction<number | null>>;
  updateFriend?: any;
  deleteFriend?: any;
  element: Friend;
  state: string;
  setNowState: Dispatch<SetStateAction<string>>;
}) => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
  const clients = useRecoilValue(clientsState);
  const profileImg = element?.profile_path ? `${element?.profile_path}?thumb=1` : null;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );

  return (
    <>
      <Col span={24}>
        <StyledCard
          className="fade"
          bodyStyle={{ padding: 15 }}
          onClick={() => {
            setClickSeq(element?.to_user_seq);
            setNowState(state);
          }}
          $isClicked={clickSeq === element?.to_user_seq}
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <div>
              <Badge
                offset={['-5%', '85%']}
                style={{
                  width: '13px',
                  height: '13px',
                  boxShadow: '0 0 0 3px #fff',
                  backgroundColor: clients?.find(
                    (e: any) =>
                      e.userSeq?.toString() ===
                      (state === 'pure' || state === 'sent'
                        ? element?.to_user_seq?.toString()
                        : element?.from_user_seq
                      )?.toString(),
                  )
                    ? '#4a74f4'
                    : '#7a7c80',
                }}
                dot
              >
                <Avatar size={40} icon={profile} />
              </Badge>
            </div>
            <StyledOutDiv>
              <StyledOutDiv style={{ fontSize: 14 }}>{element?.to_user_nm}</StyledOutDiv>
              <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
                {element?.to_user_id}
              </StyledOutDiv>
            </StyledOutDiv>
          </div>
          {state === 'received' && (
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                updateFriend(element?.seq, 'accept');
              }}
              style={{ width: '100%', marginTop: 10, fontWeight: 700 }}
            >
              요청 수락
            </Button>
          )}
          {state === 'sent' && (
            <Button
              type="primary"
              ghost
              onClick={(e) => {
                e.stopPropagation();
                updateFriend(element?.seq, 'cancel');
              }}
              style={{ width: '100%', marginTop: 10, fontWeight: 700 }}
            >
              요청 취소
            </Button>
          )}
          {state === 'pure' && (
            <Button
              danger
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              style={{ width: '100%', marginTop: 10, fontWeight: 700 }}
            >
              친구 삭제
            </Button>
          )}
        </StyledCard>
      </Col>
      {state === 'pure' && (
        <Modal title="삭제" isOpen={isOpen} closeModal={closeModal}>
          <div style={{ margin: '30px 0' }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>정말 삭제하시겠습니까?</div>
            <div style={{ color: 'grey' }}>
              차단 관리는 `마이페이지
              {'>'} 친구 관리` 를 이용해주세요.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={closeModal}>취소</Button>
            <Button
              danger
              onClick={() => {
                deleteFriend(element?.to_user_seq, 'F');
                closeModal();
              }}
            >
              친구 삭제
            </Button>
            <Button type="primary" danger onClick={() => deleteFriend(element?.to_user_seq, 'T')}>
              삭제 후 차단
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Friends;

const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const StyledCard = styled(Card)<{ $isClicked: boolean }>`
  && {
    ${(props) =>
      props.$isClicked &&
      css`
        border: 1px solid black;
      `}
    &:hover {
      border: 1px solid grey;
      cursor: pointer;
    }
  }
`;

const StyledLeftCard = styled(Card)`
  && {
    background: #f2f4f6;
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
`;

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
`;

const StyledEmpty = styled(Empty)`
  && {
    > .ant-empty-description {
      color: grey;
      font-size: 14px;
    }
  }
`;

const columns1: TableColumnsType<DataType1> = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text) => moment(text).format('YYYY-MM-DD'),
  },
];

const columns2: TableColumnsType<DataType2> = [
  {
    title: '게시글 제목',
    dataIndex: 'board_title',
    key: 'board_title',
    align: 'center',
  },
  {
    title: '댓글 내용',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text) => moment(text).format('YYYY-MM-DD'),
  },
];

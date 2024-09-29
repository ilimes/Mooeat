'use client';

import {
  Layout,
  Menu,
  Button,
  Popover,
  Col,
  Row,
  Card,
  Avatar,
  Badge,
  Drawer,
  Empty,
  message,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  CommentOutlined,
  UserAddOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { use, useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSession, signOut } from 'next-auth/react';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'moment/locale/ko';
import Logo from '../../public/logo.png';
import {
  collapseState,
  isMobileState,
  menuState,
  notiCollapseState,
  notiPopoverState,
  userInfoLoadingState,
  userInfoState,
} from '@/recoil/states';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import { UserInfoTypes } from '@/types/User/User.interface';
import { MenuListTypes } from '@/types/Common/Common.interface';
import {
  loadMenuList,
  loadNotificationList,
  loadUserInfoData,
  notificationConfirm,
} from '@/api/Api';

const { Header } = Layout;

const HeaderPage = ({ isPromptClosed }: { isPromptClosed: string | null }) => {
  const { data: session, status, update } = useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [collapsed, setCollapsed] = useRecoilState(collapseState);
  const isLoading = useRecoilValue(userInfoLoadingState);
  const setNotiCollapsed = useSetRecoilState(notiCollapseState);
  const [notiPopoverOpen, setNotiPopoverOpen] = useRecoilState(notiPopoverState);
  const isMobile = useRecoilValue(isMobileState);
  const [profileOpen, setProfileOpen] = useState(false);
  const {
    data: userInfo,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const result = await loadUserInfoData({});
      if (result?.success) {
        return result?.user_info;
      }
      return null;
    },
    enabled: !!user,
  });
  const { data } = useQuery({ queryKey: ['menuList'], queryFn: loadMenuList });
  const { data: notiList, refetch: notiListRefetch } = useQuery({
    queryKey: ['notificationList'],
    queryFn: loadNotificationList,
    enabled: !!user,
  });
  const profileImg = userInfo?.user_set?.file_path_thumb;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );

  const menuList = data?.list?.map((e: MenuListTypes) => ({
    key: e.menu_path,
    label: e.menu_nm,
    onClick: () => router.push(e.menu_path),
  }));

  const onClickLogo = () => {
    router.push('/');
  };

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) {
      setNotiCollapsed(false);
    }
    if (isMobile) {
      setNotiPopoverOpen(false);
    }
  }, [isMobile]);

  const getHeaderTop = () => {
    if (!isMobile) return 0;
    if (isMobile && isPromptClosed === 'true') return 0;
    return 60;
  };

  const HeaderStyle: React.CSSProperties = {
    position: 'sticky',
    top: getHeaderTop(),
    zIndex: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.7)',
    boxShadow: '0 1px 5px rgba(57, 63, 72, 0.2)',
    padding: 16,
  };

  return (
    <Header className="main-header" style={HeaderStyle}>
      <div className="pc-menu-btn">
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={menuList}
          style={{ width: '100%', fontWeight: 800, fontSize: 18, background: 'none' }}
          onSelect={(e) => setSelectedKeys([e?.key])}
        />
        {status !== 'loading' && (
          <>
            {session && (
              <>
                <Popover
                  trigger="click"
                  title="알림"
                  content={() => notiPopOverContent(notiList)}
                  placement="bottom"
                  open={notiPopoverOpen}
                  onOpenChange={(isOpen: boolean) => {
                    setNotiPopoverOpen(!notiPopoverOpen);
                    if (isOpen) notiListRefetch();
                  }}
                >
                  <div
                    style={{
                      marginRight: 20,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Badge dot={notiList?.count > 0}>
                      <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
                    </Badge>
                  </div>
                </Popover>
                <Popover
                  trigger="click"
                  open={profileOpen}
                  title="내 정보"
                  content={() => ProfilePopOverContent(userInfo, setProfileOpen)}
                  onOpenChange={() => setProfileOpen(!profileOpen)}
                  placement="bottom"
                >
                  <div style={{ alignItems: 'center', display: 'flex' }}>
                    <Avatar
                      size={34}
                      icon={profile}
                      onClick={() => setProfileOpen(!profileOpen)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </Popover>
              </>
            )}
            {!session && (
              <>
                <div style={{ width: 100, textAlign: 'center' }}>
                  <StyledButton onClick={() => router.push('/auth/login')}>로그인</StyledButton>
                </div>
                <div style={{ width: 100, textAlign: 'center', marginLeft: 10 }}>
                  <StyledButton type="primary" onClick={() => router.push('/auth/join')}>
                    회원가입
                  </StyledButton>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="mobile-btn">
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <div style={{ marginLeft: 'auto' }}>
          {status !== 'loading' && (
            <>
              {session && (
                <span onClick={() => setNotiCollapsed(true)} aria-hidden="true">
                  <Badge dot={notiList?.count > 0} style={{ marginRight: 10 }}>
                    <BellOutlined
                      style={{
                        fontSize: 20,
                        marginRight: 10,
                        cursor: 'pointer',
                      }}
                    />
                  </Badge>
                </span>
              )}
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '22px',
                  width: 42,
                  height: 48,
                  marginTop: 5,
                }}
              />
            </>
          )}
        </div>
      </div>
      <AlertDrawer notiList={notiList} notiListRefetch={notiListRefetch} />
    </Header>
  );
};
const notiPopOverContent = (notiList: any) => (
  <StyledPopoverDiv
    style={{
      width: 320,
      height: 450,
      overflowY: 'auto',
      overflowX: 'hidden',
    }}
  >
    <Row gutter={[5, 5]} style={{ paddingTop: 20, padding: 10 }}>
      {notiList?.count < 1 && (
        <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} description="알림이 존재하지 않습니다." />
      )}
      {notiList?.count > 0 &&
        notiList?.list?.map((e: any, idx: any) => <Alert key={idx} data={e} />)}
      {/* 더미 항목 */}
      {/* <Alert3 />
      <Alert2 /> */}
      {/* <Alert key={1} />
      <Alert key={2} />
      <Alert key={3} /> */}
    </Row>
  </StyledPopoverDiv>
);

const ProfilePopOverContent = (
  userInfo: UserInfoTypes,
  setProfileOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const profileImg = userInfo?.user_set?.file_path_thumb;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );

  const onClickMenu = (path: string) => {
    router.push(path);
    setProfileOpen(false);
  };

  return (
    <StyledPopoverDiv
      style={{
        width: 320,
        height: 450,
        fontSize: 15,
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ paddingTop: 20, padding: 10, flex: 1 }}>
        <div>
          <Avatar size={70} icon={profile} />
        </div>
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <div style={{ fontWeight: 700 }}>{userInfo?.user_nm}</div>
          <div>{userInfo?.introduce || '자기소개를 입력해주세요.'}</div>
        </div>
      </div>
      <div>
        {session?.user?.info?.userInfo?.role_rank > 2 && (
          <StyledProfileDiv onClick={() => router.push('/admin')}>관리자페이지</StyledProfileDiv>
        )}
        <StyledProfileDiv onClick={() => onClickMenu('/myPage')}>마이페이지</StyledProfileDiv>
        <StyledProfileDiv onClick={() => signOut({ callbackUrl: '/' })}>로그아웃</StyledProfileDiv>
      </div>
    </StyledPopoverDiv>
  );
};

const StyledProfileDiv = styled.div`
  && {
    border-radius: 10px;
    padding: 15px 10px;
    font-weight: 500;
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }
`;

const Alert = ({ data }: { data: any }) => {
  const router = useRouter();

  const { data: session, status, update } = useSession();
  const user = session?.user;
  const { data: notiList, refetch: notiListRefetch } = useQuery({
    queryKey: ['notificationList'],
    queryFn: loadNotificationList,
    enabled: !!user,
  });

  const [notiCollapsed, setNotiCollapsed] = useRecoilState(notiCollapseState);
  const [notiPopoverOpen, setNotiPopoverOpen] = useRecoilState(notiPopoverState);

  const notiConfirm = async (seq: number, showMessage?: boolean) => {
    const formData = { seq };
    const result = await notificationConfirm(formData);
    if (result?.success) {
      notiListRefetch();
    }
    if (showMessage) {
      message.success('알림 확인 처리되었습니다.');
    }
  };

  const onClickViewArticle = async (seq: number) => {
    if (data?.sub_seq && data?.type_kor === '댓글 알림') {
      router.push(`${data?.link}#comment-${data?.sub_seq}` ?? '/');
    } else {
      router.push(data?.link);
    }
    setNotiCollapsed(false);
    setNotiPopoverOpen(false);
    await notiConfirm(seq);
  };

  const onClickConfirm = async (seq: number) => {
    await notiConfirm(seq, true);
  };

  const getIcon = () => {
    switch (data?.type) {
      case 'comment':
        return <CommentOutlined />;
      case 'friend':
        return <UserAddOutlined />;
      default:
        return <UserOutlined />;
    }
  };

  return (
    <StyledAlertCol span={24}>
      <div style={{ display: 'flex', gap: 10 }}>
        <div>
          <Avatar size="large" icon={getIcon()} />
        </div>
        <div>
          <div>
            <b>{data?.type_kor}</b>
          </div>
          <StyledOutDiv style={{ fontSize: 14 }}>{data?.message}</StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
            {moment(data?.created_at).isAfter(moment().subtract(1, 'd'))
              ? moment(data?.created_at).fromNow()
              : moment(data?.created_at).format('LLL')}
          </StyledOutDiv>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <Button type="primary" size="small" onClick={() => onClickViewArticle(data?.seq)}>
              바로가기
            </Button>
            <Button size="small" onClick={() => onClickConfirm(data?.seq)}>
              알람 확인 처리
            </Button>
          </div>
        </div>
      </div>
    </StyledAlertCol>
  );
};

// const Alert2 = () => (
//   <StyledAlertCol span={24}>
//     <div style={{ display: 'flex', gap: 10 }}>
//       <div>
//         <Avatar size="large" icon={<UserOutlined />} />
//       </div>
//       <div>
//         <StyledOutDiv style={{ fontSize: 14 }}>
//           <Point>LIME</Point>님이 회원님의 글에 <Point>좋아요</Point>를 눌렀습니다.
//         </StyledOutDiv>
//         <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>2분 전</StyledOutDiv>
//       </div>
//     </div>
//   </StyledAlertCol>
// );

// const Alert3 = () => (
//   <Col span={24}>
//     <div style={{ display: 'flex', gap: 10 }}>
//       <div>
//         <Avatar size="large" icon={<UserOutlined />} />
//       </div>
//       <div>
//         <StyledOutDiv style={{ fontSize: 14 }}>
//           <span style={{ fontWeight: 'bold' }}>Mooeat님의 친구추가 요청이 도착하였습니다.</span>
//         </StyledOutDiv>
//         <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>2분 전</StyledOutDiv>
//         <Button type="primary" style={{ fontSize: 13, margin: '7px 7px 0 0' }}>
//           수락
//         </Button>
//         <Button style={{ fontSize: 13 }}>거절</Button>
//       </div>
//     </div>
//   </Col>
// );

const AlertDrawer = ({
  notiList,
  notiListRefetch,
}: {
  notiList?: any;
  notiListRefetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
}) => {
  const [notiCollapsed, setNotiCollapsed] = useRecoilState(notiCollapseState);
  return (
    <Drawer
      title={
        <div style={{ display: 'flex', height: 64, alignItems: 'baseline' }}>
          <div style={{ fontWeight: 'bold', fontSize: 18 }}>알림</div>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setNotiCollapsed(!notiCollapsed)}
            style={{
              fontSize: '22px',
              width: 42,
              height: 48,
              marginTop: 5,
              marginLeft: 'auto',
            }}
          />
        </div>
      }
      placement="top"
      closable={false}
      onClose={() => setNotiCollapsed(false)}
      afterOpenChange={(isOpen: boolean) => isOpen && notiListRefetch()}
      open={notiCollapsed}
      styles={{ body: { padding: '0 20px' }, header: { padding: '0 20px' } }}
      height="100%"
    >
      <Row gutter={[5, 5]} style={{ paddingTop: 20, padding: 10, overflow: 'auto' }}>
        {notiList?.count < 1 && (
          <StyledEmpty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="알림이 존재하지 않습니다."
          />
        )}
        {notiList?.count > 0 &&
          notiList?.list?.map((e: any, idx: any) => <Alert key={idx} data={e} />)}
        {/* 더미 데이터 */}
        {/* <Alert3 />
        <Alert2 />
        <Alert key={1} />
        <Alert key={2} />
        <Alert key={3} />
        <Alert key={4} />
        <Alert key={5} />
        <Alert key={6} />
        <Alert key={7} /> */}
      </Row>
    </Drawer>
  );
};

export default HeaderPage;

const StyledLogo = styled(Image)`
  && {
    align-self: center;
    font-weight: bold;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
    background:;
  }
`;

const StyledDiv = styled.div`
  justify-content: center;
  display: flex;
  background: #fff;
  margin: 0 auto;
  width: 1200px;
`;

const StyledButton = styled(Button)`
  && {
    font-size: 15px;
    letter-spacing: -0.3px;
    transition: all 0.1s linear;
  }
`;

const StyledOutDiv = styled.div`
  && {
    width: 100%;
    font-size: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

const Point = styled.span`
  font-weight: bold;
  color: #47408f;
`;

const StyledAlertCol = styled(Col)`
  // @keyframes loadEffect1 {
  //   0% {
  //     opacity: 0;
  //   }
  //   100% {
  //     opacity: 1;
  //   }
  // }

  && {
    transition: all 0.2s ease-in-out;
    // animation: loadEffect1 0.3s ease-in-out;
    padding: 10px 0px;

    &:hover {
      background: #eee;
      border-radius: 10px;
    }
  }
`;

const StyledPopoverDiv = styled.div`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #45556066;
    border-radius: 20px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`;

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

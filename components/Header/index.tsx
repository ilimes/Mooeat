'use client';

import { Layout, Menu, Button, Popover, Col, Row, Card, Avatar, Badge, Drawer, Empty } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { use, useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useSession, signOut } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import Logo from '../../public/logo.png';
import {
  collapseState,
  isMobileState,
  menuState,
  notiCollapseState,
  userInfoLoadingState,
  userInfoState,
} from '@/recoil/states';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import { UserInfoTypes } from '@/types/User/User.interface';
import { MenuListTypes } from '@/types/Common/Common.interface';
import { loadMenuList } from '@/api/Api';

const { Header } = Layout;

const HeaderPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [collapsed, setCollapsed] = useRecoilState(collapseState);
  const [userInfo, setUserInfo] = useRecoilState<UserInfoTypes | null>(userInfoState);
  const isLoading = useRecoilValue(userInfoLoadingState);
  const setNotiCollapsed = useSetRecoilState(notiCollapseState);
  const isMobile = useRecoilValue(isMobileState);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileImg = userInfo?.user_set?.file_path_thumb;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );
  const { data, isSuccess, isError } = useQuery({ queryKey: ['menuList'], queryFn: loadMenuList });

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
  }, [isMobile]);

  const HeaderStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
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
                  content={notiPopOverContent}
                  placement="bottom"
                >
                  <div
                    style={{
                      marginRight: 20,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Badge dot>
                      <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
                    </Badge>
                  </div>
                </Popover>
                <Popover
                  trigger="click"
                  open={profileOpen}
                  title="내 정보"
                  content={() => ProfilePopOverContent(setProfileOpen)}
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
                  <Badge dot style={{ marginRight: 10 }}>
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
      <AlertDrawer />
    </Header>
  );
};

const notiPopOverContent = () => (
  <StyledPopoverDiv
    style={{
      width: 320,
      height: 450,
      overflowY: 'auto',
      overflowX: 'hidden',
    }}
  >
    <Row gutter={[25, 25]} style={{ paddingTop: 20, padding: 10 }}>
      <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} description="알림이 존재하지 않습니다." />
      {/* 더미 항목 */}
      {/* <Alert3 />
        <Alert2 />
        <Alert key={1} />
        <Alert key={2} />
        <Alert key={3} /> */}
    </Row>
  </StyledPopoverDiv>
);

const ProfilePopOverContent = (setProfileOpen: Dispatch<SetStateAction<boolean>>) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);
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
          <div style={{ fontWeight: 700 }}>{session?.user?.info?.userInfo?.user_nm}</div>
          <div>{session?.user?.info?.userInfo?.introduce || '자기소개를 입력해주세요.'}</div>
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

const Alert = () => (
  <StyledAlertCol span={24}>
    <div style={{ display: 'flex', gap: 10 }}>
      <div>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
      <div>
        <StyledOutDiv style={{ fontSize: 14 }}>
          가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라가나다라
        </StyledOutDiv>
        <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>2분 전</StyledOutDiv>
      </div>
    </div>
  </StyledAlertCol>
);

const Alert2 = () => (
  <StyledAlertCol span={24}>
    <div style={{ display: 'flex', gap: 10 }}>
      <div>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
      <div>
        <StyledOutDiv style={{ fontSize: 14 }}>
          <Point>LIME</Point>님이 회원님의 글에 <Point>좋아요</Point>를 눌렀습니다.
        </StyledOutDiv>
        <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>2분 전</StyledOutDiv>
      </div>
    </div>
  </StyledAlertCol>
);

const Alert3 = () => (
  <Col span={24}>
    <div style={{ display: 'flex', gap: 10 }}>
      <div>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
      <div>
        <StyledOutDiv style={{ fontSize: 14 }}>
          <span style={{ fontWeight: 'bold' }}>Mooeat님의 친구추가 요청이 도착하였습니다.</span>
        </StyledOutDiv>
        <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>2분 전</StyledOutDiv>
        <Button type="primary" style={{ fontSize: 13, margin: '7px 7px 0 0' }}>
          수락
        </Button>
        <Button style={{ fontSize: 13 }}>거절</Button>
      </div>
    </div>
  </Col>
);

const AlertDrawer = () => {
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
      open={notiCollapsed}
      styles={{ body: { padding: '0 20px' }, header: { padding: '0 20px' } }}
      height="100%"
    >
      <Row gutter={[25, 25]} style={{ paddingTop: 20, padding: 10, overflow: 'auto' }}>
        <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} description="알림이 존재하지 않습니다." />
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

const ProfileDrawer = () => {
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
      open={notiCollapsed}
      styles={{ body: { padding: '0 20px' }, header: { padding: '0 20px' } }}
      height="100%"
    >
      <Row gutter={[25, 25]} style={{ paddingTop: 20, padding: 10, overflow: 'auto' }}>
        <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} description="알림이 존재하지 않습니다." />
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
  && {
    &:hover {
      background: #eee;
      border-radius: 10px;
      cursor: pointer;
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

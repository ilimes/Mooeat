"use client"

import { Layout, Menu, Button, Popover, Col, Row, Card, Avatar, Badge } from "antd";
import type { MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation';
import { use, useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Logo from "../../public/logo.png";
import { ServerStyleSheet } from "styled-components";
import { collapseState, isMobileState, menuState } from "@/recoil/states";
import { useRecoilState, useRecoilValue } from "recoil";

const { Header } = Layout;

const HeaderPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKeys, setSelectedKeys] = useState([pathname]);
  const [collapsed, setCollapsed] = useRecoilState(collapseState);
  const menuList = useRecoilValue(menuState);
  const isMobile = useRecoilValue(isMobileState);

  const onClickLogo = () => {
    router.push('/');
  }

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname])

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        background: "#fff",
        boxShadow: "0 1px 5px rgba(57, 63, 72, 0.2)",
        padding: 16,
      }}
    >
      <div className="pc-menu-btn">
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={selectedKeys}
            items={menuList}
            style={{ width: "100%", fontWeight: 700, fontSize: 18 }}
            onSelect={(e) => setSelectedKeys([e?.key])}
          />
          <Popover trigger={'click'} title='알림' content={popOverContent} placement="bottomRight">
            <div style={{ marginRight: 20 }}>
              <Badge dot={true}>
                <BellOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
              </Badge>
            </div>
          </Popover>
          <div style={{ width: 100, textAlign: 'center' }}>
            <StyledButton onClick={() => router.push('/auth/login')} >
              로그인
            </StyledButton>
          </div>
          <div style={{ width: 100, textAlign: 'center', marginLeft: 10 }}>
            <StyledButton type="primary" onClick={() => router.push('/auth/join')}>
              회원가입
            </StyledButton>
          </div>
        </>
      </div>
      <div className="mobile-btn">
        <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
        <div style={{ marginLeft: 'auto' }}>
          <Popover trigger={'click'} title='알림' content={popOverContent} placement="bottomRight">
            <Badge dot={true} style={{ marginRight: 10 }}>
              <BellOutlined style={{ fontSize: 20, marginRight: 10, cursor: 'pointer' }} />
            </Badge>
          </Popover>
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
        </div>
      </div>
    </Header>
  );
};

const popOverContent = () => {
  return (
    <StyledPopoverDiv style={{ width: 300, height: 400, overflowY: 'auto', overflowX: 'hidden' }}>
      <Row gutter={[25, 25]} style={{ paddingTop: 20, padding: 10 }}>
        <Alert3 />
        <Alert2 />
        <Alert key={1} />
        <Alert key={2} />
        <Alert key={3} />
      </Row>
    </StyledPopoverDiv>
  )
}

const Alert = () => {
  return (
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
  )
}

const Alert2 = () => {
  return (
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
  )
}

const Alert3 = () => {
  return (
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
          <Button type="primary" style={{ fontSize: 13, margin: '7px 7px 0 0' }}>수락</Button>
          <Button style={{ fontSize: 13 }}>거절</Button>
        </div>
      </div>
    </Col>
  )
}

export default HeaderPage;

export const StyledLogo = styled(Image)`
  && {
    align-self: center;
    font-weight: bold;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
`

export const StyledDiv = styled.div`
  justify-content: center;
  display: flex;
  background: #fff;
  margin: 0 auto;
  width: 1200px;
`

export const StyledButton = styled(Button)`
  && {
    font-size: 15px;
    transition: all 0.1s linear;
    &:hover {
        transform: scale(1.03);
    }
  }
`

export const StyledOutDiv = styled.div`
  && {
    width: 100%;
    font-size: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`

export const Point = styled.span`
  font-weight: bold; 
  color: #47408F;
`

export const StyledAlertCol = styled(Col)`
  && {
    &:hover {
      background: #eee;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`

export const StyledPopoverDiv = styled.div`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #45556066;
    border-radius: 20px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
`
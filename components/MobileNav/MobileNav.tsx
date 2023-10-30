'use client'

import { Layout, Menu, Drawer, Button, Divider } from "antd";
import {
    CloseOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Logo from "../../public/logo.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const { Sider } = Layout;

const MobileNav = ({ collapsed, setCollapsed, items }: { collapsed: boolean, setCollapsed: Dispatch<SetStateAction<boolean>>, items: any }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedKeys, setSelectedKeys] = useState([pathname]);

    const onClickLogo = () => {
        router.push('/');
        setCollapsed(false);
    }
    
    const onClickMenu = (path: string) => {
        router.push(path)
        setCollapsed(false);
    }

    useEffect(() => {
      setSelectedKeys([pathname]);
    }, [pathname])

    return (
      <Drawer
        placement="right"
        closable={false}
        onClose={() => setCollapsed(false)}
        open={collapsed}
        styles={{ body: { padding: "0 20px" } }}
        width={"100%"}
      >
        <div style={{ display: "flex", height: 64 }}>
          <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "22px",
              width: 42,
              height: 48,
              marginTop: 5,
              marginLeft: "auto",
            }}
          />
        </div>
        <div className="mobile-nav-menu">
          <div className="demo-logo-vertical" />
          <h3>로그인 후 이용해주세요.</h3>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selectedKeys}
            onClick={() => setCollapsed(false)}
            items={items}
          />
          <Divider />
            <StyledButton onClick={() => onClickMenu("/auth/login")}>
              로그인
            </StyledButton>
            <StyledButton type="primary" onClick={() => onClickMenu("/auth/join")} style={{ marginLeft: 10 }}>
              회원가입
            </StyledButton>
        </div>
      </Drawer>
    );
}

export default MobileNav;

export const StyledLogo = styled(Image)`
    && {
    align-self: center;
    font-weight: bold;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
    }
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
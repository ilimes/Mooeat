import React, { useEffect, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Tooltip } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { adminCollapsedState } from '@/src/recoil/states';
import useIsMobile from '@/src/hooks/useIsMobile';
import { menuItems } from '@/src/const/menu';

const { Header } = Layout;

const TITLE = 'Mooeat 관리자 페이지';

const AdminHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useRecoilState(adminCollapsedState);
  const [selectedKeys, setSelectedKeys] = useState([pathname]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <StyledHeader>
      {!isMobile && (
        <CollapseBtn onClick={() => setCollapsed(!collapsed)} aria-hidden="true">
          <Tooltip title={collapsed ? '메뉴 펼치기' : '메뉴 접기'}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Tooltip>
        </CollapseBtn>
      )}
      <Title>{TITLE}</Title>
      {isMobile && (
        <Menu
          theme="light"
          mode="horizontal"
          items={menuItems(router)}
          style={{ flex: 1, minWidth: 0 }}
        />
      )}
    </StyledHeader>
  );
};

export default AdminHeader;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background: #fff !important;
  border-bottom: 2px solid rgba(5, 5, 5, 0.06);
`;

const CollapseBtn = styled.div`
  cursor: pointer;
  font-size: 20px;
  margin-right: 10px;
`;

const Title = styled.div`
  margin-right: 20px;
  font-weight: 700;
`;

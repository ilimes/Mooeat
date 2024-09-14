/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { UserOutlined, MessageOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: '/', label: '홈', icon: <HomeOutlined /> },
    { key: '/friends', label: '친구 목록', icon: <UserOutlined /> },
    { key: '/community', label: '커뮤니티', icon: <MessageOutlined /> },
    { key: '/myPage', label: '마이페이지', icon: <SettingOutlined /> },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        padding: '12px 0',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
      }}
    >
      {menuItems.map((item) => (
        <StyledMenuDiv
          key={item.key}
          onClick={() => router.push(item.key)}
          $isActiveItem={pathname === item.key}
        >
          <IconDiv>{item.icon}</IconDiv>
          <span>{item.label}</span>
        </StyledMenuDiv>
      ))}
    </div>
  );
}

const IconDiv = styled.div`
  font-size: 18px;
`;

const StyledMenuDiv = styled.div<{ $isActiveItem: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  color: ${({ $isActiveItem }) => ($isActiveItem ? '#372D7C' : '#B0B0B0')};
  font-size: 13px;
  cursor: pointer;
`;

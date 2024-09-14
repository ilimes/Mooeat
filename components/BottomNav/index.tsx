import { UserOutlined, MessageOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
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
    <NavbarContainer>
      {menuItems.map((item) => (
        <MenuItem
          key={item.key}
          onClick={() => router.push(item.key)}
          $isActiveItem={pathname === item.key}
        >
          <IconDiv>{item.icon}</IconDiv>
          <span>{item.label}</span>
        </MenuItem>
      ))}
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  background-color: #ffffff;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
  padding: 14px 0;
  padding-bottom: env(safe-area-inset-bottom);
`;

const IconDiv = styled.div`
  font-size: 18px;
`;

const MenuItem = styled.div<{ $isActiveItem: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  color: ${({ $isActiveItem }) => ($isActiveItem ? '#372D7C' : '#545454')};
  font-size: 13px;
  cursor: pointer;
`;

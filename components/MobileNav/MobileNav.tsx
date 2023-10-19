import { Layout, Menu, Drawer, Button } from "antd";
import {
    CloseOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import Logo from "../../public/logo.png";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Image from "next/image";

const { Sider } = Layout;

const MobileNav = ({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: Dispatch<SetStateAction<boolean>> }) => {
    const router = useRouter();

    const onClickLogo = () => {
        router.push('/');
        setCollapsed(false);
    }

    return (
        <Drawer
            placement="right"
            closable={false}
            onClose={() => setCollapsed(false)}
            open={collapsed}
            styles={{ body: { padding: '0 20px' }}}
            width={'100%'}
        >
            <div style={{ display: 'flex', height: 64 }}>
                <StyledLogo src={Logo} onClick={onClickLogo} width={130} alt="로고" />
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '22px',
                        width: 42,
                        height: 48,
                        marginTop: 7,
                        marginLeft: 'auto'
                    }}
                />
            </div>
            <div className="mobile-nav-menu">
                <div className="demo-logo-vertical" />
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </div>
        </Drawer>
    )
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
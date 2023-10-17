'use client'

import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

const HeaderPage = () => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', borderBottom: '1px solid #eee' }}>
          <div style={{ fontWeight: 'bold' }}>Mooeat</div>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
        </Header>
    )
}

export default HeaderPage;
'use client'

import StyledComponentsRegistry from '../../lib/AntdRegistry'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { ConfigProvider, Layout } from 'antd'
import theme from '../../theme/themeConfig'

const { Content } = Layout;

const CustomLayout = ({children} : {children: React.ReactNode}) => {
    return (
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>
          <Layout>
            <Header />
            <Content style={{ padding: '20px 50px', background: 'white' }} >{children}</Content>
            <Footer />
          </Layout>
        </ConfigProvider>
      </StyledComponentsRegistry>
    );
}

export default CustomLayout;
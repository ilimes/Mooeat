import React from 'react';
import { ConfigProvider } from 'antd';
import theme from '../../theme/themeConfig';
import SessionProvider from '../../lib/SessionProvider';
import RecoilRootProvider from '@/src/lib/RecoilRootProvider';
import StyledComponentsRegistryAnt from '@/src/lib/AntdRegistry';
import StyledComponentsRegistry from '@/src/lib/Registry';
import ReactQueryProvider from '@/src/lib/ReactQueryProvider';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SessionProvider>
    <ReactQueryProvider>
      <RecoilRootProvider>
        <StyledComponentsRegistry>
          <StyledComponentsRegistryAnt>
            <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </StyledComponentsRegistryAnt>
        </StyledComponentsRegistry>
      </RecoilRootProvider>
    </ReactQueryProvider>
  </SessionProvider>
);

export default Providers;

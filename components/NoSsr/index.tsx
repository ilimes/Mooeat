import { Spin } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';

const NOSSR: React.FC<React.PropsWithChildren> = (props) => <>{props.children}</>;
export default dynamic(() => Promise.resolve(NOSSR), {
  ssr: false,
  loading: () => (
    <div style={{ background: '#47408f' }}>
      <StyledSpin size="large" />
    </div>
  ),
});

const StyledSpin = styled(Spin)`
  && {
    height: 370px;
    display: flex;
    justify-content: center;
    align-items: center;
    & .ant-spin-dot-item {
      background-color: white;
    }
  }
`;

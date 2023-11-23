import React from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import styled from 'styled-components';

const StyledChildrenDiv = styled.div`
  background: #F2F2F2;
  padding: 15px;
`

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'Mooeat은 어떤 서비스인가요?',
    children: <StyledChildrenDiv>
      <span style={{ fontWeight: 600, fontSize: 20, marginRight: 10 }}>A.</span> 입니다.
    </StyledChildrenDiv>,
  },
  {
    key: '2',
    label: '질문 2',
    children: <StyledChildrenDiv>
      <span style={{ fontWeight: 600, fontSize: 20, marginRight: 10 }}>A.</span> 질문2입니다.
    </StyledChildrenDiv>,
  },
  {
    key: '3',
    label: '질문 3',
    children: <StyledChildrenDiv>
      <span style={{ fontWeight: 600, fontSize: 20, marginRight: 10 }}>A.</span> 질문3입니다.
    </StyledChildrenDiv>,
  },
];

const CollapseComponent: React.FC = () => <StyledCollapse /* defaultActiveKey={['1']} */ expandIcon={() => <span style={{ fontWeight: 600, fontSize: 20, marginLeft: 15 }}>Q.</span>} ghost items={items} />;

export default CollapseComponent;

const StyledCollapse = styled(Collapse)`
  && {
    & .ant-collapse-header {
      padding: 15px 0 !important;
      border-bottom: 1px solid #eee;
    }
    & .ant-collapse-content-box {
      padding: 0 !important;
    }
    & .ant-collapse-header:hover {
      color: #4f4791;
    }
  }
`
import React, { useEffect, useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import styled, { css } from 'styled-components';

const StyledChildrenDiv = styled.div`
  background: #F2F2F2;
  padding: 15px;
`

const ChildDiv = ({ content }: { content: string | React.JSX.Element }) =>
  <StyledChildrenDiv>
    <span style={{ fontWeight: 600, fontSize: 20, marginRight: 10 }}>A.</span> {content}
  </StyledChildrenDiv>

const CollapseComponent: React.FC = () => {
  const [openList, setOpenList] = useState<string | string[]>([]);

  
const items: CollapseProps['items'] = [
  {
    key: '1',
    label: <TitleDiv $isOpen={openList?.includes('1') ? true : false}>Mooeat은 어떤 서비스인가요?</TitleDiv>,
    children: <ChildDiv content={'Mooeat은 친구와 식단을 공유하거나, 식단 및 맛집 정보를 나누는 커뮤니티입니다.'} />,
  },
  {
    key: '2',
    label: <TitleDiv $isOpen={openList?.includes('2') ? true : false}>회원 가입을 하면 어떤 점이 좋나요?</TitleDiv>,
    children: <ChildDiv content={<>
      <span>회원 가입을 해야 아래와 같은 Mooeat의 서비스를 이용하실 수 있습니다.</span>
      <div style={{ margin: '20px 0 0 30px'}}>
        <div>▶ 친구 추가</div>
        <div>친구를 추가하고 소통할 수 있습니다.</div>
        <div>&nbsp;</div>
        <div>▶ 등록된 친구와 각자의 식단 공유</div>
        <div>친구와 정해진 시간마다 각자의 식단을 공유할 수 있습니다. 등록된 친구만 볼 수 있도록 설정할 수 있으며, 커뮤니티에 전체보기로 등록하는 것도 가능합니다.</div>
        <div>&nbsp;</div>
        <div>▶ 회원 게시글 구독</div>
        <div>해당 회원의 게시글을 구독하고, 피드에서 모아볼 수 있습니다.</div>
        <div>&nbsp;</div>
        <div>▶ 이벤트 참여</div>
        <div>여러가지 이벤트에 참여할 수 있습니다.</div>
        <div>&nbsp;</div>
        <div>▶ 알림 서비스</div>
        <div>PUSH 알람을 받을 수 있습니다.</div>
      </div>
    </>} />,
  },
  {
    key: '3',
    label: <TitleDiv $isOpen={openList?.includes('3') ? true : false}>333</TitleDiv>,
    children:<ChildDiv content='f' />,
  },
];

  return (
    <StyledCollapse onChange={(e) => setOpenList(e)} expandIcon={() => <span style={{ fontWeight: 600, fontSize: 20, marginLeft: 15 }}>Q.</span>} ghost items={items}/>
  )
}

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

const TitleDiv = styled.div<{$isOpen: boolean}>`
  ${props => props.$isOpen && css`
    font-weight: bold;
    color: #4f4791;
  `}
`
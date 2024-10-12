import React, { ReactNode, useEffect, useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import styled, { css } from 'styled-components';
import { BoardTypes } from '@/src/types/Board/Board.interface';
import { loadBoardList } from '@/src/app/api/Api';

const StyledChildrenDiv = styled.div`
  display: flex;
  background: #f2f2f2;
  padding: 15px;
  white-space: pre-line;
`;

const ChildDiv = ({ content }: { content: string | React.JSX.Element }) => (
  <StyledChildrenDiv>
    <span style={{ fontWeight: 700, fontSize: 20, marginRight: 10 }}>A.</span>
    <div style={{ paddingTop: 3, marginLeft: 4 }}>{content}</div>
  </StyledChildrenDiv>
);

const CollapseComponent: React.FC = () => {
  const [openList, setOpenList] = useState<string | string[]>([]);
  const [qnaList, setQnaList] = useState<CollapseProps['items']>([]);

  /**
   * 자주 묻는 질문 리스트 불러오기
   */
  const getQnaList = async () => {
    const formData = { cate_seq: 5 };
    // const result = await fetchQnaList();
    const result = await loadBoardList(formData);
    const list = result?.list;
    setQnaList(
      list?.map((e: BoardTypes, i: string) => ({
        key: i,
        label: <TitleDiv $isOpen={!!openList?.includes(i)}>{e?.title}</TitleDiv>,
        children: <ChildDiv content={e?.content} />,
      })),
    );
  };

  useEffect(() => {
    getQnaList();
  }, []);

  return (
    <StyledCollapse
      onChange={(e) => setOpenList(e)}
      expandIcon={() => <span style={{ fontWeight: 700, fontSize: 20, marginLeft: 15 }}>Q.</span>}
      ghost
      items={qnaList}
    />
  );
};

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
`;

const TitleDiv = styled.div<{ $isOpen: boolean }>`
  ${(props) =>
    props.$isOpen &&
    css`
      font-weight: bold;
      color: #4f4791;
    `}
`;

const fetchQnaList = async () => {
  const res = await fetch('/api/board/list', {
    method: 'POST',
    body: JSON.stringify({ cate_seq: 5 }),
  });
  const result = await res.json();

  return result?.data;
};

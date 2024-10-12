import { Empty } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Help = () => (
  <>
    <div style={{ fontWeight: 700, marginTop: 20, fontSize: 20 }}>내 문의 내역</div>
    <StyledDiv>
      <TitleDiv>
        <div>제목</div>
        <div>날짜</div>
      </TitleDiv>
      <EmptyComponent title="문의내역이 없습니다." />
    </StyledDiv>
  </>
);

const EmptyComponent = ({ title }: { title: string }) => (
  <ContentDiv>
    <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} description={title} />
  </ContentDiv>
);

export default Help;

const StyledDiv = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #666666;
  text-align: center;
  border-top: 1px solid #333333;
`;

const TitleDiv = styled.div`
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid #ccc;
  div:nth-child(1) {
    flex: 1;
  }
  div:nth-child(2) {
    width: 130px;
  }
`;

const ContentDiv = styled.div`
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid #ccc;
  align-items: center;
  div:nth-child(1) {
    flex: 1;
  }
  div:nth-child(2) {
    width: 130px;
  }
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const StyledEmpty = styled(Empty)`
  && {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    align-items: center;

    > .ant-empty-description {
      color: grey;
      font-size: 14px;
    }
  }
`;

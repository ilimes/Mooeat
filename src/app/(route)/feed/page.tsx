'use client'

import { Button, Empty, Row } from "antd";
import styled from "styled-components";
import TopTitle from "@/components/SharedComponents/TopTitle";

const Feed = () => {
  return (
    <div>
      <TopTitle title="피드" explain="친구 및 구독한 유저의 글을 모아서 볼 수 있는 공간입니다." />
      <Row
        gutter={[25, 25]}
        style={{ paddingTop: 20, padding: 10, overflow: "auto" }}
      >
        <StyledEmpty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="구독 목록이 텅 비었습니다."
        />
      </Row>
    </div>
  );
};

export default Feed;

const StyledEmpty = styled(Empty)`
  && {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 250px;
    justify-content: center;
    align-items: center;

    > .ant-empty-description {
      color: grey;
      font-size: 14px;
    }
  }
`;
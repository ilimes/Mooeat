import React from 'react';
import { Avatar, Row, Col } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PostList = ({ obj }: { obj: any }) => {
  const getListInfo = () => {
    if (obj?.category === 'free') {
      return { cateName: '자유', cateColor: '#5662F6', backgrounColor: '#E9EBFE' }
    }
    if (obj?.category === 'food') {
      return { cateName: '음식', cateColor: '#FF9E2D', backgrounColor: '#FFFBE3' }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <StyledOutDiv style={{ fontSize: 14 }}>라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임</StyledOutDiv>
          <div>·</div>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>1일 전</StyledOutDiv>
        </div>
      </div>
      <StyledContentDiv>
        <div className='titleDiv'>
          {obj?.title}
        </div>
        <div className='contentDiv'>
          {obj?.content}
        </div>
      </StyledContentDiv>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 14, fontWeight: 'bold', padding: '5px 10px', borderRadius: 10, color: getListInfo()?.cateColor, background: getListInfo()?.backgrounColor }}>
          {getListInfo()?.cateName}
        </div>
        <Row gutter={[15, 15]}>
          <Col style={{ fontSize: 14 }}>
            <EyeOutlined style={{ color: '#beb4b4' }} /> 1
          </Col>
          <Col style={{ fontSize: 14 }}>
            <CommentOutlined style={{ color: '#beb4b4' }} /> 2
          </Col>
          <Col style={{ fontSize: 14 }}>
            <LikeOutlined style={{ color: '#beb4b4' }} /> 3
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default PostList;

export const StyledTitleDiv = styled.span`
  &:hover {
    cursor: pointer;
  }
  font-size: 14px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const StyledContentDiv = styled.span`
  .titleDiv {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .contentDiv {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 15px;
  }
  &:hover {
    cursor: pointer;
  }
`

export const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`
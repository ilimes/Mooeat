'use client'

import React from 'react';
import { Avatar, Row, Col } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const PostList = ({ obj }: { obj: any }) => {
  const router = useRouter();
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
          <div>
            <Avatar size={25} icon={<UserOutlined />} />
          </div>
          <StyledOutDiv style={{ fontSize: 14 }}>라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임</StyledOutDiv>
          <div>·</div>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>1일 전</StyledOutDiv>
        </div>
      </div>
      <StyledContentDiv>
        <div className='titleDiv' onClick={() => router.push(`/articles/${obj.title}`)}>
          {obj?.title}
        </div>
        <div className='contentDiv'>
          {obj?.content}
        </div>
      </StyledContentDiv>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', padding: '5px 10px', borderRadius: 5, color: getListInfo()?.cateColor, background: getListInfo()?.backgrounColor }}>
            {getListInfo()?.cateName}
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, gap: 10, fontSize: 12, marginLeft: 10 }}>
          <div style={{ fontWeight: 800 }}>
            TAG
          </div>
          <div style={{ fontWeight: 400 }}>
            #태그1
          </div>
          <div style={{ fontWeight: 400 }}>
            #태그2
          </div>
        </div>
        <div>
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
    font-weight: 700;
    margin-bottom: 5px;
  }
  .titleDiv:hover {
    color: #4F4791;
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
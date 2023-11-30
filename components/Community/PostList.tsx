'use client'

import React from 'react';
import { Avatar, Row, Col } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const PostList = ({ obj }: { obj: any }) => {
  const router = useRouter();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      <div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <div>
            <Avatar size={25} icon={<UserOutlined />} />
          </div>
          <StyledOutDiv style={{ fontSize: 14 }}>{obj?.reg_user_nm}</StyledOutDiv>
          <div>·</div>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>{obj?.reg_dt}</StyledOutDiv>
        </div>
      </div>
      <StyledContentDiv onClick={() => router.push(`/articles/${obj?.board_seq}`)}>
        <div className='titleDiv'>
          {obj?.title}
        </div>
        <div className='contentDiv'>
          {obj?.content}
        </div>
      </StyledContentDiv>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 'bold', padding: '5px 10px', borderRadius: 5, color: obj?.cateColor, background: obj?.bgColor }}>
            {obj.cateName}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1, gap: 5, fontSize: 12, marginLeft: 10 }}>
          <div style={{ fontWeight: 800 }}>
            TAG
          </div>
          {
            obj?.tag_names?.split(':')?.map((e: any, i:number) => {
              return (
                <div key={i} style={{ fontWeight: 400 }}>
                  #{e}
                </div>
              )
            })
          }
        </div>
        <div>
          <Row gutter={[15, 15]}>
            <Col style={{ fontSize: 14 }}>
              <EyeOutlined style={{ color: '#beb4b4' }} /> {obj?.view_cnt}
            </Col>
            <Col style={{ fontSize: 14 }}>
              <CommentOutlined style={{ color: '#beb4b4' }} /> {obj?.comment_cnt}
            </Col>
            <Col style={{ fontSize: 14 }}>
              <LikeOutlined style={{ color: '#beb4b4' }} /> {obj?.like_cnt}
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
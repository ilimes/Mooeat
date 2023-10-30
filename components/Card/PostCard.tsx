import React from 'react';
import { Card, Avatar } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Meta } = Card;

const PostCard = ({obj}: {obj: any}) => {
    const getCardInfo = () => {
        if (obj?.category === 'free') {
            return { cateName: '자유', cateColor: '#03A9F4', backgrounColor: '#ECF9FF' }
        }
        if (obj?.category === 'food') {
            return { cateName: '음식', cateColor: '#FF9E2D', backgrounColor: '#FFFBE3' }
        }
    }

    return (
      <StyledCard
        catecolor={getCardInfo()?.cateColor}
        background={getCardInfo()?.backgrounColor}
      >
        {/* 카테고리 영역 */}
        <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 15, color: getCardInfo()?.cateColor }}>
          {getCardInfo()?.cateName}
        </div>
        {/* 제목 및 내용 영역 */}
        <Meta title={obj?.title} description={obj?.content} />
        {/* 아바타 영역 */}
        <div style={{ marginTop: 15, display: 'flex', gap: 10 }}>
          <div>
              <Avatar size="large" icon={<UserOutlined />} />
          </div>
          <div>
            <div style={{ fontSize: 14 }}>라임</div>
            <div style={{ fontSize: 13, color: 'grey' }}>1일 전</div>
          </div>
        </div>
        {/* 조회수, 댓글, 좋아요 영역 */}
        <div style={{ fontSize: 15, marginTop: 15 }}>
          <div style={{ float: 'left' }}>
            <EyeOutlined style={{ color: '#beb4b4' }} /> 1  <CommentOutlined style={{ color: '#beb4b4' }} /> 2 
          </div>
          <div style={{ float: 'right' }}>
            <LikeOutlined style={{ color: '#beb4b4' }} /> 3
          </div>
        </div>
      </StyledCard>
    );
}

export default PostCard;

export const StyledCard = styled(Card)<{ background: any, catecolor: any }>`
  && {
    width: 100%;
    height: 250px;
    background: ${props => props.background};
    &:hover {
      border: 0.5px solid ${props => props.catecolor};
      cursor: pointer;
    }
    .ant-card-meta-description {
      font-size: 14px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`
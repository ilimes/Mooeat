import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Meta } = Card;

const PostCard = ({obj}: {obj: any}) => {
    const getCardInfo = () => {
        if (obj?.category === 'free') {
            // return { cateName: '자유', cateColor: '#03A9F4', backgrounColor: '#ECF9FF' }
            return { cateName: '자유', cateColor: '#5662F6', backgrounColor: '#E9EBFE' }
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
        {/* 태그 영역 */}
        <div style={{ display: 'flex', gap: 10, fontSize: 12, margin: '15px 0' }}>
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
        {/* 아바타 영역 */}
        <div style={{ marginTop: 15, display: 'flex', gap: 10 }}>
          <div>
              <Avatar size={40} icon={<UserOutlined />} />
          </div>
          <StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 14 }}>라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임</StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>1일 전</StyledOutDiv>
          </StyledOutDiv>
        </div>
        {/* 조회수, 댓글, 좋아요 영역 */}
        <div style={{ position: 'absolute', bottom: 20 }}>
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
      </StyledCard>
    );
}

export default PostCard;

export const StyledCard = styled(Card)<{ background: any, catecolor: any }>`
  && {
    width: 100%;
    height: 280px;
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

export const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`
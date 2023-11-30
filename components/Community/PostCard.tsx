import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
// moment(text).isAfter(moment().subtract(1, 'd')) ? moment(text).fromNow() : text
const { Meta } = Card;

const PostCard = ({ obj }: { obj: any }) => {
  const router = useRouter();

  return (
    <StyledCard
      catecolor={obj?.cateColor || null}
      background={obj?.bgColor || null}
      onClick={() => router.push(`/articles/${obj?.board_seq}`)}>
      {/* 카테고리 영역 */}
      <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 15, color: obj?.cateColor }}>
        {obj?.cateName}
      </div>
      {/* 제목 및 내용 영역 */}
      <Meta title={obj?.title} description={obj?.content} />
      {/* 태그 영역 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, fontSize: 12, margin: '15px 0' }}>
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
      <div style={{ position: 'absolute', bottom: 20 }}>
        {/* 아바타 영역 */}
        <div style={{ marginBottom: 15, display: 'flex', gap: 10 }}>
          <div>
            <Avatar size={40} icon={<UserOutlined />} />
          </div>
          <StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 14 }}>{obj?.reg_user_nm}</StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>{obj?.reg_dt}</StyledOutDiv>
          </StyledOutDiv>
        </div>
        {/* 조회수, 댓글, 좋아요 영역 */}
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
    </StyledCard>
  );
}

export default PostCard;

export const StyledCard = styled(Card) <{ background: string | null, catecolor: string | null }>`
  && {
    width: 100%;
    height: 295px;
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
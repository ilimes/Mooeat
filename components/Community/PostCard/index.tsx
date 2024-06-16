import React from 'react';
import { Card, Avatar, Row, Col, Skeleton } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import 'moment/locale/ko';
import Image from 'next/image';
import CntComponent from '../CntComponent';
import { BoardTypes } from '@/types/Board/Board.interface';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';

const { Meta } = Card;

const PostCard = ({ obj }: { obj: BoardTypes }) => {
  const router = useRouter();
  const isLoading = Object?.keys(obj)?.length === 2;
  const profileImg = obj?.profile_path ? `${obj?.profile_path}?thumb=1` : null;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );

  return (
    <StyledCard
      className="fade-slow"
      catecolor={obj?.cate_color || null}
      background={obj?.bg_color || null}
      onClick={() => obj?.board_seq && router.push(`/articles/${obj?.board_seq}`)}
    >
      <Skeleton paragraph={{ rows: 3 }} loading={!!isLoading} active>
        {/* 카테고리 영역 */}
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 15, color: obj?.cate_color }}>
          {obj?.cate_nm}
        </div>
        {/* 제목 및 내용 영역 */}
        <Meta title={obj?.title} description={obj?.content?.replace(/(<([^>]+)>)/gi, '')} />
        {/* 태그 영역 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, fontSize: 12, margin: '15px 0' }}>
          <div style={{ fontWeight: 900 }}>TAG</div>
          {obj?.tag_names?.split(':')?.map((e: string, i: number) => (
            <div key={i} style={{ fontWeight: 400 }}>
              #{e}
            </div>
          ))}
          {!obj?.tag_names && <div style={{ color: '#B1B1B1' }}>태그 없음</div>}
        </div>
      </Skeleton>
      <div style={{ position: 'absolute', bottom: 20 }}>
        {/* 아바타 영역 */}
        <div style={{ marginBottom: 15, display: 'flex', gap: 10 }}>
          <div>
            <Avatar size={40} icon={profile} />
          </div>
          <StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 14 }}>{obj?.reg_user_nm}</StyledOutDiv>
            <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
              {moment(obj?.reg_dt).isAfter(moment().subtract(1, 'd'))
                ? moment(obj?.reg_dt).fromNow()
                : moment(obj?.reg_dt).format('LLL')}
            </StyledOutDiv>
          </StyledOutDiv>
        </div>
        {/* 조회수, 댓글, 좋아요 영역 */}
        <CntComponent obj={obj} />
      </div>
    </StyledCard>
  );
};

export default PostCard;

const StyledCard = styled(Card)<{ background: string | null; catecolor: string | null }>`
  && {
    width: 100%;
    height: 300px;
    background: ${(props) => props.background};
    &:hover {
      border: 0.5px solid ${(props) => props.catecolor};
      cursor: pointer;
    }
    .ant-card-meta-title {
      font-weight: 800;
    }
    .ant-card-meta-description {
      font-size: 14px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    &:active {
      transition: 0.3s;
      transform: scale(0.97);
    }
  }
`;

const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

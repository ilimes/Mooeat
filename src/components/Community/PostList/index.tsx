'use client';

import React from 'react';
import { Avatar, Row, Col } from 'antd';
import { EyeOutlined, CommentOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import 'moment/locale/ko';
import Image from 'next/image';
import CntComponent from '../CntComponent';
import { BoardTypes } from '@/src/types/Board/Board.interface';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import noImg from '@/public/img/noimg.png';

const PostList = ({ obj, disableFade }: { obj: BoardTypes; disableFade?: boolean }) => {
  const router = useRouter();
  const profileImg = obj?.profile_path ? `${obj?.profile_path}?thumb=1` : null;
  const profile = profileImg ? (
    <img src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${profileImg}`} alt="profile" />
  ) : (
    <Image src={unknownAvatar} alt="unknown" />
  );
  const thumbnailUrl = obj?.thumbnail_url ? `${obj?.thumbnail_url}?thumb=1` : noImg;

  return (
    <div
      className={disableFade ? '' : 'fade-slow'}
      style={{ display: 'flex', flexDirection: 'column', gap: 15 }}
    >
      <div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <div>
            <Avatar size={25} icon={profile} />
          </div>
          <StyledOutDiv style={{ fontSize: 14 }}>{obj?.reg_user_nm}</StyledOutDiv>
          <div>·</div>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
            {moment(obj?.reg_dt).isAfter(moment().subtract(1, 'd'))
              ? moment(obj?.reg_dt).fromNow()
              : moment(obj?.reg_dt).format('LLL')}
          </StyledOutDiv>
        </div>
      </div>
      <StyledContentDiv
        onClick={() => obj?.board_seq && router.push(`/articles/${obj?.board_seq}`)}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <div>
            {/* 썸네일 영역 */}
            <div
              style={{
                width: 70,
                height: 60,
                position: 'relative',
                borderRadius: 10,
                overflow: 'hidden',
              }}
              className="community-thumbnail-wrap"
            >
              <Image src={thumbnailUrl} alt="Thumbnail Image" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div>
            <div className="titleDiv">{obj?.title}</div>
            <div className="contentDiv">{obj?.content?.replace(/(<([^>]+)>)/gi, '')}</div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            gap: 5,
            fontSize: 12,
            marginTop: 20,
          }}
        >
          <div style={{ fontWeight: 900 }}>TAG</div>
          {obj?.tag_names?.split(':')?.map((e: string, i: number) => (
            <div key={i} style={{ fontWeight: 400 }}>
              #{e}
            </div>
          ))}
          {!obj?.tag_names && <div style={{ color: '#B1B1B1' }}>태그 없음</div>}
        </div>
      </StyledContentDiv>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              padding: '5px 10px',
              borderRadius: 5,
              color: obj?.cate_color,
              background: obj?.bg_color,
            }}
          >
            {obj.cate_nm}
          </div>
        </div>
        <CntComponent obj={obj} />
      </div>
    </div>
  );
};

export default PostList;

const StyledTitleDiv = styled.span`
  &:hover {
    cursor: pointer;
  }
  font-size: 14px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const StyledContentDiv = styled.span`
  .titleDiv {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 7px;
  }
  .titleDiv:hover {
    color: #4f4791;
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
`;

const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

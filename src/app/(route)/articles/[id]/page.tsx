'use client'

import { Avatar, Button, Checkbox, Col, Divider, Input, Row, Tabs, Tooltip } from "antd";
import { UserOutlined, PlusOutlined, EyeOutlined, CommentOutlined, LikeOutlined, LikeFilled, RollbackOutlined, InfoCircleOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import styled from "styled-components";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import 'moment/locale/ko';
import { IObjTypes } from "@/components/Community/PostCard";

interface ICommentTypes {
  comment_seq: number;
  comment_cd: string;
  target_seq: number;
  parents_cd: number;
  content: string;
  comment_level: number;
  comment_order: number;
  reg_user_seq: number;
  reg_user_nm: string;
  reg_dt: string;
  mod_user_seq: number;
  mod_dt: string;
  use_yn: string;
}

const Articles = () => {
  const router = useRouter();
  const params = useParams();

  const { data: session, status } = useSession();
  const [data, setData] = useState<IObjTypes | null>(null);
  const [commentList, setCommentList] = useState<ICommentTypes[] | null>(null);
  const id = params?.id;

  const loadArticleData = async () => {
    const formData = {
      board_num: id
    }
    const result = await fetchArticleData(formData);
    if (result?.success) {
      setData(result?.data)
    } else {
      alert(result?.err || '에러발생')
    }
  }

  const loadCommentList = async () => {
    const formData = {
      board_num: id
    }
    const result = await fetchCommentList(formData);
    if (result?.success) {
      setCommentList(result?.list)
    } else {
      alert(result?.err || '에러발생')
    }
  }

  useEffect(() => {
    loadArticleData();
    loadCommentList();
    // 최상단으로 스크롤
    window.scrollTo(0, 0);
  }, [])

  return (
    <div>
      {/* 메뉴 설명 영역 */}
      <Explain>커뮤니티 / <span style={{ color: '#4F4791' }}>{data?.cate_nm}</span></Explain>
      {/* 아바타 영역 */}
      <div style={{ margin: '30px 0', display: 'flex', gap: 10 }}>
        <div>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 15, marginBottom: 5 }}>{data?.reg_user_nm}</StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
            {moment(data?.reg_dt).isAfter(moment().subtract(1, 'd')) ? moment(data?.reg_dt).fromNow() : moment(data?.reg_dt).format('LLL')}
            <span style={{ margin: '0 5px' }}>·</span>
            {/* 조회수, 댓글, 좋아요 */}
            <EyeOutlined style={{ color: '#beb4b4' }} /> {data?.view_cnt}
            <span style={{ margin: '0 5px' }}>·</span>
            <CommentOutlined style={{ color: '#beb4b4' }} /> {data?.comment_cnt}
            <span style={{ margin: '0 5px' }}>·</span>
            <LikeOutlined style={{ color: '#beb4b4' }} /> {data?.like_cnt}
          </StyledOutDiv>
        </StyledOutDiv>
      </div>
      {/* 제목 영역 */}
      <Title>{data?.title}</Title>
      {/* 컨텐츠 영역 */}
      <div style={{ whiteSpace: 'normal' }}>
        {data?.content} 입니다.
      </div>
      {/* 태그 영역 */}
      <div style={{ margin: '30px 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {
          data?.tag_names?.split(':')?.map((e: string, i: number) => <StyledTagSpan key={i}>#{e}</StyledTagSpan>)
        }
      </div>
      {/* 추천 영역 */}
      <StyledLikeBtn>
        <LikeOutlined style={{ color: '#beb4b4' }} /> 추천하기
        {/* <LikeFilled style={{ color: '#5383EC' }} /> 추천취소 */}
      </StyledLikeBtn>
      {/* 작성자 정보 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#F5F5F5', borderRadius: 12, padding: 40, gap: 30 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>계정명</div>
          <div style={{ fontSize: 16, fontWeight: 400 }}>자기소개입니다.</div>
        </div>
        <StyledPlusBtn>
          <PlusOutlined /> 구독하기
        </StyledPlusBtn>
      </div>
      <Divider />
      {/* 댓글 영역 */}
      <div>
        <div style={{ marginBottom: 20, fontSize: 18 }}>댓글 {commentList?.length}</div>
        {
          commentList?.map((e: ICommentTypes, i: number) =>
            <div key={i} style={{ display: 'flex', marginBottom: 40 }}>
              <div style={{ marginRight: 10 }}>
                <Avatar size={55} icon={<UserOutlined />} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ fontWeight: 600 }}>
                  {e?.reg_user_nm}
                </div>
                <div>
                  {e?.content}
                </div>
                <div style={{ fontSize: 13, marginTop: 10 }}>
                  {moment(e?.reg_dt).isAfter(moment().subtract(1, 'd')) ? moment(e?.reg_dt).fromNow() : moment(e?.reg_dt).format('LLL')}
                </div>
              </div>
            </div>
          )
        }
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 10 }}>
            <Avatar size={55} icon={<UserOutlined />} />
          </div>
          <div style={{ flex: 1 }}>
            <StyledCommentDiv>
              <div style={{ fontWeight: 400, marginBottom: 5 }}>
                {!session && <div><InfoCircleOutlined />
                  <Tooltip title="클릭 시 로그인 페이지로 이동합니다.">
                    <span style={{ fontWeight: 600, color: '#4F4791', cursor: 'pointer', marginLeft: 5 }} onClick={() => router.push('/auth/login')}>로그인</span>
                  </Tooltip>
                  {" "}후 이용해주세요.</div>}
                {session && session?.user?.token?.userInfo?.user_nm}
              </div>
              <Input.TextArea className='commentArea' bordered={false} placeholder='내용을 입력해주세요.' style={{ padding: 0, resize: 'none', marginBottom: 10 }} autoSize disabled={!session ? true : false} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 15 }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  <Checkbox />
                  <div style={{ display: 'flex', alignItems: 'self-end' }}>비밀글</div>
                </div>
                <Button type='primary' style={{ height: 45, fontSize: 15, fontWeight: 800 }} disabled={!session ? true : false}>댓글 쓰기</Button>
              </div>
            </StyledCommentDiv>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button style={{ height: 35, fontSize: 14, fontWeight: 800 }} onClick={() => router.push('/community')}><RollbackOutlined />커뮤니티로 돌아가기</Button>
        </div>
      </div>
    </div>
  );
};

export default Articles;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`

export const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

export const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`

export const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
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

export const StyledTagSpan = styled.span`
  background: #F9F9FF;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    color: #7944F4;
  }
`

export const StyledPlusBtn = styled.div`
  border: 1px solid #ababab;
  color: #0c0c0c;
  border-radius: 20px;
  padding: 10px 10px 10px 6px;
  width: 120px;
  text-align: center;
  &:hover {
    cursor: pointer;
    border: 1px solid black;
    color: black;
  }
`

export const StyledLikeBtn = styled.div`
  border: 1px solid #ababab;
  color: #0c0c0c;
  border-radius: 20px;
  padding: 10px 10px 10px 6px;
  margin: 0 auto 30px auto;
  width: 170px;
  text-align: center;
  &:hover {
    cursor: pointer;
    border: 1px solid black;
    color: black;
  }
`

export const StyledCommentDiv = styled.div`
  border: 1px solid #D0D2D5;
  min-height: 120px;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
  &:hover, &:focus-within {
    border: 1px solid black;
    color: black;
  }
`

export const fetchArticleData = async (formData: { board_num: string | string[] }) => {
  const res = await fetch(`/api/board/view`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}

export const fetchCommentList = async (formData: { board_num: string | string[] }) => {
  const res = await fetch(`/api/board/comment/list`, {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  const result = await res.json();

  return result?.data;
}
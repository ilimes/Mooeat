'use client'

import { Avatar, Button, Col, Divider, Row, Tabs } from "antd";
import { UserOutlined, PlusOutlined, EyeOutlined, CommentOutlined, LikeOutlined, LikeFilled } from "@ant-design/icons";
import type { TabsProps } from "antd";
import styled from "styled-components";
import { useRouter, useParams } from "next/navigation";
import { useState } from 'react';

const Articles = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const example = [
    {
      title: '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
      content: '내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다',
      category: 'free'
    },
  ]

  return (
    <div>
      {/* 메뉴 설명 영역 */}
      <Explain>커뮤니티 / 자유게시판</Explain>
      {/* 아바타 영역 */}
      <div style={{ margin: '30px 0', display: 'flex', gap: 10 }}>
        <div>
            <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 15, marginBottom: 5 }}>라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임라임</StyledOutDiv>
          <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
            1일 전
            <span style={{ margin: '0 5px' }}>·</span>
            {/* 조회수, 댓글, 좋아요 */}
            <EyeOutlined style={{ color: '#beb4b4' }} /> 1 
            <span style={{ margin: '0 5px' }}>·</span>
            <CommentOutlined style={{ color: '#beb4b4' }} /> 2 
            <span style={{ margin: '0 5px' }}>·</span>
            <LikeOutlined style={{ color: '#beb4b4' }} /> 3
          </StyledOutDiv>
        </StyledOutDiv>
      </div>
      {/* 제목 영역 */}
      <Title>{id}</Title>
      {/* 컨텐츠 영역 */}
      <div style={{ whiteSpace: 'normal' }}>
        {id} 입니다.
      </div>
      {/* 태그 영역 */}
      <div style={{ margin: '30px 0', display: 'flex', gap: 10 }}>
        <StyledTagSpan>#태그1</StyledTagSpan>
        <StyledTagSpan>#태그2</StyledTagSpan>
      </div>
      {/* 추천 영역 */}
      <StyledLikeBtn>
        <LikeOutlined style={{ color: '#beb4b4' }} /> 추천하기
        {/* <LikeFilled style={{ color: '#5383EC' }} /> 추천취소 */}
      </StyledLikeBtn>
      {/* 작성자 정보 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', background: '#F5F5F5', borderRadius: 5, padding: 40, gap: 30 }}>
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
        <div>댓글 0</div>
        <div style={{ border: '1px solid #D0D2D5', height: 100, margin: '10px 0', borderRadius: 5 }}>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='primary' style={{ height: 45, fontSize: 15 }}>댓글 쓰기</Button>
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
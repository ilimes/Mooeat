'use client'

import { Avatar, Button, Col, Divider, Row, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { EyeOutlined, CommentOutlined, LikeOutlined, AppstoreFilled } from "@ant-design/icons";
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
      <Divider />
      {/* 댓글 영역 */}
      <div>
        <div>댓글 0</div>
        
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
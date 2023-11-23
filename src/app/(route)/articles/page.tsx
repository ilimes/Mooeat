'use client'

import { Button, Col, Divider, Row, Tabs } from "antd";
import type { TabsProps } from "antd";
import { FormOutlined, AppstoreOutlined, UnorderedListOutlined, AppstoreFilled } from "@ant-design/icons";
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
      <Title>게시글 제목</Title>
      <Explain>커뮤니티에서 자유롭게 이야기를 나눠보세요 :)</Explain>
      <div>
        {id} 입니다.
      </div>
    </div>
  );
};

export default Articles;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
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
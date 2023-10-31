'use client'

import { Button, Col, Row, Tabs } from "antd";
import type { TabsProps } from "antd";
import { FormOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import PostCard from '@/components/Card/PostCard';
import { useState } from 'react';

const items: TabsProps['items'] = [
  {
    key: 'all',
    label: '전체',
    // children: 'Content of Tab Pane 1',
  },
  {
    key: 'free',
    label: '자유',
    // children: 'Content of Tab Pane 2',
  },
  {
    key: 'food',
    label: '음식',
    // children: 'Content of Tab Pane 3',
  },
]

const Community = () => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState('all');
  const example = [
    {
      title: '제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다제목입니다',
      content: '내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다',
      category: 'free'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
    {
      title: 2,
      content: 22,
      category: 'free'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
    {
      title: 2,
      content: 22,
      category: 'food'
    },
  ];

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div>
      <Title>커뮤니티</Title>
      <Explain>커뮤니티에서 자유롭게 이야기를 나눠보세요 :)</Explain>
      <Button
        type="primary"
        htmlType="submit"
        style={{ width: 125, height: 47, fontWeight: "bold", fontSize: 16 }}
      >
        <FormOutlined /> 작성하기
      </Button>
      <Tabs activeKey={activeKey} items={items} onChange={onChange} style={{ fontWeight: 'bold', marginTop: 15 }} />
      <Row gutter={[15, 15]}>
        {example?.filter(e => activeKey === 'all' ? e : e?.category?.includes(activeKey))?.map((e, i) => (
          <Col key={i} xs={24} sm={24} md={24} lg={8} xl={6} xxl={6}>
            <PostCard obj={e} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Community;

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
'use client'

import { Button, Col, Divider, Row, Tabs } from "antd";
import type { TabsProps } from "antd";
import { FormOutlined, AppstoreOutlined, UnorderedListOutlined, AppstoreFilled } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import PostCard from '@/components/Community/PostCard';
import { useEffect, useState } from 'react';
import PostList from "@/components/Community/PostList";

const Community = () => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState('all');
  const [type, setType] = useState('tile');
  const [items, setItems] = useState<TabsProps['items'] | any>([
    {
      key: 'all',
      label: '전체',
    }
  ]);
  const [boardList, setBoardList] = useState<any>([]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const filteredArr = boardList?.filter((e: any) => activeKey === 'all' ? String(e?.cate_seq) != '4' : String(e?.cate_seq) === activeKey);

  const colSpan = type === 'tile' ? [8, 6] : [24, 24]
  
  const getInfoList = async () => {
    const result = await fetchInfoList();
    setItems([...items, ...result?.list?.map((e: any) => ({
      key: `${e.cate_seq}`,
      label: `${e.cate_nm}`,
      cateColor: `${e.cate_color}`,
      bgColor: `${e.bg_color}`,
      order: `${e.order}`
    }))])
  }

  const getBoardList = async () => {
    const result = await fetchBoardList();
    setBoardList(result?.list)
  }

  useEffect(() => {
    getInfoList();
    getBoardList();
  }, [])

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
      <div style={{ fontSize: 24, float: 'right' }}>
        {
          <button style={{ fontSize: 24, marginRight: 10 }} onClick={() => setType('tile')}>
            {
              type === 'tile' &&
              <AppstoreFilled style={{ color: '#4F4791' }} />
            }
            {
              type != 'tile' &&
              <AppstoreOutlined style={{ color: '#bcbcbc' }} />
            }
          </button>
        }
        <button style={{ fontSize: 24 }} onClick={() => setType('list')}>
          <UnorderedListOutlined style={{ color: type === 'list' ? '#4F4791' : '#bcbcbc' }} />
        </button>
      </div>
      <Tabs activeKey={activeKey} items={items} onChange={onChange} style={{ fontWeight: 600, marginTop: 15 }} />
      <Row gutter={[15, 15]}>
        {filteredArr?.map((e: any, i: number) => {
          const item = items?.find((ele: any) => ele.key === String(e?.cate_seq));
          return (
          <Col key={i} xs={24} sm={24} md={24} lg={colSpan?.[0]} xl={colSpan?.[1]} xxl={colSpan?.[1]}>
            <>
              {
                type === 'tile' &&
                <PostCard key={'card' + i} obj={{...e, cateName: item?.label, cateColor: item?.cateColor, bgColor: item?.bgColor}} />
              }
              {
                type === 'list' &&
                <>
                  <PostList key={'list' + i} obj={{...e, cateName: item?.label, cateColor: item?.cateColor, bgColor: item?.bgColor}} />
                  {
                    i != filteredArr?.length - 1 &&
                    <Divider key={'divider' + i} style={{ margin: '15px 0 0 0', borderColor: '#D2D4D8' }} />
                  }
                </>
              }
            </>
          </Col>
        )
            })}
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

export const fetchInfoList = async () => {
  const res = await fetch(`/api/board/info/list`, {
    method: 'POST',
  });
  const result = await res.json();

  return result?.data;
}

export const fetchBoardList = async () => {
  const res = await fetch(`/api/board/list`, {
    method: 'POST',
  });
  const result = await res.json();

  return result?.data;
}
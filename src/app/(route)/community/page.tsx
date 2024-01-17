'use client'

import { Button, Col, Divider, Row, Tabs } from "antd";
import { FormOutlined, AppstoreOutlined, UnorderedListOutlined, AppstoreFilled } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import PostCard from '@/components/Community/PostCard';
import { useEffect, useState } from 'react';
import PostList from "@/components/Community/PostList";
import { BoardTypes } from '@/types/Board/Board.interface';
import { loadBoardList, loadInfoList } from '@/api/Api';
import { useSession } from 'next-auth/react';

interface IInfoTypes {
  key: string;
  label: string;
  cateColor: string | undefined;
  bgColor: string | undefined;
  order: number | undefined;
}

const Community = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeKey, setActiveKey] = useState('all');
  const [type, setType] = useState('tile');
  const [items, setItems] = useState<IInfoTypes[]>([
    {
      key: 'all',
      label: '전체',
      cateColor: undefined,
      bgColor: undefined,
      order: undefined,
    }
  ]);
  const [boardList, setBoardList] = useState<BoardTypes[]>([]);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const defaultFilterCateList = ['4', '5'];
  const filteredArr = boardList?.length ? boardList?.filter((e: any) => activeKey === 'all' ? !defaultFilterCateList?.includes(String(e?.cate_seq)) : String(e?.cate_seq) === activeKey) : new Array(8).fill(null);
  const colSpan = type === 'tile' ? [8, 6] : [24, 24]
  
  const getInfoList = async () => {
    // const result = await fetchInfoList();
    const result = await loadInfoList();
    setItems([...items, ...result?.list?.map((e: any) => ({
      key: `${e.cate_seq}`,
      label: `${e.cate_nm}`,
      cateColor: `${e.cate_color}`,
      bgColor: `${e.bg_color}`,
      order: `${e.order}`
    }))])
  }

  const getBoardList = async () => {
    // const result = await fetchBoardList();
    const result = await loadBoardList();
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
        disabled={status != 'authenticated' ? true : false}
        style={{ width: 125, height: 47, fontWeight: "bold", fontSize: 16 }}
      >
        <FormOutlined /> 작성하기
      </Button>
      <div style={{ fontSize: 24, float: 'right' }}>
        {
          <button style={{ fontSize: 24, marginRight: 10 }} onClick={() => setType('tile')}>
            <div>
              {
                type === 'tile' &&
                <AppstoreFilled style={{ color: '#4F4791' }} />
              }
              {
                type != 'tile' &&
                <AppstoreOutlined style={{ color: '#bcbcbc' }} />
              }
            </div>
            <div style={{ fontSize: 12, textAlign: 'center', color: 'grey' }}>
              Tile
            </div>
          </button>
        }
        <button style={{ fontSize: 24 }} onClick={() => setType('list')}>
          <UnorderedListOutlined style={{ color: type === 'list' ? '#4F4791' : '#bcbcbc' }} />
          <div style={{ fontSize: 12, textAlign: 'center', color: 'grey' }}>
            List
          </div>
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
                <PostCard key={'card' + i} obj={{...e, cate_color: item?.cateColor, bg_color: item?.bgColor}} />
              }
              {
                type === 'list' &&
                <>
                  <PostList key={'list' + i} obj={{...e, cate_color: item?.cateColor, bg_color: item?.bgColor}} />
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

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

const fetchInfoList = async () => {
  const res = await fetch(`/api/board/info/list`, {
    method: 'POST',
  });
  const result = await res.json();

  return result?.data;
}

const fetchBoardList = async () => {
  const res = await fetch(`/api/board/list`, {
    method: 'POST',
  });
  const result = await res.json();

  return result?.data;
}
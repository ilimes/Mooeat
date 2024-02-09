'use client';

import { Button, Col, Divider, Row, Tabs } from 'antd';
import {
  FormOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  AppstoreFilled,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import PostCard from '@/components/Community/PostCard';
import PostList from '@/components/Community/PostList';
import { BoardTypes } from '@/types/Board/Board.interface';
import { loadBoardList, loadInfoList, loadTagsTop5 } from '@/api/Api';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import TopTitle from '@/components/SharedComponents/TopTitle';

interface IInfoTypes {
  key: string;
  label: string;
  cateColor: string | undefined;
  bgColor: string | undefined;
  order: number | undefined;
}

const Community = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
    },
  ]);

  const [top5TagList, setTop5TagList] = useState<any>([]);
  const {
    data: boardList,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status: infiniteStatus,
  } = useInfiniteQuery({
    queryKey: ['boardList'],
    queryFn: ({ pageParam }) => {
      const formData: {
        cate_seq_to_exclude?: number[];
        cate_seq?: number;
        paging_yn?: string;
        size?: number;
        page?: number;
      } = {
        cate_seq_to_exclude: [4, 5],
        paging_yn: 'Y',
        size: 8,
        page: pageParam,
      };
      if (activeKey !== 'all') {
        formData.cate_seq = Number(activeKey);
      }
      return loadBoardList(formData);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const maxPage = pages?.[0]?.pageInfo?.maxPage;
      const prevPage = lastPage?.pageInfo?.page;
      const isLastPage = lastPage.list.length < 8 || prevPage === maxPage;
      return isLastPage ? undefined : pages.length + 1;
    },
  });

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const filteredArr = boardList?.pages
    ? boardList?.pages?.flatMap((e: any) => e?.list)
    : new Array(8).fill(null);

  const colSpan = type === 'tile' ? [8, 6] : [24, 24];

  const getInfoList = async () => {
    const result = await loadInfoList();
    setItems([
      ...items,
      ...result?.list?.map((e: any) => ({
        key: `${e.cate_seq}`,
        label: `${e.cate_nm}`,
        cateColor: `${e.cate_color}`,
        bgColor: `${e.bg_color}`,
        order: `${e.order}`,
      })),
    ]);
  };

  const getTagsTop5 = async () => {
    const result = await loadTagsTop5();
    setTop5TagList(result?.list);
  };

  useEffect(() => {
    getInfoList();
    getTagsTop5();
  }, []);

  useEffect(() => {
    queryClient.removeQueries({
      queryKey: ['boardList'],
    });
    fetchNextPage();
  }, [activeKey]);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div>
      <TopTitle title="커뮤니티" explain="커뮤니티에서 자유롭게 이야기를 나눠보세요 :)" />
      <Button
        type="primary"
        disabled={status !== 'authenticated'}
        onClick={() => router.push('/articles/write')}
        style={{ width: 125, height: 47, fontWeight: 'bold', fontSize: 16 }}
      >
        <FormOutlined /> 작성하기
      </Button>
      <div style={{ fontSize: 24, float: 'right' }}>
        <button style={{ fontSize: 24, marginRight: 10 }} onClick={() => setType('tile')}>
          <div>
            {type === 'tile' && <AppstoreFilled style={{ color: '#4F4791' }} />}
            {type !== 'tile' && <AppstoreOutlined style={{ color: '#bcbcbc' }} />}
          </div>
          <div style={{ fontSize: 12, textAlign: 'center', color: 'grey' }}>Tile</div>
        </button>
        <button style={{ fontSize: 24 }} onClick={() => setType('list')}>
          <UnorderedListOutlined style={{ color: type === 'list' ? '#4F4791' : '#bcbcbc' }} />
          <div style={{ fontSize: 12, textAlign: 'center', color: 'grey' }}>List</div>
        </button>
      </div>
      <div style={{ marginTop: 15, display: 'flex' }}>
        <div style={{ fontWeight: 800, width: 105, verticalAlign: 'middle', lineHeight: 2.55 }}>
          인기 태그 Top5
        </div>
        {/* 태그 영역 */}
        <div style={{ margin: '0', display: 'flex', flexWrap: 'wrap', gap: 7, flex: 1 }}>
          {top5TagList?.map((e: any, i: number) => (
            <StyledTagSpan key={i}>
              #{e?.tag_nm} ({e?.tag_count}회)
            </StyledTagSpan>
          ))}
        </div>
      </div>
      <Tabs
        activeKey={activeKey}
        items={items}
        onChange={onChange}
        style={{ fontWeight: 800, marginTop: 15 }}
      />
      <Row gutter={[15, 15]}>
        {filteredArr?.map((e: any, i: number) => {
          const item = items?.find((ele: any) => ele.key === String(e?.cate_seq));
          return (
            <Col
              key={i}
              xs={24}
              sm={24}
              md={24}
              lg={colSpan?.[0]}
              xl={colSpan?.[1]}
              xxl={colSpan?.[1]}
            >
              <>
                {type === 'tile' && (
                  <PostCard
                    key={`card${i}`}
                    obj={{ ...e, cate_color: item?.cateColor, bg_color: item?.bgColor }}
                  />
                )}
                {type === 'list' && (
                  <>
                    <PostList
                      key={`list${i}`}
                      obj={{ ...e, cate_color: item?.cateColor, bg_color: item?.bgColor }}
                    />
                    {i !== filteredArr?.length - 1 && (
                      <Divider
                        key={`divider${i}`}
                        style={{ margin: '15px 0 0 0', borderColor: '#D2D4D8' }}
                      />
                    )}
                  </>
                )}
              </>
            </Col>
          );
        })}
      </Row>
      <div ref={setTarget} />
    </div>
  );
};

export default Community;

const StyledTagSpan = styled.span`
  background: #f9f9ff;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    color: #7944f4;
  }
`;

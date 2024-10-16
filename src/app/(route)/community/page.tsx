/* eslint-disable react/no-unescaped-entities */

'use client';

import { Button, Col, Divider, Row, Spin, Tabs } from 'antd';
import {
  FormOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  AppstoreFilled,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import PostCard from '@/src/components/Community/PostCard';
import PostList from '@/src/components/Community/PostList';
import { loadBoardList, loadInfoList, loadTagsTop5 } from '@/src/app/api/Api';
import { useIntersectionObserver } from '@/src/hooks/useIntersectionObserver';
import TopTitle from '@/src/components/SharedComponents/TopTitle';
import { useModal } from '@/src/hooks/useModal';

interface IInfoTypes {
  key: string;
  label: string;
  cateColor: string | undefined;
  bgColor: string | undefined;
  order: number | undefined;
}

const Community = () => {
  const { Modal, isOpen, openModal, closeModal } = useModal();
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
  const [searchTag, setSearchTag] = useState<string>('');
  const [searchContent, setSearchContent] = useState<string>('');
  const [searchBoardList, setSearchBoardList] = useState([]);

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

  const onCloseModal = () => {
    setSearchContent('');
    setSearchTag('');
  };

  const onClickTag = (tag: string) => {
    setSearchTag(tag);
    openModal();
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

  useEffect(() => {
    if (searchTag) {
      const getSearchBoardList = async () => {
        const formData = { option: { search_tag: searchTag } };
        const result = await loadBoardList(formData);
        setSearchBoardList(result?.list);
      };
      getSearchBoardList();
    }
  }, [searchTag]);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <>
      <div>
        <TopTitle title="커뮤니티" explain="커뮤니티에서 자유롭게 이야기를 나눠보세요 :)" />
        <TopBtnSection>
          <StyledButton
            type="primary"
            disabled={status !== 'authenticated'}
            onClick={() => router.push('/articles/write')}
          >
            <FormOutlined /> 작성하기
          </StyledButton>
          <ButtonWrap>
            <StyledButtonWrap onClick={() => setType('tile')}>
              {type === 'tile' && <AppstoreFilled style={{ color: '#4F4791' }} />}
              {type !== 'tile' && <AppstoreOutlined style={{ color: '#bcbcbc' }} />}
              <div>Tile</div>
            </StyledButtonWrap>
            <StyledButtonWrap onClick={() => setType('list')}>
              <UnorderedListOutlined style={{ color: type === 'list' ? '#4F4791' : '#bcbcbc' }} />
              <div>List</div>
            </StyledButtonWrap>
          </ButtonWrap>
        </TopBtnSection>
        <TagWrap>
          <StyledTitle>인기 태그 Top5</StyledTitle>
          <TagListWrap>
            {top5TagList?.map((e: any, i: number) => (
              <StyledTagSpan key={i} onClick={() => onClickTag(e?.tag_nm)}>
                #{e?.tag_nm} ({e?.tag_count}회)
              </StyledTagSpan>
            ))}
          </TagListWrap>
        </TagWrap>
        <StyledTabs activeKey={activeKey} items={items} onChange={onChange} />
        <Row gutter={[25, 25]}>
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
                          style={{ margin: '15px 0 0 0', background: '#d2d4d8' }}
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
      <Modal
        title=""
        isOpen={isOpen}
        closeModal={closeModal}
        afterClose={onCloseModal}
        width="90%"
        destroyOnClose
        afterOpenChange={(open) => {
          if (!open) {
            setSearchBoardList([]);
          }
        }}
        styles={{ content: { maxWidth: 860, margin: '0 auto' } }}
      >
        <ModalContent>
          <SearchHeader>
            <span>"{searchTag || searchContent}"</span>
            {searchTag && '태그'} {searchContent && '게시글'} 검색 결과
          </SearchHeader>
          <SearchResult>{searchBoardList?.length}건의 게시물을 찾았습니다.</SearchResult>
          <SearchListDiv>
            {searchBoardList?.map((e: any, i: number) => {
              const item = items?.find((ele: any) => ele.key === String(e?.cate_seq));
              return (
                <PostList
                  key={`list-search-${i}`}
                  obj={{ ...e, cate_color: item?.cateColor, bg_color: item?.bgColor }}
                  disableFade
                />
              );
            })}
          </SearchListDiv>
          {!searchBoardList?.length && (
            <Spin style={{ display: 'flex', justifyContent: 'center' }} size="large" />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Community;

const StyledButton = styled(Button)`
  width: 125px !important;
  height: 47px !important;
  font-weight: bold !important;
  font-size: 16px !important;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  font-size: 24px;
`;

const StyledButtonWrap = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;

  div {
    font-size: 12px;
    text-align: center;
    color: grey;
  }
`;

const TopBtnSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TagWrap = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 7px;
  @media screen and (max-width: 991px) {
    flex-direction: column;
  }
`;

const StyledTitle = styled.div`
  font-weight: 800;
  width: 105px;
  vertical-align: middle;
  line-height: 2.55;
`;

const TagListWrap = styled.div`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  flex: 1;
`;

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

const ModalContent = styled.div`
  margin: 30px 0;
`;

const SearchHeader = styled.div`
  font-weight: 800;
  font-size: 20px;

  span {
    font-weight: bold;
    color: #4f4791;
  }
`;

const SearchResult = styled.div`
  margin-bottom: 20px;
`;

const SearchListDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  > div {
    background: #f1f1f1;
    padding: 15px;
    border-radius: 10px;
  }

  animation: fadeIn 100ms;
  opacity: 0;
  animation-fill-mode: forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const StyledTabs = styled(Tabs)`
  font-weight: 800;
  margin-top: 15px !important;
`;

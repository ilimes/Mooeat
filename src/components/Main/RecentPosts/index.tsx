import { ArrowRightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import Marquee from 'react-fast-marquee';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import Content from '@/src/components/SharedComponents/Content';
import * as S from './styles';
import { loadBoardList } from '@/src/app/api/Api';
import Post from './Post';

const RecentPosts = () => {
  const router = useRouter();
  const { data: mainBoardList, refetch: mainBoardListRefetch } = useQuery({
    queryKey: ['mainBoardList'],
    queryFn: () => {
      const formData: {
        cate_seq_to_exclude?: number[];
        cate_seq?: number;
        paging_yn?: string;
        size?: number;
        page?: number;
      } = {
        cate_seq_to_exclude: [4, 5],
        paging_yn: 'Y',
        size: 10,
        page: 1,
      };
      return loadBoardList(formData);
    },
  });
  return (
    <S.Wrap>
      <Content>
        <S.ContentLayout>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              fontWeight: 800,
              fontSize: 22,
              marginBottom: 20,
            }}
          >
            <span>최근 게시글</span>
            <Button type="primary" ghost size="small" onClick={() => router.push('/community')}>
              <ArrowRightOutlined /> 게시글 더보기
            </Button>
          </div>
          <Marquee
            pauseOnHover
            speed={50}
            gradient
            gradientWidth={20}
            gradientColor="#FFF"
            style={{ overflow: 'hidden' }}
          >
            {mainBoardList?.list?.map((e: any, i: number) => {
              const item = [
                {
                  key: 'all',
                  label: '전체',
                  cateColor: undefined,
                  bgColor: undefined,
                  order: undefined,
                },
              ]?.find((ele: any) => ele.key === String(e?.cate_seq));

              return (
                <Post
                  key={`card${i}`}
                  obj={{ ...e, cate_color: item?.cateColor, bg_color: item?.bgColor }}
                />
              );
            })}
          </Marquee>
        </S.ContentLayout>
      </Content>
    </S.Wrap>
  );
};

export default RecentPosts;

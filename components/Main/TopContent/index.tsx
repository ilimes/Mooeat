import { Card, Col, Empty, Row, Tooltip } from 'antd';
import {
  InfoCircleOutlined,
  CommentOutlined,
  DollarOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import Content from '@/components/SharedComponents/Content';
import * as S from './styles';
import User from './User';
import { loadTop3Rank } from '@/api/Api';

const TopContent = () => {
  const { data: rankingData, refetch: rankingsRefetch } = useQuery({
    queryKey: ['top3Rank'],
    queryFn: loadTop3Rank,
    // enabled: !!user,
  });

  const pointTop3Rankings = rankingData?.rankings?.pointTop3;
  const postTop3Rankings = rankingData?.rankings?.postTop3;
  const commentTop3Rankings = rankingData?.rankings?.commentTop3;

  return (
    <S.Wrap>
      <Content>
        <S.ContentLayout>
          <Row gutter={[20, 20]} style={{ alignItems: 'center' }}>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Card
                title={
                  <S.CardTitleWrap>
                    <div>
                      <DollarOutlined />
                      포인트 적립 Top3
                    </div>
                    <div style={{ color: '#6b7280' }}>
                      <Tooltip title="전체 회원의 포인트 순위를 표시합니다." placement="bottom">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </div>
                  </S.CardTitleWrap>
                }
                style={{ height: 220 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {pointTop3Rankings?.length &&
                    pointTop3Rankings?.map((item: any, index: number) => (
                      <User
                        key={index}
                        userName={item?.user_nm}
                        value={item?.point}
                        profilePath={item?.file_path}
                        suffix="P"
                      />
                    ))}
                  {!pointTop3Rankings?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Card
                title={
                  <S.CardTitleWrap>
                    <div>
                      <FileOutlined /> 게시글 작성 Top3
                    </div>
                    <div style={{ color: '#6b7280' }}>
                      <Tooltip
                        title="전체 회원의 게시글 작성 순위를 표시합니다."
                        placement="bottom"
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                    </div>
                  </S.CardTitleWrap>
                }
                style={{ height: 220 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {postTop3Rankings?.length &&
                    postTop3Rankings?.map((item: any, index: number) => (
                      <User
                        key={index}
                        userName={item?.user_nm}
                        value={item?.post_count}
                        profilePath={item?.file_path}
                        suffix="개"
                      />
                    ))}
                  {!postTop3Rankings?.length && (
                    <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Card
                title={
                  <S.CardTitleWrap>
                    <div>
                      <CommentOutlined /> 댓글 작성 Top3
                    </div>
                    <div style={{ color: '#6b7280' }}>
                      <Tooltip title="전체 회원의 댓글 작성 순위를 표시합니다." placement="bottom">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </div>
                  </S.CardTitleWrap>
                }
                style={{ height: 220 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                  {commentTop3Rankings?.length &&
                    commentTop3Rankings?.map((item: any, index: number) => (
                      <User
                        key={index}
                        userName={item?.user_nm}
                        value={item?.comment_count}
                        profilePath={item?.file_path}
                        suffix="개"
                      />
                    ))}
                  {!commentTop3Rankings?.length && (
                    <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </S.ContentLayout>
      </Content>
    </S.Wrap>
  );
};

export default TopContent;

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, Col, Divider, Row, Image as AntImage, Card, Tooltip, Tag } from 'antd';
import { MessageOutlined, ZoomInOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import moment from 'moment';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { Friend, FriendTypes } from '@/types/Friend/Friend.interface';
import { loadShareListView, loadShareUserList, loadUserInfoData } from '@/api/Api';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';
import { getDayKorean, getTagColor } from '@/utils/util';

const ReceivedList = ({ pureFriendList }: { pureFriendList: Friend[] }) => {
  const { data: session, status } = useSession();
  const [shareUserList, setShareUserList] = useState<any>([]);
  const [shareListView, setShareListView] = useState<any>([]);
  const [filterSeq, setFilterSeq] = useState(null);

  const filteredShareListView = filterSeq
    ? shareListView?.filter((e: any) => e.user_seq === filterSeq)
    : shareListView;

  const user = session?.user;
  const {
    data: userInfo,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const result = await loadUserInfoData({});
      if (result?.success) {
        return result?.user_info;
      }
      return null;
    },
    enabled: !!user,
  });
  const profileImg = userInfo?.user_set?.file_path_thumb;

  /**
   * 식단을 보낸 유저 목록 조회
   */
  const getShareUserList = async () => {
    const result = await loadShareUserList();
    setShareUserList(result?.list);
  };

  /**
   * 특정 유저의 식단 전송 정보 목록 조회
   */
  const getShareListView = async () => {
    const result = await loadShareListView();
    setShareListView(result?.list);
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getShareUserList();
      getShareListView();
    }
  }, [status]);

  return (
    <>
      <StyledBtnsDiv>
        <Btn filterSeq={filterSeq} setFilterSeq={setFilterSeq} />
        {shareUserList?.map((e: any, i: number) => (
          <Btn
            key={i}
            seq={e?.user_seq}
            profile_path={e?.profile_path}
            title={e?.user_nm}
            filterSeq={filterSeq}
            setFilterSeq={setFilterSeq}
          />
        ))}
      </StyledBtnsDiv>
      {/* <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}> */}
      <Row gutter={[15, 15]}>
        {filteredShareListView?.map((e: any, i: number) => {
          const nowProfilePath = shareUserList?.find(
            (ele: any) => ele.user_id === e.user_id,
          )?.profile_path;
          return (
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Card
                key={i}
                style={{
                  border: '1px solid #eee',
                  boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
                }}
              >
                <Tag color={getTagColor(e?.time_nm)}>{e?.time_nm}</Tag>
                <h2>
                  {moment(e?.reg_dt)?.format('YYYY-MM-DD')} (
                  {getDayKorean(moment(e?.reg_dt)?.day())})
                  <span style={{ marginLeft: 10, fontWeight: 400 }}>
                    {moment(e?.reg_dt)?.format('HH:mm:ss')}
                  </span>
                </h2>
                {/* 아바타 영역 */}
                <div style={{ margin: '30px 0', display: 'flex', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div>
                      <Avatar
                        size={40}
                        icon={
                          nowProfilePath ? (
                            <img
                              src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${nowProfilePath}?thumb=1`}`}
                              alt="avatar"
                            />
                          ) : (
                            <Image src={unknownAvatar} alt="unknown" />
                          )
                        }
                      />
                    </div>
                    <StyledOutDiv>
                      <StyledOutDiv style={{ fontSize: 15 }}>{e?.user_nm}</StyledOutDiv>
                      <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
                        {e?.user_id}
                      </StyledOutDiv>
                    </StyledOutDiv>
                  </div>
                  <ArrowRightOutlined />
                  <div style={{ display: 'flex', gap: 10 }}>
                    <div>
                      <Avatar
                        size={40}
                        icon={
                          profileImg ? (
                            <img
                              src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${profileImg}?thumb=1`}`}
                              alt="avatar"
                            />
                          ) : (
                            <Image src={unknownAvatar} alt="unknown" />
                          )
                        }
                      />
                    </div>
                    <StyledOutDiv>
                      <StyledOutDiv style={{ fontSize: 15 }}>{e?.to_user_nm}</StyledOutDiv>
                      <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>
                        {e?.to_user_id}
                      </StyledOutDiv>
                    </StyledOutDiv>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 20,
                    fontSize: 15,
                    border: '1px solid #dbdbdb',
                    borderRadius: 12,
                    padding: 10,
                  }}
                >
                  <MessageOutlined style={{ marginRight: 5 }} />
                  {e?.content}
                </div>
                <StyledDiv>
                  <Row gutter={[0, 20]} style={{ width: '100%', marginTop: 20 }}>
                    <AntImage.PreviewGroup
                      preview={{
                        onChange: (current, prev) =>
                          console.log(`current index: ${current}, prev index: ${prev}`),
                      }}
                    >
                      {e.file_uids?.map((e: any, index: number) => (
                        <Col key={index} span={8} style={{ padding: 10 }}>
                          <div
                            style={{
                              textAlign: 'center',
                              border: '1px solid #ccc',
                              borderRadius: 16,
                              overflow: 'hidden',
                            }}
                          >
                            <AntImage
                              style={{
                                width: '100%',
                                height: 150,
                                display: 'block',
                                objectFit: 'cover',
                                // borderRadius: 16,
                              }}
                              src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${e}?thumb=1`}`}
                              fallback="/img/noimg.png"
                              preview={{
                                mask: (
                                  <>
                                    <ZoomInOutlined style={{ marginRight: 5 }} /> 크게보기
                                  </>
                                ),
                              }}
                            />
                          </div>
                        </Col>
                      ))}
                    </AntImage.PreviewGroup>
                  </Row>
                </StyledDiv>
              </Card>
            </Col>
          );
        })}
      </Row>
      {/* </div> */}
    </>
  );
};

const Btn = ({
  seq,
  profile_path,
  title,
  filterSeq,
  setFilterSeq,
}: {
  seq?: number;
  profile_path?: string;
  title?: string;
  filterSeq: any;
  setFilterSeq: Dispatch<SetStateAction<any>>;
}) => (
  <div>
    <div
      key="all"
      onClick={() => setFilterSeq(seq || null)}
      aria-hidden="true"
      style={{
        textAlign: 'center',
        background: (!seq && !filterSeq) || (seq && filterSeq === seq) ? '#ddd' : '#fff',
        padding: '5px 2px',
        width: 55,
        borderRadius: 12,
        transition: '0.5s',
        cursor: 'pointer',
      }}
    >
      <Tooltip title={title}>
        <Avatar
          size={32}
          icon={
            profile_path ? (
              <img
                src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${profile_path}?thumb=1`}`}
                alt="avatar"
              />
            ) : (
              <Image src={unknownAvatar} alt="unknown" style={{ background: '#eee' }} />
            )
          }
        />
        <BtnTitle>{title || '전체'}</BtnTitle>
      </Tooltip>
    </div>
  </div>
);

export default ReceivedList;

const StyledDiv = styled.div`
  align-items: center;
  display: flex;
  .preview_info {
    width: 100%;
    list-style: none;
    padding: 0;
    gap: 16px;
    display: flex;
    flex-direction: column;
  }

  .preview_info .info_key {
    display: block;
    font-weight: 500;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .preview_info .info_value {
    font-size: 14px;
  }
`;

const StyledOutDiv = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const BtnTitle = styled.div`
  && {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

const StyledBtnsDiv = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  overflow: auto;
  border-radius: 16px;
  padding: 10px;
`;

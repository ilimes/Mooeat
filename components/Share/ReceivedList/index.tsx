import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, Col, Divider, Row, Image as AntImage, Card, Popover } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import Image from 'next/image';
import moment from 'moment';
import styled from 'styled-components';
import { FriendTypes } from '@/types/Friend/Friend.interface';
import { loadShareListView, loadShareUserList } from '@/api/Api';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';

const ReceivedList = ({ pureFriendList }: { pureFriendList: FriendTypes[] }) => {
  const { data: session, status } = useSession();
  const [shareUserList, setShareUserList] = useState<any>([]);
  const [shareListView, setShareListView] = useState<any>([]);
  const [filterSeq, setFilterSeq] = useState(null);

  const filteredShareListView = filterSeq
    ? shareListView?.filter((e: any) => e.user_seq === filterSeq)
    : shareListView;

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
      <div
        style={{
          display: 'flex',
          gap: 10,
          margin: '20px 0',
          border: '1px solid #ccc',
          borderRadius: 16,
          padding: 10,
        }}
      >
        <div
          key="all"
          onClick={() => setFilterSeq(null)}
          aria-hidden="true"
          style={{
            textAlign: 'center',
            background: !filterSeq ? '#ddd' : '#fff',
            padding: 5,
            borderRadius: 12,
            transition: '0.5s',
            cursor: 'pointer',
          }}
        >
          <Avatar size={32} icon={<Image src={unknownAvatar} alt="unknown" />} />
          <div>전체보기</div>
        </div>
        {shareUserList?.map((e: any, i: number) => (
          <div
            key={i}
            onClick={() => setFilterSeq(e?.user_seq)}
            aria-hidden="true"
            style={{
              textAlign: 'center',
              padding: 5,
              borderRadius: 12,
              background: filterSeq === e?.user_seq ? '#ddd' : '#fff',
              transition: '0.5s',
              cursor: 'pointer',
            }}
          >
            <Avatar
              size={32}
              icon={
                e?.profile_path ? (
                  <img
                    src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${e?.profile_path}?thumb=1`}`}
                    alt="avatar"
                  />
                ) : (
                  <Image src={unknownAvatar} alt="unknown" />
                )
              }
            />
            <div>{`${e?.user_nm}`}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        {filteredShareListView?.map((e: any, i: number) => {
          const nowProfilePath = shareUserList?.find(
            (ele: any) => ele.user_id === e.user_id,
          )?.profile_path;
          return (
            <Card
              key={i}
              style={{
                border: '1px solid #eee',
                boxShadow: '0 8px 15px 0 rgba(129, 137, 143, 0.18)',
              }}
            >
              <h2>{moment(e?.reg_dt)?.format('YYYY-MM-DD')}</h2>
              <h3>{e?.time_nm}</h3>
              {/* 아바타 영역 */}
              <div style={{ margin: '30px 0', display: 'flex', gap: 10 }}>
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
                  <StyledOutDiv style={{ fontSize: 13, color: 'grey' }}>{e?.user_id}</StyledOutDiv>
                </StyledOutDiv>
              </div>
              <div style={{ marginTop: 20, fontSize: 15 }}>
                <MessageOutlined style={{ marginRight: 5 }} />
                {e?.content}
              </div>
              <StyledDiv>
                <Row gutter={[0, 20]} style={{ width: '100%', marginTop: 20 }}>
                  {e.file_uids?.map((e: any, index: number) => (
                    <Col key={index} span={8} style={{ padding: 10 }}>
                      <div>
                        <Popover
                          content={
                            <img
                              src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${e}`}`}
                              alt="originImg"
                            />
                          }
                          style={{ maxWidth: '90vw', maxHeight: '90vh' }}
                        >
                          <img
                            src={`http://${process.env.NEXT_PUBLIC_BACKEND_URL}${`${e}?thumb=1`}`}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{
                              width: '100%',
                              height: 150,
                              display: 'block',
                              borderRadius: 16,
                              border: '1px solid #ccc',
                              objectFit: 'cover',
                            }}
                            // onClick={() => setFileInfo(shareObj.imagses[index])}
                            alt={`${e}`}
                          />
                        </Popover>
                      </div>
                    </Col>
                  ))}
                </Row>
              </StyledDiv>
            </Card>
          );
        })}
      </div>
    </>
  );
};

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

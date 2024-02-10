import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, Col, Divider, Row, Image as AntImage } from 'antd';
import Image from 'next/image';
import moment from 'moment';
import styled from 'styled-components';
import { FriendTypes } from '@/types/Friend/Friend.interface';
import { loadShareListView, loadShareUserList } from '@/api/Api';
import unknownAvatar from '@/public/img/profile/unknown-avatar.png';

const ReceivedList = ({ pureFriendList }: { pureFriendList: FriendTypes[] }) => {
  const { data: session, status } = useSession();
  const [shareUserList, setShareUserList] = useState([]);
  const [shareListView, setShareListView] = useState([]);

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
      <div>
        {shareUserList?.map((e: any, i: number) => (
          <div key={i}>
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
            />{' '}
            <div>{`${e?.user_nm}`}</div>
          </div>
        ))}
      </div>
      <Divider />
      <div>
        {shareListView?.map((e: any, i: number) => (
          <div key={i}>
            <h2>{moment(e?.reg_dt)?.format('YYYY-MM-DD')}</h2>
            <h3>{e?.time_nm}</h3>
            <div>
              {e?.user_nm} ({e?.user_id})
            </div>
            <div>{e?.content}</div>
            <StyledDiv>
              <Row gutter={[0, 20]} style={{ width: '100%', marginTop: 20 }}>
                {e.file_uids?.map((e: any, index: number) => (
                  <Col key={index} span={8} style={{ padding: 10 }}>
                    <div>
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
                    </div>
                  </Col>
                ))}
              </Row>
            </StyledDiv>
          </div>
        ))}
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

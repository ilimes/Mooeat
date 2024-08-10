import { Empty, Spin } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import SlotCounter from 'react-slot-counter';
import FlipNumbers from 'react-flip-numbers';
import { PointLogTypes } from '@/types/Point/Point.interface';
import { loadPointLogData, loadUserInfoData } from '@/api/Api';

const Point = () => {
  const { data: session, status } = useSession();
  const [point, setPoint] = useState<number | null>(null);
  const [pointLog, setPointLog] = useState<PointLogTypes[]>([]);

  const myPoint = point !== null ? Number(point) : 0;

  const token = session?.user?.info?.data?.token;
  const userSeq = session?.user?.info?.userInfo?.user_seq;

  const getUserInfoData = async () => {
    const result = await loadUserInfoData({});
    if (result?.success) {
      setPoint(result?.user_info?.point);
    } else {
      setPoint(null);
    }
  };

  const getPointLogData = async () => {
    const formData: any = { user_seq: userSeq };
    const result = await loadPointLogData(formData);
    if (result?.success) {
      setPointLog(result?.list);
    } else {
      setPointLog([]);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getUserInfoData();
      getPointLogData();
    }
  }, [status]);

  return (
    <>
      <SubTitle>내 포인트</SubTitle>
      <StyledBoxDiv style={{ height: 22 }}>
        {point != null && (
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>
                {/* <SlotCounter value={myPoint ? myPoint?.toLocaleString() : 0} /> */}
                <FlipNumbers
                  play
                  color="#000"
                  duration={1.5}
                  width={14}
                  height={22}
                  numbers={myPoint ? myPoint?.toLocaleString() : '0'}
                />
              </span>
              포인트
            </span>
          </>
        )}
        {point === null && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
      </StyledBoxDiv>
      <SubTitle>획득 및 차감내역</SubTitle>
      <StyledBoxDiv>
        {pointLog?.length === 0 ? (
          <div>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            {pointLog?.map((e: PointLogTypes, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 0, padding: '0 10px' }}>
                <div style={{ display: 'flex', width: 40, alignItems: 'center' }}>
                  {e?.type === 'G' && <PlusOutlined />}
                  {e?.type === 'D' && <MinusOutlined />}
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 3 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{e?.message}</div>
                  <div style={{ color: 'grey', fontSize: 13 }}>
                    {moment(e?.reg_dt).format('YYYY-MM-DD')}
                  </div>
                  {e?.type === 'G' && (
                    <div style={{ color: 'grey', fontSize: 13 }}>
                      {moment(e?.reg_dt).format('YYYY-MM-DD')} ~{' '}
                      {e?.expire_dt ? moment(e?.expire_dt).format('YYYY-MM-DD') : '유효기간 없음'}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: 100,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    color: e?.type === 'G' ? '#47408F' : 'grey',
                  }}
                >
                  {e?.point}P
                </div>
              </div>
            ))}
          </div>
        )}
      </StyledBoxDiv>
    </>
  );
};

export default Point;

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #bbcedd;
  border-radius: 10px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #5d559a;
`;

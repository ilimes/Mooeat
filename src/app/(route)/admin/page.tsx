'use client';

import { Alert, Button, Card, Col, Row, Spin } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import SlotCounter from 'react-slot-counter';
import { BarChartOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import FlipNumbers from 'react-flip-numbers';
import { adminCollapsedState } from '@/src/recoil/states';
import TopTitle from '@/src/components/SharedComponents/TopTitle';
import { loadApiData, loadTodayVisitorCount, loadUserList } from '@/src/app/api/Api';
import { UserInfoTypes } from '@/src/types/User/User.interface';
import useCountUp from '@/src/hooks/useCountUp';

const Admin = () => {
  const {
    data: visitorCount,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['visitorCount'],
    queryFn: async () => {
      const result = await loadTodayVisitorCount();
      if (result?.success) {
        return result?.data;
      }
      return null;
    },
  });

  const router = useRouter();
  const [userList, setUserList] = useState<UserInfoTypes[]>([]);
  const setCollapsed = useSetRecoilState(adminCollapsedState);
  const [data, setData] = useState([]);
  const [apiCount, setApiCount] = useState(0);
  const [firstTime, setFirstTime] = useState('');

  const todayApiCount = apiCount;
  const todayVisitorCount = visitorCount ?? 0;
  const totalMemberCount = userList?.length;

  const getApiData = async () => {
    const type = 'day';
    const year = 2024;
    const formData: { type: string; year: number } = { type, year };
    const result = await loadApiData(formData);
    const todayCount = result?.list?.find(
      (e: any) => e.date === moment().format('YYYY-MM-DD'),
    )?.count;
    setData(result?.list);
    setApiCount(todayCount ?? 0);
  };

  const getUserList = async () => {
    const result = await loadUserList();
    setUserList(result?.list);
  };

  useEffect(() => {
    getUserList();
    getApiData();
    setFirstTime(moment().format('YYYY-MM-DD HH:mm:ss'));
  }, []);

  useEffect(() => {
    setCollapsed(false);
  }, []);

  return (
    <>
      <TopTitle title="관리자 페이지 홈" explain="관리자 페이지 메인 화면 입니다." />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}
      >
        {firstTime} 기준
      </div>
      <Row gutter={[15, 15]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Alert message="관리자 페이지 수정 중 입니다." type="warning" closable />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <StyledAdminTopCardDiv>
            <h2>오늘 방문자 수</h2>
            <StyledTopCardContent>
              <div>
                <BarChartOutlined />
              </div>
              <div>
                {isSuccess ? (
                  <span>
                    {todayVisitorCount ? (
                      // <SlotCounter value={todayVisitorCount?.toLocaleString()} />
                      <FlipNumbers
                        play
                        color="#000"
                        duration={1.5}
                        width={13}
                        height={22}
                        numbers={todayVisitorCount?.toLocaleString() ?? '0'}
                      />
                    ) : (
                      0
                    )}
                  </span>
                ) : (
                  <Spin />
                )}
              </div>
            </StyledTopCardContent>
          </StyledAdminTopCardDiv>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <StyledAdminTopCardDiv>
            <h2>전체 회원 수</h2>
            <StyledTopCardContent>
              <div>
                <UserOutlined />
              </div>
              <div>
                <span>
                  {/* <SlotCounter value={totalMemberCount ? totalMemberCount?.toLocaleString() : 0} /> */}
                  <FlipNumbers
                    play
                    color="#000"
                    duration={1.5}
                    width={13}
                    height={22}
                    numbers={totalMemberCount ? totalMemberCount?.toLocaleString() : '0'}
                  />
                </span>
              </div>
            </StyledTopCardContent>
          </StyledAdminTopCardDiv>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <StyledAdminTopCardDiv>
            <h2>오늘 API 호출 수</h2>
            <StyledTopCardContent>
              <div>
                <NotificationOutlined />
              </div>
              <div>
                <span>
                  {/* <SlotCounter value={todayApiCount ? todayApiCount?.toLocaleString() : 0} /> */}
                  <FlipNumbers
                    play
                    color="#000"
                    duration={1.5}
                    width={13}
                    height={22}
                    numbers={todayApiCount ? todayApiCount?.toLocaleString() : '0'}
                  />
                </span>
              </div>
            </StyledTopCardContent>
          </StyledAdminTopCardDiv>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <StyledAdminTopCardDiv>
            <h2>일별 API 호출 수</h2>
            <div style={{ width: '100%', height: 500 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={13} />
                  <YAxis />
                  <Tooltip formatter={(e: any) => `${e}회`} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="호출 횟수"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.2}
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6 }}
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </StyledAdminTopCardDiv>
        </Col>
      </Row>
    </>
  );
};

export default Admin;

const StyledDiv = styled.div`
  border-radius: 16px;
`;

const StyledAdminTopCardDiv = styled(Card)`
  & .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h2 {
      margin: 0;
    }
  }
`;

const StyledTopCardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
`;

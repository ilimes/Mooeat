'use client';

import { Button, Card, Col, Row } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { BarChartOutlined, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { adminCollapsedState } from '@/recoil/states';
import TopTitle from '@/components/SharedComponents/TopTitle';
import { loadApiData, loadTodayVisitorCount, loadUserList } from '@/api/Api';
import { UserInfoTypes } from '@/types/User/User.interface';

const Admin = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<UserInfoTypes[]>([]);
  const setCollapsed = useSetRecoilState(adminCollapsedState);
  const [apiCount, setApiCount] = useState(0);

  const getApiData = async () => {
    const type = 'day';
    const year = 2024;
    const formData: { type: string; year: number } = { type, year };
    const result = await loadApiData(formData);
    const todayCount = result?.list?.find(
      (e: any) => e.date === moment().format('YYYY-MM-DD'),
    )?.count;
    setApiCount(todayCount ?? 0);
  };

  const getUserList = async () => {
    const result = await loadUserList();
    setUserList(result?.list);
  };

  useEffect(() => {
    getUserList();
    getApiData();
  }, []);

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

  useEffect(() => {
    setCollapsed(false);
  }, []);

  return (
    <>
      <TopTitle title="관리자 페이지 홈" explain="관리자 페이지 메인 화면" />
      <Row gutter={[15, 15]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <StyledAdminTopCardDiv>
            <h2>오늘 방문자 수</h2>
            <div>
              <div>
                <BarChartOutlined />
              </div>
              <div>{visitorCount ?? 0}</div>
            </div>
          </StyledAdminTopCardDiv>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <StyledAdminTopCardDiv>
            <h2>전체 회원 수</h2>
            <div>
              <div>
                <UserOutlined />
              </div>
              <div>{userList?.length ?? 0}</div>
            </div>
          </StyledAdminTopCardDiv>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <StyledAdminTopCardDiv>
            <h2>오늘 API 호출 수</h2>
            <div>
              <div>
                <NotificationOutlined />
              </div>
              <div>{apiCount ?? 0}</div>
            </div>
          </StyledAdminTopCardDiv>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
          <Card>관리자 페이지 카드 입니다.</Card>
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

    > div {
      display: flex;
      justify-content: space-between;
      font-size: 24px;
    }
  }
`;

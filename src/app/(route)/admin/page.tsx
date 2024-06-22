'use client';

import { Button, Card, Col, Row } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { BarChartOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { adminCollapsedState } from '@/recoil/states';
import TopTitle from '@/components/SharedComponents/TopTitle';
import { loadTodayVisitorCount } from '@/api/Api';

const Admin = () => {
  const router = useRouter();
  const setCollapsed = useSetRecoilState(adminCollapsedState);

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
            <h2>금일 방문자 수</h2>
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
            <h2>2번 카드</h2>
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
            <h2>3번 카드</h2>
            <div>
              <div>
                <BarChartOutlined />
              </div>
              <div>{visitorCount ?? 0}</div>
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

    > div {
      display: flex;
      justify-content: space-between;
      font-size: 24px;
    }
  }
`;

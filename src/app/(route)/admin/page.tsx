'use client'

import { Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { adminCollapsedState } from '@/recoil/states';
import TopTitle from "@/components/SharedComponents/TopTitle";

const Admin = () => {
  const router = useRouter();
  const setCollapsed = useSetRecoilState(adminCollapsedState);

  useEffect(() => {
    setCollapsed(false);
  }, [])

  return (
    <>
      <TopTitle title='관리자 페이지 홈' explain='관리자 페이지 메인 화면' />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <StyledDiv style={{ padding: 20, border: '1px solid #E1E1E2' }}>
          관리자 페이지 메인화면 작업중 ...
        </StyledDiv>
      </div >
    </>
  );
};

export default Admin;

const StyledDiv = styled.div`
  border-radius: 16px;
`
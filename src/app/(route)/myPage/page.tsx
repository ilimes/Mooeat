'use client'

import React, { useState } from 'react';
import { Button, Divider, Tabs } from "antd";
import type { TabsProps } from 'antd';
import styled, { css } from "styled-components";
import { useRouter } from "next/navigation";
import AccountManagement from '@/components/MyPage/AccountManagement'
import MyActivities from '@/components/MyPage/MyActivities'

const MyPage = () => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState('1');

  const list: TabsProps['items']  = [
    {
      key: '1',
      label: '계정 관리',
      children: null,
    },
    {
      key: '2',
      label: '내 활동',
      children: null,
    },
  ]

  const onChange = (key: string) => {
    setSelectedKey(key);
  };

  return (
    <div>
      <Title>마이페이지</Title>
      <Explain>마이페이지 입니다.</Explain>
      <StyledTabs activeKey={selectedKey} items={list} onChange={onChange} />
      <div style={{ display: 'flex', gap: 40 }}>
        <StyledResponsiveDiv style={{ width: 300, height: 580 }}>
          <StyledBoxDiv style={{ height: '100%' }}>
            {
              list?.map(e =>
                <StyledMenuDiv key={e?.key} $menukey={e?.key} $selectedkey={selectedKey} onClick={() => setSelectedKey(e?.key)}>
                  {e?.label}
                </StyledMenuDiv>)
            }
          </StyledBoxDiv>
        </StyledResponsiveDiv>
        <div style={{ flex: 1 }}>
          <Title style={{ marginBottom: 20 }}>{list?.find(e => e.key === selectedKey)?.label}</Title>
          {
            selectedKey === '1' && <AccountManagement />
          }
          {
            selectedKey === '2' && <MyActivities />
          }
        </div>
      </div>
    </div>
  );
};

export default MyPage;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

export const SubTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
`

export const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

export const RegisterButton = styled(Button)`
  && {
    width: 100%;
    height: 48px;
    text-align: left;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const BtnGroup = styled.div`
  margin: 20px 0;
  font-size: 14px;
  color: #606060;
`

export const StyledSpan = styled.span`
  && {
    margin: 0 5px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

export const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #BBCEDD;
  border-radius: 10px;
`

export const StyledResponsiveDiv = styled.div`
  display: none;
  @media (min-width: 991px) {
    display: block;
  }
`

export const StyledTabs = styled(Tabs)`
  && {
    font-weight: 600;
    @media (min-width: 991px) {
      display: none;
    }
}
`

const StyledMenuDiv = styled.div<{ $selectedkey: string, $menukey: string }>`
  && {
    border-radius: 10px;
    padding: 15px 10px;
    margin-bottom: 5px;
    font-weight: 500;
    ${props => (props.$selectedkey == props.$menukey) ? css`
      background: #E6E4F3;
      font-weight: 800;
      color: #47408F;
    ` : css`
      &:hover {
        background: #eee;
        cursor: pointer;
      }
    `}
  }
`
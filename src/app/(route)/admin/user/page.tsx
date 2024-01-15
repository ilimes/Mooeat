'use client'

import React, { useEffect, useState } from 'react';
import { Button, Table } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ColumnProps } from 'antd/es/table';
import moment from 'moment';
import 'moment/locale/ko';
import { UserInfoTypes } from '@/types/User/User.interface';
import { loadUserList } from '@/api/Api';

const User = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<UserInfoTypes[]>([]);
  
  const getUserList = async () => {
    // const result = await fetchUserList();
    const result = await loadUserList();
    setUserList(result?.list)
  }

  useEffect(() => {
    getUserList();
  }, [])

  const columns: ColumnProps<UserInfoTypes>[] = [
    {
      key: '0',
      dataIndex: 'user_seq',
      title: 'Seq.',
      align: 'center'
    },
    {
      key: '1',
      dataIndex: 'user_nm',
      title: '이름',
      align: 'center'
    },
    {
      key: '2',
      dataIndex: 'user_id',
      title: '아이디',
      align: 'center'
    },
    {
      key: '3',
      dataIndex: 'introduce',
      title: '자기소개',
      align: 'center',
      render: (text) => text ?? <span style={{ color: '#ababab' }}>없음</span>
    },
    {
      key: '4',
      dataIndex: 'point',
      title: '포인트',
      align: 'center'
    },
    {
      key: '5',
      dataIndex: 'type',
      title: '가입 수단',
      align: 'center',
      render: (text) => text ?? '일반' 
    },
    {
      key: '6',
      dataIndex: 'reg_dt',
      title: '가입일',
      align: 'center',
      render: (text) => text ? moment(text).format('L') : '-'
    },
    {
      key: '7',
      dataIndex: 'mod_dt',
      title: '수정일',
      align: 'center',
      render: (text) => text ? moment(text).format('L') : '-'
    },
  ]
  
  return (
    <div>
      <Title>
        회원 관리
        <span style={{ fontWeight: 400, fontSize: 13, color: 'grey' }}>{userList?.length}</span>
      </Title>
      <Explain>회원 관리 화면</Explain>
      <div style={{ overflow: 'auto' }}>
        <Table rowKey={(e) => e?.user_seq} dataSource={userList} columns={columns} />
      </div>
    </div>
  );
};

export default User;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

const fetchUserList = async (/* token: string | null */) => {
  const res = await fetch(`/api/userList`, {
    method: "POST",
    // body: JSON.stringify(token),
  });
  const result = await res.json();

  return result?.data;
};

'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ColumnProps } from 'antd/es/table';
import moment from 'moment';
import 'moment/locale/ko';
import { UserInfoTypes } from '@/types/User/User.interface';
import { loadUserList } from '@/api/Api';
import TopTitle from '@/components/SharedComponents/TopTitle';

const User = () => {
  const router = useRouter();
  const [userList, setUserList] = useState<UserInfoTypes[]>([]);

  const getUserList = async () => {
    const result = await loadUserList();
    setUserList(result?.list);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const columns: ColumnProps<UserInfoTypes>[] = [
    {
      key: '0',
      dataIndex: 'user_seq',
      title: 'Seq.',
      align: 'center',
    },
    {
      key: '1',
      dataIndex: 'user_nm',
      title: '이름',
      align: 'center',
    },
    {
      key: '2',
      dataIndex: 'user_id',
      title: '아이디',
      align: 'center',
    },
    {
      key: '3',
      dataIndex: 'introduce',
      title: '자기소개',
      align: 'center',
      render: (text) => text ?? <span style={{ color: '#ababab' }}>없음</span>,
    },
    {
      key: '4',
      dataIndex: 'point',
      title: '포인트',
      align: 'center',
    },
    {
      key: '5',
      dataIndex: 'type',
      title: '가입 수단',
      align: 'center',
      render: (text) => text ?? '일반',
    },
    {
      key: '6',
      dataIndex: 'reg_dt',
      title: '가입일',
      align: 'center',
      render: (text) => (text ? moment(text).format('L') : '-'),
    },
    {
      key: '7',
      dataIndex: 'mod_dt',
      title: '수정일',
      align: 'center',
      render: (text) => (text ? moment(text).format('L') : '-'),
    },
  ];

  return (
    <div>
      <TopTitle
        title={
          <>
            회원 관리{' '}
            <span style={{ fontWeight: 400, fontSize: 13, color: 'grey' }}>{userList?.length}</span>
          </>
        }
        explain="회원 관리 화면"
      />
      <div style={{ overflow: 'auto' }}>
        <Table rowKey={(e) => e?.user_seq} dataSource={userList} columns={columns} />
      </div>
    </div>
  );
};

export default User;

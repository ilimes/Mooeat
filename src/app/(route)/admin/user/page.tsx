'use client';

import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ColumnProps } from 'antd/es/table';
import moment from 'moment';
import 'moment/locale/ko';
import { UserInfoTypes } from '@/src/types/User/User.interface';
import { loadUserList } from '@/src/app/api/Api';
import TopTitle from '@/src/components/SharedComponents/TopTitle';

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
      width: 70,
    },
    {
      key: '1',
      dataIndex: 'user_nm',
      title: '이름',
      align: 'center',
      width: 200,
    },
    {
      key: '2',
      dataIndex: 'user_id',
      title: '아이디',
      align: 'center',
      width: 200,
    },
    {
      key: '3',
      dataIndex: 'introduce',
      title: '자기소개',
      align: 'center',
      render: (text) => text ?? <span style={{ color: '#ababab' }}>없음</span>,
      width: 500,
    },
    {
      key: '4',
      dataIndex: 'point',
      title: '포인트',
      align: 'center',
      width: 200,
    },
    {
      key: '5',
      dataIndex: 'type',
      title: '가입 수단',
      align: 'center',
      render: (text) => text ?? '일반',
      width: 100,
    },
    {
      key: '6',
      dataIndex: 'reg_dt',
      title: '가입일',
      align: 'center',
      render: (text) => (text ? moment(text).format('L') : '-'),
      width: 150,
    },
    {
      key: '7',
      dataIndex: 'mod_dt',
      title: '수정일',
      align: 'center',
      render: (text) => (text ? moment(text).format('L') : '-'),
      width: 150,
    },
  ];

  return (
    <div>
      <TopTitle title="회원 관리" number={userList?.length} explain="회원 관리 화면" />
      <div style={{ overflow: 'auto' }}>
        <Table
          rowKey={(e) => e?.user_seq}
          dataSource={userList}
          columns={columns}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}건`,
          }}
          bordered
          tableLayout="fixed"
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
};

export default User;

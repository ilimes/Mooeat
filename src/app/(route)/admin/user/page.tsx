'use client'

import React, { useEffect, useState } from 'react';
import { Button, Table } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ColumnProps } from 'antd/es/table';

interface IColumnsType {
  key: string;
  dataIndex: string;
  title: string;
  align: string;
}

const User = () => {
  const router = useRouter();
  const [userList, setUserList] = useState([]);
  
  const getUserList = async () => {
    const result = await fetchUserList();
    setUserList(result?.list)
  }

  useEffect(() => {
    getUserList();
  }, [])

  const columns: ColumnProps<IColumnsType>[] = [
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
      align: 'center'
    },
    {
      key: '4',
      dataIndex: 'point',
      title: '포인트',
      align: 'center'
    },
    {
      key: '5',
      dataIndex: 'reg_dt',
      title: '가입일',
      align: 'center'
    },
    {
      key: '6',
      dataIndex: 'mod_dt',
      title: '수정일',
      align: 'center'
    },
  ]
  
  return (
    <div>
      <Title>
        회원 관리
        <span style={{ fontWeight: 400, fontSize: 13, color: 'grey' }}>{userList?.length}</span>
      </Title>
      <Explain>회원 관리 화면</Explain>
      <Table dataSource={userList} columns={columns} />
    </div>
  );
};

export default User;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
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

export const fetchUserList = async (/* token: string | null */) => {
  const res = await fetch(`/api/userList`, {
    method: "POST",
    // body: JSON.stringify(token),
  });
  const result = await res.json();

  return result?.data;
};

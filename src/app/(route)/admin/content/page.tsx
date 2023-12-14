'use client'

import { Button, Table } from "antd";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { ColumnProps } from 'antd/es/table';
import { fetchBoardList } from '../../community/page';
import { useEffect, useState } from 'react';
import { IObjTypes } from '@/components/Community/PostCard';
import moment from 'moment';
import 'moment/locale/ko';

const Content = () => {
  const router = useRouter();
  const [boardList, setBoardList] = useState([]);

  const columns: ColumnProps<IObjTypes>[] = [
    {
      key: '0',
      dataIndex: 'board_seq',
      title: 'Seq.',
      align: 'center'
    },
    {
      key: '1',
      dataIndex: 'title',
      title: '제목',
      align: 'center'
    },
    {
      key: '2',
      dataIndex: 'reg_user_id',
      title: '등록한 아이디',
      align: 'center'
    },
    {
      key: '3',
      dataIndex: 'reg_user_nm',
      title: '등록한 이름',
      align: 'center'
    },
    {
      key: '4',
      dataIndex: 'like_cnt',
      title: '추천수',
      align: 'center'
    },
    {
      key: '5',
      dataIndex: 'reg_dt',
      title: '등록일',
      align: 'center',
      render: (text) => text ? moment(text).format('L') : '-'
    },
    {
      key: '6',
      dataIndex: 'mod_dt',
      title: '수정일',
      align: 'center',
      render: (text) => text ? moment(text).format('L') : '-'
    },
  ]

  const getBoardList = async () => {
    const result = await fetchBoardList();
    setBoardList(result?.list)
  }

  useEffect(() => {
    getBoardList();
  }, [])

  return (
    <div>
      <Title>
        글 관리
        <span style={{ fontWeight: 400, fontSize: 13, color: 'grey' }}>{boardList?.length}</span>
      </Title>
      <Explain>글 관리 화면</Explain>
      <Table rowKey={(e) => e?.board_seq} dataSource={boardList} columns={columns} />
    </div>
  );
};

export default Content;

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
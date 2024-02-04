'use client'

import { Button, Table } from "antd";
import styled from "styled-components";
import { ColumnProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { BoardTypes } from '@/types/Board/Board.interface';
import { loadBoardList } from '@/api/Api';

const Content = () => {
  const [boardList, setBoardList] = useState([]);

  const columns: ColumnProps<BoardTypes>[] = [
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
    // const result = await fetchBoardList();
    const result = await loadBoardList();
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
      <div style={{ overflow: 'auto' }}>
        <Table rowKey={(e) => e?.board_seq} dataSource={boardList} columns={columns} />
      </div>
    </div>
  );
};

export default Content;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

const fetchBoardList = async () => {
  const res = await fetch(`/api/board/list`, {
    method: 'POST',
  });
  const result = await res.json();

  return result?.data;
}
'use client';

import { Button, Table } from 'antd';
import styled from 'styled-components';
import { ColumnProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { BoardTypes } from '@/types/Board/Board.interface';
import { loadBoardList } from '@/api/Api';
import TopTitle from '@/components/SharedComponents/TopTitle';

const Content = () => {
  const [boardList, setBoardList] = useState([]);

  const columns: ColumnProps<BoardTypes>[] = [
    {
      key: '0',
      dataIndex: 'board_seq',
      title: 'Seq.',
      align: 'center',
    },
    {
      key: '1',
      dataIndex: 'title',
      title: '제목',
      align: 'center',
    },
    {
      key: '2',
      dataIndex: 'reg_user_id',
      title: '등록한 아이디',
      align: 'center',
    },
    {
      key: '3',
      dataIndex: 'reg_user_nm',
      title: '등록한 이름',
      align: 'center',
    },
    {
      key: '4',
      dataIndex: 'like_cnt',
      title: '추천수',
      align: 'center',
    },
    {
      key: '5',
      dataIndex: 'reg_dt',
      title: '등록일',
      align: 'center',
      render: (text) => (text ? moment(text).format('L') : '-'),
    },
    {
      key: '6',
      dataIndex: 'mod_dt',
      title: '수정일',
      align: 'center',
      render: (text) => (text ? moment(text).format('L') : '-'),
    },
  ];

  const getBoardList = async () => {
    const result = await loadBoardList();
    setBoardList(result?.list);
  };

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <div>
      <TopTitle
        title={
          <>
            글 관리{' '}
            <span style={{ fontWeight: 400, fontSize: 13, color: 'grey' }}>
              {boardList?.length}
            </span>
          </>
        }
        explain="글 관리 화면"
      />
      <div style={{ overflow: 'auto' }}>
        <Table
          rowKey={(e) => e?.board_seq}
          dataSource={boardList}
          columns={columns}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}건`,
          }}
        />
      </div>
    </div>
  );
};

export default Content;

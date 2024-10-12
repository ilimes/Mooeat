'use client';

import { Button, Table, Tag } from 'antd';
import styled from 'styled-components';
import { ColumnProps } from 'antd/es/table';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import { useRouter } from 'next/navigation';
import { BoardTypes } from '@/src/types/Board/Board.interface';
import { loadAllCommentList, loadBoardList } from '@/src/app/api/Api';
import TopTitle from '@/src/components/SharedComponents/TopTitle';

const Reply = () => {
  const router = useRouter();
  const [commentList, setCommentList] = useState([]);

  const columns: ColumnProps<any>[] = [
    {
      key: '0',
      dataIndex: 'comment_seq',
      title: 'Seq.',
      align: 'center',
    },
    {
      key: '1',
      dataIndex: 'comment_cd',
      title: '댓글 종류',
      align: 'center',
      render: (text) => (
        <Tag color="geekblue" style={{ marginRight: 0 }}>
          {text}
        </Tag>
      ),
    },
    {
      key: '2',
      dataIndex: 'content',
      title: '내용',
      align: 'center',
    },
    {
      key: '3',
      dataIndex: 'target_title',
      title: '게시글 제목',
      align: 'center',
      render: (text, record) => (
        <span
          role="link"
          tabIndex={0}
          onClick={() => router.push(`/articles/${record?.target_seq}`)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              router.push(`/articles/${record?.target_seq}`);
            }
          }}
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {text}
        </span>
      ),
    },
    {
      key: '4',
      dataIndex: 'reg_user_nm',
      title: '댓글 작성자',
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

  const getAllCommentList = async () => {
    const result = await loadAllCommentList();
    setCommentList(result?.list);
  };

  useEffect(() => {
    getAllCommentList();
  }, []);

  return (
    <div>
      <TopTitle
        title={
          <>
            댓글 관리{' '}
            <span style={{ fontWeight: 400, fontSize: 13, color: 'grey' }}>
              {commentList?.length}
            </span>
          </>
        }
        explain={
          <div>
            댓글 관리 페이지 입니다. 전체 댓글이 표시되며,
            <br />
            게시글 제목을 클릭하면 해당 댓글이 작성된 게시글로 이동됩니다.
          </div>
        }
      />
      <div style={{ overflow: 'auto' }}>
        <Table
          rowKey={(e) => e?.comment_seq}
          dataSource={commentList}
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

export default Reply;

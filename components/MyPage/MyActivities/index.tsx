import { loadMyBoardList, loadMyCommentList } from "@/api/Api";
import { Empty, Table, TableColumnsType } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from 'moment';
import { useRouter } from "next/navigation";

interface DataType1 {
  board_seq: number,
  title: string;
  reg_dt: string;
}

interface DataType2 {
  comment_seq: number,
  board_seq: number;
  board_title: string;
  content: string;
  reg_dt: string;
}

const columns1: TableColumnsType<DataType1> = [
  // {
  //   title: '글번호',
  //   dataIndex: 'board_seq',
  //   key: 'board_seq',
  //   width: 80,
  //   align: 'center',
  // },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center'
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text) => moment(text).format("YYYY-MM-DD")
  },
]

const columns2: TableColumnsType<DataType2> = [
  // {
  //   title: '댓글번호',
  //   dataIndex: 'comment_seq',
  //   key: 'comment_seq',
  //   width: 100,
  //   align: 'center',
  // },
  {
    title: '게시글 제목',
    dataIndex: 'board_title',
    key: 'board_title',
    align: 'center'
  },
  {
    title: '댓글 내용',
    dataIndex: 'content',
    key: 'content',
    align: 'center'
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text) => moment(text).format("YYYY-MM-DD")
  },
]

const MyActivities = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;
  const router = useRouter();

  const [myBoardList, setMyBoardList] = useState<DataType1[] | []>([]);
  const [myCommentList, setMyCommentList] = useState<DataType2[] | []>([]);

  const getMyBoardAndCommentList = async () => {
    const boardResult = await loadMyBoardList(token);
    const commentResult = await loadMyCommentList(token);

    if (boardResult?.success) {
      setMyBoardList(boardResult?.list);
    }

    if (commentResult?.success) {
      setMyCommentList(commentResult?.list);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getMyBoardAndCommentList();
    }
  }, [status]);

  return (
    <>
      <SubTitle>내가 쓴 글</SubTitle>
      <StyledBoxDiv>
        {myBoardList?.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
        )}
        {myBoardList?.length != 0 && <Table rowKey={(record) => record?.board_seq} columns={columns1} dataSource={myBoardList} pagination={{ pageSize: 5 }} onRow={(record, rowIndex) => ({onClick: () => { router.push(`/articles/${record?.board_seq}`) }})} />}
      </StyledBoxDiv>
      <SubTitle>내가 쓴 댓글</SubTitle>
      <StyledBoxDiv>
        {myCommentList?.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
        )}
        {myCommentList?.length != 0 && <Table rowKey={(record) => record?.comment_seq} columns={columns2} dataSource={myCommentList} />}
      </StyledBoxDiv>
    </>
  );
};

export default MyActivities;

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #bbcedd;
  border-radius: 10px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #5d559a;
`;
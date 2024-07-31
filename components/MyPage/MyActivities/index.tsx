import { Card, Col, Empty, Row, Table, TableColumnsType } from 'antd';
import { FileTextOutlined, CommentOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { ColumnsType, TableProps } from 'antd/es/table';
import SlotCounter from 'react-slot-counter';
import FlipNumbers from 'react-flip-numbers';
import { loadMyBoardList, loadMyCommentList } from '@/api/Api';
import { DataType1, DataType2 } from '@/types/Board/Board.interface';

const columns1: ColumnsType<DataType1> = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text) => moment(text).format('YYYY-MM-DD'),
  },
];

const columns2: ColumnsType<DataType2> = [
  {
    title: '게시글 제목',
    dataIndex: 'board_title',
    key: 'board_title',
    align: 'center',
  },
  {
    title: '댓글 내용',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
  },
  {
    title: '작성일',
    dataIndex: 'reg_dt',
    key: 'reg_dt',
    width: 140,
    align: 'center',
    render: (text: string) => moment(text).format('YYYY-MM-DD'),
  },
];

const MyActivities = () => {
  const { data: session, status } = useSession();
  const token = session?.user?.info?.data?.token;
  const router = useRouter();

  const [myBoardList, setMyBoardList] = useState<DataType1[] | []>([]);
  const [myCommentList, setMyCommentList] = useState<DataType2[] | []>([]);

  const myBoardNum = myBoardList?.length;
  const myCommentNum = myCommentList?.length;

  const getMyBoardAndCommentList = async () => {
    const boardResult = await loadMyBoardList();
    const commentResult = await loadMyCommentList();

    if (boardResult?.success) {
      setMyBoardList(boardResult?.list);
    }

    if (commentResult?.success) {
      setMyCommentList(commentResult?.list);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getMyBoardAndCommentList();
    }
  }, [status]);

  return (
    <>
      <StyledTopBoxDiv>
        <div className="top-box">
          <SubTitle>
            <div className="title">작성한 글 수</div>
          </SubTitle>
          <div className="box-div">
            <div className="number">
              <FileTextOutlined />
              <span style={{ display: 'flex', gap: 5 }}>
                <span>
                  {/* <SlotCounter value={myBoardNum ? myBoardNum?.toLocaleString() : 0} /> */}
                  <FlipNumbers
                    play
                    color="#000"
                    width={14}
                    height={22}
                    numbers={myBoardNum ? myBoardNum?.toLocaleString() : '0'}
                  />
                </span>
                개
              </span>
            </div>
          </div>
        </div>
        <div className="top-box">
          <SubTitle>
            <div className="title">작성한 댓글 수</div>
          </SubTitle>
          <div className="box-div">
            <div className="number">
              <CommentOutlined />
              <span style={{ display: 'flex', gap: 5 }}>
                <span>
                  {/* <SlotCounter value={myCommentNum ? myCommentNum?.toLocaleString() : 0} /> */}
                  <FlipNumbers
                    play
                    color="#000"
                    width={14}
                    height={22}
                    numbers={myCommentNum ? myCommentNum?.toLocaleString() : '0'}
                  />
                </span>
                개
              </span>
            </div>
          </div>
        </div>
      </StyledTopBoxDiv>
      <SubTitle>
        <div className="title link-title" id="작성한-글-목록">
          <a href="#작성한-글-목록">작성한 글 목록</a>
        </div>
        <div className="sub-title">
          내가 작성한 글 목록입니다. 클릭 시 해당 게시글로 이동합니다.
        </div>
      </SubTitle>
      <StyledBoxDiv>
        {myBoardList?.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
        )}
        {myBoardList?.length !== 0 && (
          <StyledTable
            rowKey={(record) => record?.board_seq}
            columns={columns1}
            dataSource={myBoardList}
            pagination={{
              pageSize: 5,
              showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}건`,
            }}
            onRow={(record, rowIndex) => ({
              onClick: () => {
                router.push(`/articles/${record?.board_seq}`);
              },
            })}
          />
        )}
      </StyledBoxDiv>
      <SubTitle>
        <div className="title link-title" id="작성한-댓글-목록">
          <a href="#작성한-댓글-목록">작성한 댓글 목록</a>
        </div>
      </SubTitle>
      <StyledBoxDiv>
        {myCommentList?.length === 0 && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
        )}
        {myCommentList?.length !== 0 && (
          <Table
            rowKey={(record) => record?.comment_seq}
            columns={columns2}
            dataSource={myCommentList}
            pagination={{
              pageSize: 5,
              showTotal: (total, range) => `${range[0]}-${range[1]} / 총 ${total}건`,
            }}
          />
        )}
      </StyledBoxDiv>
    </>
  );
};

export default MyActivities;

const StyledTopBoxDiv = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  @media screen and (max-width: 991px) {
    flex-direction: column;
  }

  .top-box {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .box-div {
    border: 1px solid #bbcedd;
    border-radius: 10px;
    padding: 20px;
  }

  .top-box-title {
    font-size: 18px;
    font-weight: 700;
    color: #5d559a;
  }

  .number {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
`;

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #bbcedd;
  border-radius: 10px;
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;

  .title {
    font-size: 20px;
    font-weight: 700;
    color: #5d559a;
  }

  .sub-title {
    font-size: 13px;
    font-weight: 400;
    color: #666666;
  }
`;

const StyledTable = styled(Table)<TableProps<DataType1>>`
  .ant-table-row: hover {
    cursor: pointer;
  }
`;

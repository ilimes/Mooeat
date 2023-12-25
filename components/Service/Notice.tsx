import React, { useState, useEffect } from 'react';
import { Empty, Spin } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import { BoardTypes } from '@/types/Board/Board.interface';

const Notice = () => {
    const [noticeList, setNoticeList] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<BoardTypes | null>(null);

    /**
     * 공지사항 리스트 불러오기
     */
    const getNoticeList = async () => {
        const result = await fetchNoticeList();
        const list = result?.list;
        setNoticeList(list);
    }

    /**
     * 공지사항 선택
     * @param board_seq 선택한 번호
     */
    const onClickNotice = (board_seq: number) => {
        if (selectedNotice === board_seq) {
            setSelectedNotice(undefined);
            setData(null);
        } else {
            setIsLoading(true);
            setSelectedNotice(board_seq);
            loadNoticeData(board_seq);
        }
    }

    const loadNoticeData = async (board_seq: number) => {
        const formData = {
            board_num: board_seq
        }
        const result = await fetchNoticeData(formData);
        if (result?.success) {
            setData(result?.data)
            setIsLoading(false)
        } else {
            alert(result?.err || '에러발생')
        }
    }


    useEffect(() => {
        getNoticeList();
    }, [])

    return (
        <StyledDiv>
            <TitleDiv>
                <div>제목</div>
                <div>날짜</div>
            </TitleDiv>
            {!noticeList?.length ? <EmptyComponent title={'공지사항이 없습니다.'} /> : ''}
            {
                noticeList?.length ?
                    noticeList?.map((obj: BoardTypes, i: number) => (
                        <WrapperDiv key={i}>
                            <ListItemDiv onClick={() => onClickNotice(obj?.board_seq)}>
                                <div style={{ fontWeight: selectedNotice === obj.board_seq ? 'bold' : 'normal' }}>{obj?.title}</div>
                                <div>
                                    {moment(obj?.reg_dt).isAfter(moment().subtract(1, 'd')) ? moment(obj?.reg_dt).fromNow() : moment(obj?.reg_dt).format('L')}
                                </div>
                            </ListItemDiv>
                            {
                                selectedNotice === obj.board_seq &&
                                <ListContentDiv>
                                    {isLoading && <Spin style={{ display: 'flex', justifyContent: 'flex-start' }} />}
                                    {!isLoading && <div>{data?.content}</div>}
                                </ListContentDiv>
                            }
                        </WrapperDiv>
                    ))
                    : ''
            }
        </StyledDiv>
    )
}

export default Notice;

const EmptyComponent = ({title} : {title: string}) => {
    return (
        <ContentDiv>
            <StyledEmpty image={Empty.PRESENTED_IMAGE_SIMPLE} description={title} />
        </ContentDiv>
    )
}

const ContentDiv = styled.div`
    padding: 20px 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    align-items: center;
    div:nth-child(1) {
        flex: 1;
    }
    div:nth-child(2) {
        width: 130px;
    }
    cursor: pointer;
    &:hover {
        color: black;
    }
`

const StyledEmpty = styled(Empty)`
  && {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    align-items: center;

    > .ant-empty-description {
      color: grey;
      font-size: 14px;
    }
  }
`

const StyledDiv = styled.div`
    margin-top: 20px;
    font-size: 14px;
    color: #666666;
    text-align: center;
    border-top: 1px solid #333333;
`

const TitleDiv = styled.div`
    padding: 20px 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    div:nth-child(1) {
        flex: 1;
    }
    div:nth-child(2) {
        width: 130px;
    }
`

const WrapperDiv = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    align-items: center;
`

const ListItemDiv = styled.div`
    display: flex;
    div:nth-child(1) {
        flex: 1;
        padding-left: 20px;
        text-align: left;
    }
    div:nth-child(2) {
        width: 130px;
    }
    cursor: pointer;
    &:hover {
        color: black;
    }
`

const ListContentDiv = styled.div`
    padding: 20px;
    margin-top: 15px;
    background: #F1F1F1;
    text-align: left;
    white-space: pre-line;
`

const fetchNoticeList = async () => {
    const res = await fetch(`/api/board/list`, {
        method: 'POST',
        body: JSON.stringify({ cate_seq: 4 })
    });
    const result = await res.json();

    return result?.data;
}

const fetchNoticeData = async (formData: { board_num: number }) => {
    const res = await fetch(`/api/board/view`, {
        method: 'POST',
        body: JSON.stringify(formData)
    });
    const result = await res.json();

    return result?.data;
}
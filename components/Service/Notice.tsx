import React from 'react';
import styled from 'styled-components';
import { EmptyComponent } from './Help';

const Notice = () => {
    return (
        <StyledDiv>
            <TitleDiv>
                <div>제목</div>
                <div>날짜</div>
            </TitleDiv>
            <EmptyComponent title={'공지사항이 없습니다.'} />
            {/* <ContentDiv>
                <div>공지사항입니다.</div>
                <div>2023-11-23</div>
            </ContentDiv> */}
        </StyledDiv>
    )
}

export default Notice;

const StyledDiv = styled.div`
    margin-top: 20px;
    font-size: 16px;
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
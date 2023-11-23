'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';

const Tabs = ({selectedKey, setSelectedKey} : {selectedKey: string, setSelectedKey: React.Dispatch<React.SetStateAction<string>>}) => {
    const router = useRouter();
    const onClick = (key: string) => {
        router.push(`/service?page=${key}`)
        setSelectedKey(key);
    }
    return (
        <>
            <StyledTabDiv>
                <StyledDiv $key={'qna'} $selectedkey={selectedKey} onClick={() => onClick('qna')} style={{ borderRight: '1px solid #eee' }}>
                    <span>자주 묻는 질문</span>
                </StyledDiv>
                <StyledDiv $key={'personal'} $selectedkey={selectedKey} onClick={() => onClick('personal')}>
                    <span>1:1 문의</span>
                </StyledDiv>
                <StyledDiv $key={'notice'} $selectedkey={selectedKey} onClick={() => onClick('notice')} style={{ borderLeft: '1px solid #eee' }}>
                    <span>공지사항</span>
                </StyledDiv>
            </StyledTabDiv>
        </>
    )
}

export default Tabs;

const StyledTabDiv = styled.div`
    display: flex;
    height: 60px;
    border: 1px solid #eee;
    text-align: center;
`

const StyledDiv = styled.div<{ $key: string, $selectedkey: string }>`
    flex: 1;
    font-size: 15px;
    font-weight: bold;
    ${props => (props.$key === props.$selectedkey) && css`
        background-color: #222222;
    `}
    & span {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        ${props => (props.$key === props.$selectedkey) && css`
            color: #fff;
        `}
    }
    cursor: pointer;
`
import React from 'react';
import styled, { css } from 'styled-components';

const Tabs = () => {
    return (
        <>
            <StyledTabDiv>
                <StyledDiv $key={1} style={{ borderRight: '1px solid #eee' }}>
                    <span>자주 묻는 질문</span>
                </StyledDiv>
                <StyledDiv $key={2}>
                    <span>1:1 문의</span>
                </StyledDiv>
                <StyledDiv $key={3} style={{ borderLeft: '1px solid #eee' }}>
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

const StyledDiv = styled.div<{ $key: number }>`
    flex: 1;
    font-size: 15px;
    font-weight: bold;
    ${props => (props.$key == 1) && css`
        background-color: #222222;
    `}
    & span {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        ${props => (props.$key == 1) && css`
            color: #fff;
        `}
    }
    cursor: pointer;
`
import React from 'react';
import styled from 'styled-components';

const Message = () => {
    return (
        <StyledDiv>
            <div><span style={{ color: '#4f4791', fontWeight: 700 }}>자주 묻는 질문과 답변</span>을 모아놓았습니다 :)</div>
            <div>원하는 질문이 없는 경우 1:1 문의를 이용해주세요.</div>
        </StyledDiv>
    )
}

export default Message;

const StyledDiv = styled.div`
    margin: 60px 0;
    font-size: 18px;
    color: #666666;
    text-align: center;
`
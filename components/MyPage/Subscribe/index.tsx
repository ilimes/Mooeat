import styled from "styled-components";

const Subscribe = () => {
  return (
    <>
      <SubTitle>구독 내역</SubTitle>
      <StyledBoxDiv>
        준비중 입니다.
      </StyledBoxDiv>
    </>
  )
}

export default Subscribe;

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #BBCEDD;
  border-radius: 10px;
`

const SubTitle = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 700;
  color: #5D559A;
`
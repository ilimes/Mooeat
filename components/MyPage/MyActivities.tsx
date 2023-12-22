import styled from "styled-components";

const MyActivities = () => {
  return (
    <>
      <SubTitle>내 활동</SubTitle>
      <StyledBoxDiv>
        d
      </StyledBoxDiv>
      <SubTitle>항목2 입니다.</SubTitle>
      <StyledBoxDiv>
        d
      </StyledBoxDiv>
    </>
  )
}

export default MyActivities;

const StyledBoxDiv = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #BBCEDD;
  border-radius: 10px;
`

const SubTitle = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
  color: #5D559A;
`
'use client'

import { Button, Tooltip, message } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Calendar from "@/components/Calendar";
import Image from "next/image";

const Attendance = () => {
  const router = useRouter();
  return (
    <div>
      <Title>출석체크</Title>
      <Explain>매일 출석체크 하고 포인트를 받아보세요 :)</Explain>
      <Tooltip title={"출석 완료 시 100포인트 지급"} placement="bottomLeft">
        <span style={{ color: '#6D6D6D', fontSize: 13.5 }}>
          <InfoCircleFilled /> 출석체크 안내
        </span>
      </Tooltip>
      <div style={{ textAlign: 'center' }}>
        <Image src={"/img/attendance/attendance.png"} alt='Attendance' width={328} height={279} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <StyledButton type="primary" onClick={() => message.info("준비중 입니다.")}>오늘 출석 하기</StyledButton>
      </div>
      <Calendar />
      <div style={{ margin: '10px 0', fontSize: 13.5, color: 'grey' }}>
        출석 완료 날짜는 점으로 표시됩니다.
      </div>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <a href="https://kr.freepik.com/free-photo/3d-illustration-of-calendar-with-checkmarks-pen_33309561.htm#query=%EB%8B%AC%EB%A0%A5%203d&position=28&from_view=keyword&track=ais&uuid=797e4121-2ab3-4646-ab1d-72a6e8376f7d">작가 upklyak</a> 출처 Freepik
      </div>
    </div>
  );
};

export default Attendance;

const Title = styled.div`
  font-size: 26px;
  font-weight: 600;
`

const Explain = styled.div`
  font-size: 14px;
  color: #606060;
  margin: 15px 0;
`

const StyledButton = styled(Button)`
  && {
    font-weight: 600;
    width: 100%;
    max-width: 400px;
    height: 50px;
    margin-bottom: 20px;
  }
`
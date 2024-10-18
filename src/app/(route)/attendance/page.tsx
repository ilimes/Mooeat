'use client';

import { Button, Spin, Tooltip, message } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';
import { AttendanceLogTypes } from '@/src/types/Attendance/Attendance.interface';
import Calendar from '@/src/components/Calendar';
import { loadAttendanceLogData, updateAttendanceData } from '@/src/app/api/Api';
import TopTitle from '@/src/components/SharedComponents/TopTitle';
import Freepik from '@/src/components/Freepik';

const freepikLink =
  'https://kr.freepik.com/free-photo/3d-illustration-of-calendar-with-checkmarks-pen_33309561.htm#query=%EB%8B%AC%EB%A0%A5%203d&position=28&from_view=keyword&track=ais&uuid=797e4121-2ab3-4646-ab1d-72a6e8376f7d';

const Attendance = () => {
  const { data: session, status } = useSession();
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLogTypes[]>([]);
  const [open, setOpen] = useState(false);
  const attendDay = attendanceLog?.map((e) => e?.reg_dt);
  const isTodayAttend = !!attendDay?.find((e) => e === moment(new Date()).format('YYYY-MM-DD'));
  const titleMessage = isTodayAttend
    ? '오늘 출석하셨네요! 내일도 화이팅 😊'
    : '버튼을 눌러서 출석체크 할 수 있습니다 :)';

  const userSeq = session?.user?.info?.userInfo?.user_seq;

  const getAttendanceLogData = async () => {
    const formData: any = { user_seq: userSeq };
    const result = await loadAttendanceLogData(formData);
    if (result?.success) {
      setAttendanceLog(result?.list);
    } else {
      setAttendanceLog([]);
    }
  };

  const onClickReg = async () => {
    const formData = { user_seq: userSeq };

    const result = await updateAttendanceData(formData);
    if (result?.success) {
      message.success('출석체크 되었습니다.');
      getAttendanceLogData();
    } else {
      message.warning(result?.message);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getAttendanceLogData();
    }
  }, [status]);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <TopTitle title="출석체크" explain="매일 출석체크 하고 포인트를 받아보세요 :)" />
      <Tooltip title="출석 완료 시 100포인트 지급" placement="bottomLeft">
        <span style={{ color: '#6D6D6D', fontSize: 13.5 }}>
          <InfoCircleFilled /> 출석체크 안내
        </span>
      </Tooltip>
      <div style={{ textAlign: 'center' }}>
        <Image src="/img/attendance/attendance.png" alt="Attendance" width={328} height={279} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip
          placement="topRight"
          title={titleMessage}
          open={open}
          zIndex={1}
          overlayStyle={{ fontWeight: 700, fontSize: 13 }}
        >
          <StyledButton
            type="primary"
            onClick={onClickReg}
            disabled={!!(status === 'loading' || isTodayAttend)}
          >
            {status === 'loading' && <Spin />}
            {status !== 'loading' && isTodayAttend && '오늘 출석 완료'}
            {status !== 'loading' && !isTodayAttend && '오늘 출석 하기'}
          </StyledButton>
        </Tooltip>
      </div>
      <Calendar attendDay={attendDay} />
      <div style={{ margin: '10px 0', fontSize: 13.5, color: 'grey' }}>
        출석 완료 날짜는 점으로 표시됩니다.
      </div>
      <Freepik link={freepikLink} name1="작가 upklyak" name2="출처 Freepik" />
    </div>
  );
};

export default Attendance;

const StyledButton = styled(Button)`
  && {
    font-weight: 700;
    width: 100%;
    max-width: 400px;
    height: 50px;
    margin-bottom: 20px;
  }
`;

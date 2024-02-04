import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

export const StyledCalendarWrapper = styled.div`
    && {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
        .react-calendar {
          width: 100%;
          border: none;
          border-radius: 0.8rem;
          box-shadow: -1px 3px 10px 3px rgba(0, 0, 0, 0.05);
          padding: 20px 15px;
          background-color: white;
        }
      
        /* 전체 폰트 컬러 */
        .react-calendar__month-view {
          abbr {
            color: #1F2A3D;
          }
        }
      
        /* 네비게이션 가운데 정렬 */
        .react-calendar__navigation {
          button {
            text-align: center;
          }
          justify-content: center;
        }
      
        /* 네비게이션 폰트 설정 */
        .react-calendar__navigation button {
          font-weight: 800;
          font-size: 1rem;
        }
      
        /* 네비게이션 버튼 컬러 */
        .react-calendar__navigation button:focus {
          background-color: white;
        }
      
        /* 네비게이션 비활성화 됐을때 스타일 */
        .react-calendar__navigation button:disabled {
          background-color: white;
          //   color: ${(props) => props.theme.darkBlack};
        }
      
        /* 년/월 상단 네비게이션 칸 크기 줄이기 */
        .react-calendar__navigation__label {
          flex-grow: 0 !important;
        }
      
        /* 요일 밑줄 제거 */
        .react-calendar__month-view__weekdays abbr {
          text-decoration: none;
          font-weight: 800;
        }
      
        /* 일요일에만 빨간 폰트 */
        .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
          color: red;
        }
      
        /* 오늘 날짜 폰트 컬러 */
        .react-calendar__tile--now {
          background: none;
          abbr {
            color: #756CBD;
            font-weight: 800;
          }
        }
      
        /* 네비게이션 월 스타일 적용 */
        .react-calendar__year-view__months__month {
          border-radius: 0.3rem;
          //   background-color: ${(props) => props.theme.gray_5};
          padding: 0;
        }
      
        /* 네비게이션 현재 월 스타일 적용 */
        .react-calendar__tile--hasActive {
          background-color: #47408F;
          abbr {
            color: white;
          }
        }
      
        /* 일 날짜 간격 */
        .react-calendar__tile {
          padding: 5px 0px 18px;
          position: relative;
        }
      
        /* 네비게이션 월 스타일 적용 */
        .react-calendar__year-view__months__month {
          flex: 0 0 calc(33.3333% - 10px) !important;
          margin-inline-start: 5px !important;
          margin-inline-end: 5px !important;
          margin-block-end: 10px;
          padding: 20px 6.6667px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1F2A3D;
        }
      
        /* 선택한 날짜 스타일 적용 */
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus,
        .react-calendar__tile--active {
          background-color: #756CBD;
          border-radius: 0.3rem;
          abbr, div {
            color: white;
          }
          .dot {
            background-color: white;
          }
        }
    }
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.div`
    && {
        position: absolute;
        right: 15px;
        top: 30.5px;
        background-color: #47408F;
        color: white;
        width: 65px;
        min-width: fit-content;
        height: 1.5rem;
        text-align: center;
        margin: 0 auto;
        line-height: 1.6rem;
        border-radius: 15px;
        font-size: 0.70rem;
        font-weight: 800;
        cursor: pointer;
    }
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
    && {
        font-size: x-small;
        color: #47408F;
        font-weight: 700;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
    }
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
    && {
        background-color: #47408F;
        border-radius: 50%;
        width: 0.45rem;
        height: 0.45rem;
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
    }
`;
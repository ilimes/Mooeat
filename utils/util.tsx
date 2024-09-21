import { getToken, getMessaging } from 'firebase/messaging';

export const getDayKorean = (value: number) => {
  switch (value) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      break;
  }
};

export const getTagColor = (value: string) => {
  switch (value) {
    case '아침':
      return 'gold';
    case '점심':
      return 'blue';
    case '저녁':
      return 'purple';
    default:
      break;
  }
};

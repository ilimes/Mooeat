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

export function extHexToRGB(hex: string, alpha?: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

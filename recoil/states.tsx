
import { atom } from 'recoil';

/**
 * 메뉴
 */
export const menuState = atom({
  key: 'menu',
  default: [],
});

/**
 * 모바일 여부
 */
export const isMobileState = atom({
  key: 'isMobile',
  default: false,
});

/**
 * Nav 접힘 여부
 */
export const collapseState = atom({
  key: 'isCollapsed',
  default: false,
});

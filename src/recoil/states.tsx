import { atom } from 'recoil';
import { UserInfoTypes } from '@/src/types/User/User.interface';

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

/**
 * PC 화면에서 Notification Popover 열림 여부
 */
export const notiPopoverState = atom({
  key: 'isNotiPopoverOpen',
  default: false,
});

/**
 * Mobile 화면에서 Notification 접힘 여부
 */
export const notiCollapseState = atom({
  key: 'isNotiCollapsed',
  default: false,
});

/**
 * 로그인한 유저 정보
 */
export const userInfoState = atom<UserInfoTypes | null>({
  key: 'userInfo',
  default: null,
});

/**
 * 유저 정보 로딩 여부
 */
export const userInfoLoadingState = atom({
  key: 'userInfoLoading',
  default: false,
});

/**
 * 관리자 페이지 접기 여부
 */
export const adminCollapsedState = atom({
  key: 'collapsed',
  default: false,
});

/**
 * clients userSeq State
 */
export const clientsState = atom({
  key: 'clients',
  default: [],
});

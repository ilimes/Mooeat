
import { atom } from 'recoil';

export interface IUserInfoTypes {
  user_seq: number;
  user_nm: string;
  user_id: string;
  use_yn: string;
  role_rank: number;
  reg_dt: string;
  point: number;
  mod_dt: string | null;
}

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
 * Mobile 화면에서 Notification 접힘 여부
 */
export const notiCollapseState = atom({
  key: 'isNotiCollapsed',
  default: false,
});

/**
 * 로그인한 유저 정보
 */
export const userInfoState = atom<IUserInfoTypes | null>({
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
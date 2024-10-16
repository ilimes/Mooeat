import { ModalProps } from 'antd';

declare global {
  interface Window {
    Kakao: any;
  }
}

export interface MenuListTypes {
  menu_cd: string;
  menu_category: string;
  menu_path: string;
  menu_nm: string;
  menu_level: number;
  parent_menu_cd: string | null;
  menu_order: string | null;
  role_rank: number;
  breadcrumb: string;
  auth_yn: string;
  use_yn: string;
}

export interface UploadInfoTypes {
  name: string | null;
  size: string | null;
  type: string | null;
}

export interface ModalPropsTypes extends ModalProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  closeModal: () => void;
}

export interface InfoTypes {
  key: string;
  label: string;
}

export interface FileTypes {
  file?: FileList;
  url: string | null;
}

export interface UserInfoTypes {
  user_seq: number;
  user_id: string;
  user_nm: string;
  introduce?: string;
  point?: number;
  file_path?: string;
  use_yn?: boolean;
  role_rank: number;
  type: string;
  reg_id: string;
  mod_id: string;
  reg_dt: string;
  mod_dt: string;
  pw_mod_dt: string;
  user_set: {
    app_push_yn: string;
    file_cd: string;
    file_path: string | null;
    file_path_thumb: string | null;
    kko_push_yn: string;
    sms_push_yn: string;
  };
}

export interface ValuesTypes {
  user_id: string;
  password: string;
}

export interface ChangeDataTypes {
  user_nm?: string;
  introduce?: string;
  del_file_yn?: string;
  file_cd?: string;
}

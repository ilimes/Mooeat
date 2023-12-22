export interface UserInfoTypes {
    user_seq: number;
    user_id: string;
    user_nm: string;
    introduce?: string;
    point?: number;
    use_yn?: boolean;
    role_rank?: number;
    type: string;
    reg_id: string;
    mod_id: string;
    reg_dt: string;
    mod_dt: string;
  }

export interface ValuesTypes {
    user_id: string;
    password: string;
}
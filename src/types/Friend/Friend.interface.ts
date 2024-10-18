export interface FriendTypes {
  receivedList?: Friend[];
  sentList?: Friend[];
  pureList?: Friend[];
}

export interface Friend {
  seq: number;
  from_user_seq: number;
  to_user_seq: number;
  to_user_id: string;
  to_user_nm: string;
  from_user_id: string;
  from_user_nm: string;
  profile_path: string;
  agree: string;
  other_agree: string;
  reg_dt: string;
  mod_dt: string;
}

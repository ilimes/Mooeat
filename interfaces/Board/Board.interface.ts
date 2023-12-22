//IObjTypes
export interface BoardTypes {
    board_seq: number;
    bg_color: string | undefined;
    cate_color: string | undefined;
    cate_nm: string;
    cate_seq: number;
    comment_cnt: number;
    content: string;
    like_cnt: number;
    mod_dt: string;
    reg_dt: string;
    parent_seq: number | null;
    reg_user_id: string;
    reg_user_nm: string;
    reg_user_seq: number;
    secret_yn: string;
    tag_names: string;
    title: string;
    use_yn: string;
    view_cnt: number;
}

export interface CommentTypes {
    comment_seq: number;
    comment_cd: string;
    target_seq: number;
    parents_cd: number;
    content: string;
    comment_level: number;
    comment_order: number;
    reg_user_seq: number;
    reg_user_nm: string;
    reg_dt: string;
    mod_user_seq: number;
    mod_dt: string;
    use_yn: string;
  }
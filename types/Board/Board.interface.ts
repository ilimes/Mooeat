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
    profile_path?: string;
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

export interface RegUserInfoTypes {
    user_info: {
        user_seq: number,
        user_id: string,
        user_nm: string,
        introduce?: string | null,
        reg_board_total_count: number,
    },
    recent_board_list: [
        {
            board_seq: number,
            title: string,
            reg_dt: string
        }
    ]
}

export interface DataType1 {
    board_seq: number,
    title: string;
    reg_dt: string;
}

export interface DataType2 {
    comment_seq: number,
    board_seq: number;
    board_title: string;
    content: string;
    reg_dt: string;
}
import axiosInstance from '@/utils/axiosInstance';
import axios from 'axios';

const defaultHeader = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
    }
}

const uploadConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: '',
    },
};

/**
 * 메뉴 목록 가져오기
 * @returns data
 */
export const loadMenuList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/menu/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * API Data 가져오기
 * @param formData 
 * @returns data
 */
export const loadApiData = async (formData: { type: string, group?: boolean, year: number }) => {
    return await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/statistics`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * IP Data 가져오기
 * @returns data
 */
export const loadIpData = async () => {
    return await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/ip/statistics`, {})
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 댓글 목록 가져오기
 * @param formData 
 * @returns data
 */
export const loadCommentList = async (formData: { board_num: string | string[] }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/comment/list`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 게시글 가져오기
 * @param formData 
 * @returns data
 */
export const loadArticleData = async (formData: { board_num: number | string | string[] }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/view`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 게시글 작성자 정보 가져오기
 * @param formData 
 * @returns data
 */
export const loadRegUserInfo = async (formData: { user_seq: number }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/user/info`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 게시글 정보 목록 가져오기
 * @returns data
 */
export const loadInfoList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/info/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 게시글 목록 가져오기
 * @param formData 
 * @returns data
 */
export const loadBoardList = async (formData?: { cate_seq?: number, cate_seq_to_exclude?: number[], pading_yn?: string }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/list`, formData || {})
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 내가 쓴 글 목록 가져오기
 * @returns data
 */
export const loadMyBoardList = async () => {
    return await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/my/list`, {})
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 내가 쓴 댓글 목록 가져오기
 * @returns data
 */
export const loadMyCommentList = async () => {
    return await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/my/comment/list`, {})
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 유저 정보 가져오기
 * @param formData 
 * @returns data
 */
export const loadUserInfoData = async (formData?: object) => {
    return await axiosInstance.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/info`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 유저 목록 가져오기
 * @returns data
 */
export const loadUserList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 회원 등록
 * @param formData 
 * @returns data
 */
export const putJoinData = async (formData: object) => {
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/put`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 포인트 로그 가져오기
 * @param formData 
 * @returns data
 */
export const loadPointLogData = async (formData: { user_seq: number } ) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/point/log`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 출석 로그 가져오기
 * @param formData 
 * @returns data
 */
export const loadAttendanceLogData = async (formData: { user_seq: number } ) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/attendance/log`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 출석 체크
 * @param formData 
 * @returns data
 */
export const updateAttendanceData = async (formData: object) => {
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/attendance/update`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 비밀번호 재설정 이메일 전송
 * @param formData 
 * @returns data
 */
export const postTempPw = async (formData: { email: string | null }) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.PNfKo6O33BzNllo7lUaKTz2sgm8GOpcuKxcZddllbDg";
    let header = {...defaultHeader};
    header.headers.token = token;

    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/reset/email`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 비밀번호 변경
 * @param formData 
 * @param token 
 * @returns data
 */
export const changePw = async (formData?: object, token?: string) => {
    let header = {...defaultHeader};
    if (typeof token === 'string') {
        header.headers.token = token;
    }

    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/change/pw`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 친구 등록
 * @param formData 
 * @returns data
 */
export const putFriendData = async (formData: object) => {
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/add`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 친구 목록 가져오기
 * @param formData 
 * @returns data
 */
export const loadFriendList = async (formData: { user_seq: number }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/list`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 친구 정보 업데이트
 * @param formData 
 * @returns data
 */
export const updateFriendData = async (formData: object) => {
    return await axios.patch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/updateFriend`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 친구 삭제
 * @param formData 
 * @returns data
 */
export const deleteFriendData = async (formData: object) => {
    return await axios.delete(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/deleteFriend`, { data: formData })
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 서버에 이미지 저장
 * @param {File} files 이미지 등록에 필요한 해당 File 형식 data
 */
export const uploadFile = async (files: File, token: string) => {
    let header = {...uploadConfig};
    header.headers.token = token;

    const formData = new FormData();
    formData.append('file', files);
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/file/put`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 유저 정보 업데이트
 * @param formData 
 * @param token 
 * @returns data
 */
export const updateUser = async (formData: object, token: string) => {
    let header = {...defaultHeader};
    header.headers.token = token;

    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/update`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 태그 Top5 가져오기
 * @returns data
 */
export const loadTagsTop5 = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/tags/top5`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 게시글 등록
 * @param formData 
 * @param token 
 * @returns data
 */
export const writeBoard = async (formData?: object, token?: string) => {
    let header = {...defaultHeader};
    if (typeof token === 'string') {
        header.headers.token = token;
    }

    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/write`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * 댓글 등록
 * @param formData 
 * @returns data
 */
export const writeComment = async (formData?: object) => {
    return await axiosInstance.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/comment/write`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}
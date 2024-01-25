import axios from 'axios';

const uploadConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: '',
    },
};

const defaultHeader = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: '',
    }
}

export const loadMenuList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/menu/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadApiData = async (formData: { type: string, group?: boolean, year: number }, token: string) => {
    let header = {...defaultHeader};
    header.headers.token = token;

    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/statistics`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadIpData = async (token: string) => {
    let header = {...defaultHeader};
    header.headers.token = token;
    
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/ip/statistics`, {}, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadCommentList = async (formData: { board_num: string | string[] }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/comment/list`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadArticleData = async (formData: { board_num: number | string | string[] }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/view`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadRegUserInfo = async (formData: { user_seq: number }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/user/info`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadInfoList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/info/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadBoardList = async (formData?: { cate_seq: number }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/list`, formData || {})
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadMyBoardList = async (token: string) => {
    let header = {...defaultHeader};
    header.headers.token = token;

    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/my/list`, {}, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadMyCommentList = async (token: string) => {
    let header = {...defaultHeader};
    header.headers.token = token;

    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/my/comment/list`, {}, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}


export const loadUserInfoData = async (formData?: object, token?: string) => {
    const header = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token
        },
    }
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/info`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadUserList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const putJoinData = async (formData: object) => {
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/put`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadPointLogData = async (formData: { user_seq: number } ) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/point/log`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadAttendanceLogData = async (formData: { user_seq: number } ) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/attendance/log`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const updateAttendanceData = async (formData: object) => {
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/attendance/update`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const postTempPw = async (formData: { email: string | null }) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.PNfKo6O33BzNllo7lUaKTz2sgm8GOpcuKxcZddllbDg";
    let header = {...defaultHeader};
    header.headers.token = token;

    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/reset/email`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const changePw = async (formData?: object, token?: string) => {
    let header = {...defaultHeader};
    if (typeof token === 'string') {
        header.headers.token = token;
    }

    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/change/pw`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const putFriendData = async (formData: object) => {
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/add`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadFriendList = async (formData: { user_seq: number }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/list`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const updateFriendData = async (formData: object) => {
    return await axios.patch(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/updateFriend`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const deleteFriendData = async (formData: object) => {
    return await axios.delete(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/friend/deleteFriend`, { data: formData })
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

/**
 * @description 서버에 이미지를 저장하는 함수
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

export const updateUser = async (formData: object, token: string) => {
    let header = {...defaultHeader};
    header.headers.token = token;

    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/update`, formData, header)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadTagsTop5 = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/tags/top5`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}
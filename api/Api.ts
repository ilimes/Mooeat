import axios from 'axios';

export const loadMenuList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/menu/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadApiData = async (formData: { type: string, group?: boolean, year: number }, token: string) => {
    const header = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token
        },
    }
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/statistics`, formData, header)
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

export const loadUserInfoData = async (formData?: object, token?: string ) => {
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
    const header = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token
        },
    }
    return await axios.put(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/user/reset/email`, formData, header)
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
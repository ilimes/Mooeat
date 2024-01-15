import axios from 'axios';

export const loadMenuList = async () => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/menu/list`)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadApiData = async (formData: { type: string, year: number }, token: string) => {
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

export const loadArticleData = async (formData: { board_num: string | string[] }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/view`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}

export const loadRegUserInfo = async (formData: { user_seq: number }) => {
    return await axios.post(`http://${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/board/user/info`, formData)
                      .then(res => res?.data)
                      .catch(err => console.error(err));
}
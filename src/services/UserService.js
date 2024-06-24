import axios from '../services/customizeAxios'
const fetchAllUser = (page) => {
    return axios.get(`get-users/?page=${page}&limit=${30}`)
}

const postCreateUser = (email, password) => {
    return axios.post(`create-user/`, { email, password })
}

export { fetchAllUser, postCreateUser }
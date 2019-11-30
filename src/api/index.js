import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const insertUser = payload => api.post(`/crud`, payload)
export const getAllUsers = () => api.get(`/crud`)
export const updateUserById = (id, payload) => api.put(`/crud/${id}`, payload)
export const deleteUserById = id => api.delete(`/crud/${id}`)
export const getUserById = id => api.get(`/crud/${id}`)

const apis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default apis;
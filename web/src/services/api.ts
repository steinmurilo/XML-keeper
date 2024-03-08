import axios, { AxiosInstance } from 'axios'

const baseURL = 'http://localhost:8080/api';

const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})

export default api;
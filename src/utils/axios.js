import axios from 'axios';

export default function () {

    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    return { axiosInstance };
}
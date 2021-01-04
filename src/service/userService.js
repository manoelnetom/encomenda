import axiosService from '../utils/axios';
import { useState } from 'react';

export default function () {
  const { axiosInstance } = axiosService();
  const [stateTokenUser, setStateTokenUser] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  const handleMessageAlertUser = () => {
    setStateTokenUser(false);
    localStorage.removeItem('token');
    window.location = '/login';
  }

  const error =(err)=>{
    if(err.response.status === 401 || err.response.status === 403){
      setStateTokenUser(true);
    }
  }

  async function getUsersByUsernameNameScope(data) {
    const response = await axiosInstance.post(`/users/search`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  async function updateUser(data, username) {
    const response = await axiosInstance.put(`/users/${username}`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  async function getAllUsers(data) {
    const response = await axiosInstance.post(`/users/search-all`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  async function getUsers() {
    const response = await axiosInstance.get(`/users`).catch((err) => {
      error(err);
    });
    return response;
  }

  async function getSettings(){
    const response = await axiosInstance.get(`/user/settings`).catch((err)=>{
      error(err);
    })
    return response;
  }

  async function updateSetting(setting_key, setting_value){
    const response = await axiosInstance.put(`/user/settings/${setting_key}=${setting_value}`).catch((err)=>{
      error(err);
    })
    return response;
  }

  return {
    stateTokenUser,
    handleMessageAlertUser,
    getUsersByUsernameNameScope,
    updateUser,
    getAllUsers,
    getUsers,
    getSettings,
    updateSetting
  };
}

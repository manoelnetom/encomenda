import axiosService from '../utils/axios';
import { useState } from 'react';

export default function () {
  const { axiosInstance } = axiosService();
  const [stateTokenNotice, setStateTokenNotice] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  const handleMessageAlert = () => {
    setStateTokenNotice(false);
    localStorage.removeItem('token');
    window.location = '/login';
  }

  const error =(err)=>{
    if(err.response.status === 401 || err.response.status === 403){
      setStateTokenNotice(true);
    }
  }

  async function createNotice(data) {
    const noticeData = {
      worked: false,
      data: {},
    };
    await axiosInstance
      .post("/news", data)
      .then((response) => {
        if (response) {
          noticeData.worked = true;
          noticeData.data = response.data;
        }
      })
      .catch((err) => {
        console.log(err);
        noticeData.worked = false;
        noticeData.data = {};
        error(err);
      });

    return noticeData;
  }

  async function searchNotice(data) {
    const searchData = {
      worked: false,
      data: null,
    };

    await axiosInstance
      .post("/public/news/search", data)
      .then((response) => {
        if (response) {
          if (response.data.length !== 0) {
            searchData.worked = true;
            searchData.data = response;
          } else {
            searchData.worked = false;
            searchData.data = [];
          }
        }
      })
      .catch((err) => {
        console.log(err);

        searchData.worked = false;
        error(err);
      });

    return searchData;
  }

  async function getNotice(id) {
    const data = {
      worked: false,
      notice: {},
    };

    await axiosInstance
      .get(`/public/news/${id}`)
      .then((response) => {
        if (response) {
          data.worked = true;
          data.notice = response.data;
        }
      })
      .catch((err) => {
        console.log(err);
        data.worked = false;
        data.notice = {};
        error(err);
      });

    return data;
  }

  async function updateNotice(id, data) {
    let worked = false;

    await axiosInstance
      .put(`/news/${id}`, data)
      .then((response) => {
        if (response) worked = true;
      })
      .catch((err) => {
        console.log(err);
        worked = false;
        error(err);
      });

    return worked;
  }

  async function deleteNotice(id) {
    let worked = false;

    await axiosInstance
      .delete(`/news/${id}`)
      .then((response) => {
        if (response) worked = true;
      })
      .catch((err) => {
        console.log(err);
        worked = false;
        error(err);
      });

    return worked;
  }

  return {
    stateTokenNotice,
    handleMessageAlert,
    createNotice,
    searchNotice,
    getNotice,
    updateNotice,
    deleteNotice,
  };

}



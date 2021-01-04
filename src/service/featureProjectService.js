import axiosService from '../utils/axios';
import { useState } from 'react';

export default function () {
  const { axiosInstance } = axiosService();
  const [stateTokenProject, setStateTokenProject] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  const handleMessageAlert = () => {
    setStateTokenProject(false);
    localStorage.removeItem('token');
    window.location = '/login';
  }

  const error =(err)=>{
    if(err.response.status === 401 || err.response.status === 403){
      setStateTokenProject(true);
    }
  }

  async function createFeatureProject(data) {
    const projectData = {
      worked: false,
      data: {},
    };
    await axiosInstance
      .post("/featuredProjects", data)
      .then((response) => {
        if (response) {
          projectData.worked = true;
          projectData.data = response.data;
        }
      })
      .catch((err) => {
        console.log(err);
        projectData.worked = false;
        projectData.data = {};
        error(err);
      });
  
    return projectData;
  }
  
  async function searchFeatureProjects(data) {
    const searchData = {
      worked: false,
      data: null,
    };
  
    await axiosInstance
      .post("/public/featuredProjects/search", data)
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
  
  async function updateProject(id, data) {
    let worked = false;
  
    await axiosInstance
      .put(`/featuredProjects/${id}`, data)
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
  
  async function deleteProject(id) {
    let worked = false;
  
    await axiosInstance
      .delete(`/featuredProjects/${id}`)
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
  
  async function getProject(id) {
    const data = {
      worked: false,
      project: {},
    };
  
    await axiosInstance
      .get(`/public/featuredProjects/${id}`)
      .then((response) => {
        if (response) {
          data.worked = true;
          data.project = response.data;
        }
      })
      .catch((err) => {
        console.log(err);
        data.worked = false;
        data.project = {};
        error(err);
      });
  
    return data;
  }
  
  return {
    stateTokenProject,
    handleMessageAlert,
    createFeatureProject,
    searchFeatureProjects,
    updateProject,
    deleteProject,
    getProject,
  };
}



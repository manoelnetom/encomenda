import axiosService from '../utils/axios';
import { useState } from 'react';

export default function () {
  const { axiosInstance } = axiosService();
  const [stateTokenDemmand, setStateTokenDemmand] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  const handleMessageAlert = () => {
    setStateTokenDemmand(false);
    localStorage.removeItem('token');
    window.location = '/login';
  }

  const error = (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      setStateTokenDemmand(true);
    }
  }

  //faz get de todas as demandas
  async function getAllDemands(data) {
    const response = await axiosInstance.post('/demands/new_search', data).catch((err) => {
      error(err);
    });
    return response;
  }

  // retorna a demanda pelo id
  async function getDemandById(demandId) {
    const response = await axiosInstance.get(`/demands/${demandId}`).catch((err) => {
      error(err);
    });
    return response;
  }

  // cria uma demanda
  async function createDemand(data) {
    // faz requisição
    const response = await axiosInstance.post(`/demands`, data).catch((err) => {
      error(err);
    })
    return response;
  }

  //atualiza demanda
  async function updateDemmand(id, data) {
    const response = await axiosInstance.put(`/demands/${id}`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  //dar like na demanda
  async function likeDemand(idDemand) {
    const response = await axiosInstance.put(`/demands/${idDemand}/like`).catch((err) => {
      error(err);
    });
    return response;
  }

  // faz comentário na demanda
  async function commentDemand(demandId, data) {
    const response = await axiosInstance.post(`/demands/${demandId}/comments`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  // dar like no comentário da demanda
  async function likeCommentDemand(commentId) {
    const response = await axiosInstance.put(`/comments/${commentId}/like`).catch((err) => {
      error(err);
    });
    return response;
  }

  // Deletar demanda de acordo com o ID
  async function deleteDemand(id) {
    const response = await axiosInstance.delete(`/demands/${id}`).catch((err) => {
      error(err);
    });
    return response;
  }

  async function submitDemand(id) {
    const response = await axiosInstance.put(`/demands/${id}/submit`).catch((err) => {
      error(err);
    });
    return response;
  }

  async function unsubmitDemand(id) {
    const response = await axiosInstance.put(`/demands/${id}/unsubmit`).catch((err) => {
      error(err);
    });
    return response;
  }

  async function cancelDemand(id, data) {
    const response = await axiosInstance.put(`/demands/${id}/cancel `, data).catch((err) => {
      error(err);
    });
    return response;
  }

  async function finishDemand(id, proposalId) {
    const response = await axiosInstance.put(`/demands/${id}/select/${proposalId}`).catch((err) => {
      error(err);
    });
    return response;
  }

  async function releaseDemand(id, data) {
    const response = await axiosInstance.put(`/demands/${id}/release`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  //retorna o pdf da demanda
  async function getFilePdf(demand_id) {
    const response = await axiosInstance.get(`/demands/${demand_id}/attachment`).catch((err) => {
      error(err);
    })
    return response;
  }


  return {
    stateTokenDemmand,
    handleMessageAlert,
    getAllDemands,
    getDemandById,
    createDemand,
    updateDemmand,
    likeDemand,
    commentDemand,
    likeCommentDemand,
    deleteDemand,
    submitDemand,
    unsubmitDemand,
    cancelDemand,
    finishDemand,
    releaseDemand,
    getFilePdf
  }
}

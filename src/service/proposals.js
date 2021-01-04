import axiosService from '../utils/axios';
import { useState } from 'react';

export default function () {
  const { axiosInstance } = axiosService();
  const [stateToken, setStateToken] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  const handleMessageAlert = () => {
    setStateToken(false);
    localStorage.removeItem('token');
    window.location = '/login';
  }

  const error =(err)=>{
    if(err.response.status === 401 || err.response.status === 403){
      setStateToken(true);
    }
  }

  // Função para pegar os dados de uma proposta por id
  async function getProposalById(id) {
    const response = await axiosInstance.get(`/demands/proposals/${id}`).catch((err) => {
      error(err);
    });
    return response;
  }

  // Função para criar proposta de solução recebendo o id da demanda e o conteudo da proposta
  async function createProposal(demandId, data) {
    const response = await axiosInstance.post(`/demands/${demandId}/proposals`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  async function updateProposal(proposalId, data) {
    const response = await axiosInstance.put(`/demands/proposals/${proposalId}`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  async function deleteProposal(proposalId) {
    const response = await axiosInstance.delete(`/demands/proposals/${proposalId}`).catch((err) => {
      error(err);
    });
    return response;
  }

  //like na proposta
  async function likeProposal(proposalId) {
    const response = await axiosInstance.put(`/demands/proposals/${proposalId}/like`).catch((err) => {
      error(err);
    });
    return response;
  }

  //faz comentário na proposta
  async function commentProposal(proposalId, data) {
    const response = await axiosInstance.post(`/demands/proposals/${proposalId}/comments`, data).catch((err) => {
      error(err);
    });
    return response;
  }

  //dar like no comentário da proposta
  async function likeCommentProposal(commentId) {
    const response = await axiosInstance.put(`/comments/${commentId}/like`).catch((err) => {
      error(err);
    });
    return response;
  }

  return {
    stateToken,
    handleMessageAlert,
    getProposalById,
    createProposal,
    updateProposal,
    deleteProposal,
    likeProposal,
    commentProposal,
    likeCommentProposal
  };

}

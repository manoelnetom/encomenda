import { useState } from "react";
import axiosService from "../utils/axios";

export default function () {
  const { axiosInstance } = axiosService();
  const [stateTokenNotice, setStateTokenNotice] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;

  const handleMessageAlert = () => {
    setStateTokenNotice(false);
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const error = (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      setStateTokenNotice(true);
    }
  };

  async function getReports(data) {
    const reportData = {
      worked: false,
      data: {},
    };
    await axiosInstance
      .post("/reports/demands", data)
      .then((response) => {
        if (response) {
          reportData.worked = true;
          reportData.data = response.data;
        }
      })
      .catch((err) => {
        console.log(err);
        reportData.worked = false;
        reportData.data = {};
        error(err);
      });

    return reportData;
  }

  async function getReportsUsers(data) {
    const reportData = {
      worked: false,
      data: {},
    };
    await axiosInstance
      .post("/reports/users ", data)
      .then((response) => {
        if (response) {
          reportData.worked = true;
          reportData.data = response.data;
        }
      })
      .catch((err) => {
        console.log(err);
        reportData.worked = false;
        reportData.data = {};
        error(err);
      });

    return reportData;
  }

  return {
    stateTokenNotice,
    handleMessageAlert,
    getReports,
    getReportsUsers,
  };
}

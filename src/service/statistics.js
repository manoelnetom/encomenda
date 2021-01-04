import axios from "axios";

export async function getAdminStatistics() {
  const data = {
    worked: false,
    stats: {},
  };
  await axios
    .get("/stats")
    .then((response) => {
      if (response) {
        data.worked = true;
        data.project = response.data;
      }
    })
    .catch((error) => {
      data.worked = false;
      data.project = {};
    });

  return data;
}

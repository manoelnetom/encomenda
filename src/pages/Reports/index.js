import React from "react";
import { useParams } from "react-router-dom";
import ReportsDemand from "./demands";
import ReportsUser from "./users";

function Reports() {
  const { type } = useParams();

  return <>{type === "Demandas" ? <ReportsDemand /> : <ReportsUser />}</>;
}

export default Reports;

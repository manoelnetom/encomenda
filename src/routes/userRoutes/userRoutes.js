import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../../pages/Home/index";
import Profile from "../../pages/Profile/index";
import SearchDemand from "../../pages/SearchDemand/index";
import DetailProposal from "../../pages/DetailProposal/index";
import DetailDemand from "../../pages/DetailDemand/index";
import RegisterOrUpdateDemand from "../../pages/RegisterOrUpdateDemand/index";
import NotFound from "../../pages/NotFound/index";
import SearchNotices from "../../pages/SearchNotices/index";
import SearchProjects from "../../pages/SearchProject/index";
import NoticeDetail from "../../pages/NoticeDetail/index";
import ProjectDetail from "../../pages/ProjectDetail/index";

export default function userRoutes() {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search_demandas" component={SearchDemand} />
      <Route exact path="/propostas/:id" component={DetailProposal} />
      <Route exact path="/detalhar_demandas/:id" component={DetailDemand} />
      <Route exact path="/search_notices" component={SearchNotices} />
      <Route exact path="/search_projects" component={SearchProjects} />
      <Route exact path="/notice/:id" component={NoticeDetail} />
      <Route exact path="/project/:id" component={ProjectDetail} />

      <Route
        exact
        path="/demandas/:type/:id?"
        component={RegisterOrUpdateDemand}
      />

      <Route exact path="/*" component={NotFound} />
    </Switch>
  );
}

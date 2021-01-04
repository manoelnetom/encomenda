import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../../pages/Home/index";
import Profile from "../../pages/Profile/index";
import SearchProfile from "../../pages/SearchProfile/index";
import SearchDemand from "../../pages/SearchDemand/index";
import DetailDemand from "../../pages/DetailDemand/index";
import DetailProposal from "../../pages/DetailProposal/index";
import RegisterOrUpdateDemand from "../../pages/RegisterOrUpdateDemand/index";
import ManageDemands from "../../pages/ManageDemands/index";
import NotFound from "../../pages/NotFound/index";
import CreateOrUpdateNotices from "../../pages/CreateOrUpdateNotices/index";
import CreateOrUpdateProjects from "../../pages/CreateOrUpdateProjects/index";
import SearchNotices from "../../pages/SearchNotices/index";
import SearchProjects from "../../pages/SearchProject/index";
import NoticeDetail from "../../pages/NoticeDetail/index";
import ProjectDetail from "../../pages/ProjectDetail/index";
import Reports from "../../pages/Reports/index";

export default function adminRoutes() {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search_demandas" component={SearchDemand} />

      <Route
        exact
        path="/demandas/:type/:id?"
        component={RegisterOrUpdateDemand}
      />
      <Route
        exact
        path="/notices/:type/:id?"
        component={CreateOrUpdateNotices}
      />
      <Route
        exact
        path="/projects/:type/:id?"
        component={CreateOrUpdateProjects}
      />
      <Route exact path="/search_profile" component={SearchProfile} />
      <Route exact path="/detalhar_demandas/:id" component={DetailDemand} />
      <Route exact path="/propostas/:id" component={DetailProposal} />
      <Route exact path="/gerir_demanda/:id" component={ManageDemands} />
      <Route exact path="/search_notices" component={SearchNotices} />
      <Route exact path="/search_projects" component={SearchProjects} />
      <Route exact path="/notice/:id" component={NoticeDetail} />
      <Route exact path="/project/:id" component={ProjectDetail} />
      <Route exact path="/reports/:type" component={Reports} />
      <Route exact path="/*" component={NotFound} />
    </Switch>
  );
}

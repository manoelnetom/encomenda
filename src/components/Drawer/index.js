import React, { useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import BookIcon from "@material-ui/icons/Book";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import PeopleIcon from "@material-ui/icons/People";
import useStyles from "./style";
import history from "../../history";
import { capitalize } from "../../utils/helpers";
import staticImg from "../../assets/static-profile.svg";
/*
Componente lateral da tela com menu. Terá uma mensagem de boas vidas para o
usuário e as opções de menu.
Necessário passar pelo props:
  -username: do usuário logado.
  -função para o onClick do IconButton: representa a seta que irá fechar o drawer.
Obs: em breve, a lista de itens do menu terá que ser passado pelo props, pois para
cada usuário pode muda as opções.
*/

export default function (props) {
  const classes = useStyles();
  const [openDemand, setOpenDemand] = useState(false);
  const [openNotice, setOpenNotice] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  function handleGoToHome() {
    history.push("/home");
  }

  function handleToggleOpenNotice() {
    setOpenNotice(!openNotice);
  }

  function handleClickReports() {
    setOpenReports(!openReports);
  }

  function handleClickOptions() {
    setOpenDemand(!openDemand);
  }

  function handleToggleOpenProject() {
    setOpenProject(!openProject);
  }

  function handleClickDemand() {
    history.push("/search_demandas");
  }

  function handleClickRegisterDemand() {
    history.push("/demandas/create");
  }

  function handleClickRegisterNotice() {
    history.push("/notices/create");
  }

  function handleClickSearchNotice() {
    history.push("/search_notices");
  }

  function handleClickRegisterProject() {
    history.push("/projects/create");
  }

  function handleClickSearchProject() {
    history.push("/search_projects");
  }

  function handleGoToReports(type) {
    history.push(`/reports/${type}`);
  }

  return (
    <>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton
            onClick={props.handleDrawerClose}
            className={
              props.open ? classes.iconButton : classes.iconButtonClose
            }
          >
            <ChevronLeftIcon />
          </IconButton>
          {props.open ? (
            <div
              className={
                props.open ? classes.headerDrawer : classes.headerDrawerClose
              }
            >
              <div className={classes.nameHeader}>
                {props.username !== null
                  ? `Bem Vindo(a), ${capitalize(props.username)}!`
                  : ""}
              </div>
              <div className={classes.emailHeader}>
                {props.email !== null ? props.email : ""}
              </div>
              <div className={classes.photoHeader}>
                {props.photo_url === null ? (
                  <Avatar className={classes.avatar} src={staticImg} alt="" />
                ) : (
                  <Avatar
                    className={classes.avatar}
                    src={props.photo_url}
                    alt=""
                  />
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <Divider />
        <List>
          <ListItem button onClick={handleGoToHome}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleClickOptions}>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: openDemand ? classes.listText : "" }}
              primary="Demandas"
            />
            {openDemand ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={openDemand} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={handleClickDemand}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Buscar Demanda" />
              </ListItem>
              <ListItem button onClick={handleClickRegisterDemand}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Demanda" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleToggleOpenNotice}>
            <ListItemIcon>
              <AnnouncementIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: openNotice ? classes.listText : "" }}
              primary="Notícias"
            />
            {openNotice ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={openNotice} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={handleClickSearchNotice}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Buscar Notícia" />
              </ListItem>
              {props.admin && (
                <>
                  <ListItem button onClick={handleClickRegisterNotice}>
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registrar Notícia" />
                  </ListItem>
                </>
              )}
            </List>
          </Collapse>

          <ListItem button onClick={handleToggleOpenProject}>
            <ListItemIcon>
              <FeaturedPlayListIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: openProject ? classes.listText : "" }}
              primary="Projetos "
            />
            {openProject ? <ExpandMore /> : <ExpandLess />}
          </ListItem>

          <Collapse in={openProject} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button onClick={handleClickSearchProject}>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Buscar Projetos" />
              </ListItem>
              {props.admin && (
                <>
                  <ListItem button onClick={handleClickRegisterProject}>
                    <ListItemIcon>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registrar Projetos" />
                  </ListItem>
                </>
              )}
            </List>
          </Collapse>

          {props.admin && (
            <>
              <ListItem button onClick={handleClickReports}>
                <ListItemIcon>
                  <BookmarksIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: openReports ? classes.listText : "" }}
                  primary="Relatórios"
                />
                {openReports ? <ExpandMore /> : <ExpandLess />}
              </ListItem>

              <Collapse in={openReports} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    onClick={() => handleGoToReports("Demandas")}
                  >
                    <ListItemIcon>
                      <BookIcon />
                    </ListItemIcon>
                    <ListItemText primary="Demandas" />
                  </ListItem>

                  <ListItem
                    button
                    onClick={() => handleGoToReports("Usuários")}
                  >
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                  </ListItem>
                </List>
              </Collapse>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}

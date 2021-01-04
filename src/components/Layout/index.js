import React from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "../Toolbar/index";
import Drawer from "../Drawer/index";
import useStyles from "./style";
import history from "../../history";

/*
Componente que estará sempre visivél para o usuário. Apenas o children, um outro componente, será
passado no main para mostrar as informações para o usuário.
Nele está presente os componentes Toolbar e Drawer, assim todas as funções que estes componentes precisarem
serão feitas aqui e recebidas pelo props.
*/

function Layout({
  children,
  username,
  logout,
  admin,
  photo_url,
  name,
  perfil,
  email,
  scope,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // estado do menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const op = Boolean(anchorEl);

  // function do menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // function do menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // function do drawer
  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleSearchProfile = () => {
    history.push("/search_profile");
  };

  const handleGoToProfilePage = () => {
    history.push("/profile");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar
          handleDrawerOpen={handleDrawer}
          open={open}
          handleMenu={handleMenu}
          logo="LOGO"
          anchorEl={anchorEl}
          op={op}
          handleClose={handleClose}
          logout={logout}
          searchProfile={handleSearchProfile}
          isAdmin={admin}
          photo_url={photo_url}
          name={name}
          goProfile={handleGoToProfilePage}
          perfil={perfil}
          scope={scope}
        />
      </AppBar>
      <Drawer
        open={open}
        username={username}
        handleDrawerClose={handleDrawer}
        email={email}
        photo_url={photo_url}
        admin={admin}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Layout;

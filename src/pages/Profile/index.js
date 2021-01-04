import React, { useContext, createRef, useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Box,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useLocation } from "react-router-dom";
import { Context } from "../../contexts/authContext/AuthContext";
import Page from "../../components/Page/index";
import staticImg from "../../assets/static-profile.svg";
import AboutTab from "./tabs/Sobre";
import useStyles from "./styles";
import Footer from "../../components/Footer";
import history from "../../history";
import MessageAlert from "../../components/MessageAlert/index";
import userService from '../../service/userService';
import TabPanel from '../../components/TabPanel';
import Settings from './tabs/Settings';

// Configurações do Panel
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Profile() {
  const classes = useStyles();
  // Pega dados do user
  const { user } = useContext(Context);
  const ref = createRef();
  // Muda valores das Tabs
  const [value, setValue] = useState(0);
  // Estado do usuario
  const [userData, setUserData] = useState(user);
  // Estado do formulario
  const [formUserData, setFormUserData] = useState(userData);
  // Pega dados que vem da pesquisa
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { stateToken, handleMessageAlert, updateUser} = userService();
  const isUser = userData.username === user.username;

  useEffect(() => {
    function verifyDataSettings() {
      if (location.state !== undefined) {
        const data = location.state;
        changeUserLocation(data, setUserData);
        changeUserLocation(data, setFormUserData);
      }
    }
    function changeUserLocation(data, setUser) {
      setUser((newUser) => {
        const user = { ...newUser.user };
        user.bio = data.bio;
        user.cpf = data.cpf;
        user.username = data.username;
        user.id = data.id;
        user.name = data.name;
        user.lattes_url = data.lattes_url;
        user.phone = data.phone;
        user.photo_url = data.photo_url;
        user.scopes = data.scopes;
        return user;
      });
    }
    verifyDataSettings();
  }, [location]);

  // Altera dados do estado
  function handleFormChange(event) {
    setFormUserData({
      ...formUserData,
      [event.target.name]: event.target.value,
    });
  }

  // Muda o valor do estado para as tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // Altera os dados so user atual
  async function handleSubmit() {
    const response = await updateUser(formUserData, formUserData.username);
    if (response) {
      setOpen(true);
    }
  }

  return (
    <Page className={classes.root} title="Perfil" ref={ref}>
      <header className={classes.header}>
        <Container maxWidth={false} className={classes.container}>
          <Box className={classes.boxProfile}>
            <Avatar
              src={userData.photo_url ? userData.photo_url : staticImg}
              className={classes.avatar}
            />
            <Typography
              classes={{ gutterBottom: classes.gutterBottom }}
              variant="h6"
              gutterBottom
            >
              {userData.name}
            </Typography>
          </Box>
        </Container>
      </header>

      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            indicator: classes.tabsIndicator,
          }}
          className={classes.tabsText}
        >
          <Tab label="Sobre" {...a11yProps(0)} />
          <Tab label="Configurações" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <AboutTab
          card={classes.card}
          cardAppBar={classes.cardAppBar}
          handleFormChange={handleFormChange}
          user={formUserData}
          submit={handleSubmit}
          scopeToolbar={classes.scopeToolbar}
          formButton={classes.formButton}
          formHideButton={classes.formHideButton}
          deleteButton={classes.deleteButton}
          rootContainer={classes.rootContainer}
          box={classes.box}
          body={classes.body}
          grid={classes.grid}
          colorIconButton={classes.colorIconButton}
          isUser={isUser}
        />
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
        <Settings/>
      </TabPanel>
      <Footer />

      {open && (
        <MessageAlert
          success
          title="Perfil atualizado com sucesso!"
          onCancel={() => {
            setOpen(false);
          }}
          buttons={
            <Button
              variant="contained"
              classes={{ root: classes.button }}
              onClick={() => {
                history.go(0);
              }}
            >
              OK
            </Button>
          }
        />
      )}
      {stateToken &&
        <MessageAlert
          warning
          message={process.env.REACT_APP_MSG_TOKEN_EXPIRATION}
          onCancel={handleMessageAlert}
          buttons={
            <>
              <Button
                variant="contained"
                className={classes.buttonGerir}
                onClick={handleMessageAlert}
              >
                Ok
                </Button>
            </>
          }
        />
      }
    </Page>
  );
}

export default Profile;

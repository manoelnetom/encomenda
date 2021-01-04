import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import logo from '../../assets/logo.svg';
import Page from '../../components/Page/index';
import { Context } from '../../contexts/authContext/AuthContext';
import useStyles from './style';
import InternalUserForm from './tabs/usuarioInterno';
import ExternalUserForm from './tabs/usuarioExterno';
import Button from '@material-ui/core/Button';
import MessageAlert from '../../components/MessageAlert';
import TabPanel from '../../components/TabPanel';

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

function Login() {
  const classes = useStyles();

  const { handleLogIn } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);

  const initialValues = {
    username: '',
    password: '',
  };

  const [values, setValues] = useState(initialValues);


  async function handleSubmit(data) {
    const response = await handleLogIn(data);
    if (response === 'Error') {
      setOpen(true);
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function handleChange(e) {
    const key = e.target.getAttribute('name');
    const { value } = e.target;
    setValues({
      ...values,
      [key]: value,
    });
  }

  function handleTabChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Page title="Login">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className={classes.image}>
          <img src={logo} alt="IFBA" className={classes.logo} />
          <Typography variant="h3" className={classes.text}>
            Bem vindo à
            {' '}
            <br />
            {' '}
            Vitrine Tecnológica do IFBA
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Box className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <Box className={classes.tabButton}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="off"
                classes={{
                  indicator: classes.tabsIndicator,
                }}
              >
                <Tab label="Usuário Suap" icon={<PersonIcon />} aria-label="JWTLogin" {...a11yProps(0)} />
                <Tab label="Usuário Externo" icon={<PersonIcon />} aria-label="FirebaseLogin" {...a11yProps(1)} />

              </Tabs>

              <TabPanel value={value} index={0} box={classes.box} className={classes.tab}>
                <InternalUserForm
                  handleSubmit={handleSubmit}
                  values={values}
                  setValues={setValues}
                  handleChange={handleChange}
                  form={classes.form}
                  classesSubmit={classes.submit}
                  inputText={classes.inputText}
                />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <ExternalUserForm
                  handleSubmit={handleSubmit}
                  values={values}
                  handleChange={handleChange}
                />
              </TabPanel>
            </Box>
            {open &&
              <MessageAlert
                warning={true}
                title="Login Inválido"
                onCancel={handleClose}
                message="Não foi possivel realizar o login! Por favor verifique seus dados."
                buttons={
                  <Button variant="contained" classes={{root: classes.buttonDialog}} onClick={handleClose} >
                    OK
                  </Button>
                }
              />}
          </Box>
        </Grid>
      </Grid>
    </Page>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  IconButton,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  AppBar,
  Toolbar,
  TextField,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Formsy from "formsy-react";
import Link from "@material-ui/core/Link";
import InputText from "../../../components/formsy/InputText";
import { phoneMask } from "../../../utils/masks/phoneMask/index";

// Tela de detalhes
function ProfileDetails(props) {
  return (
    <Grid container spacing={3}>
      <Grid item md={5} xs={12}>
        <Box>
          <Typography variant="h6">Nome Completo</Typography>
          <Typography variant="body1">
            {props.name ? props.name : ""}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={5} xs={12}>
        <Box>
          <Typography variant="h6">Email</Typography>
          <Typography variant="body1">
            {props.email ? props.email : ""}
          </Typography>
        </Box>
      </Grid>

      <Grid item md={5} xs={12}>
        <Box>
          <Typography variant="h6">Username</Typography>
          <Typography variant="body1">
            {props.username ? props.username : ""}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={5} xs={12}>
        <Box>
          <Typography variant="h6">CPF</Typography>
          <Typography variant="body1">{props.cpf ? props.cpf : ""}</Typography>
        </Box>
      </Grid>
      <Grid item md={5} xs={12}>
        <Box>
          <Typography variant="h6">Telefone</Typography>
          <Typography variant="body1">
            {props.phone ? phoneMask(props.phone) : ""}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={6} xs={12}>
        <Box>
          <Typography variant="h6">Lattes</Typography>
          <Typography>
            <Link
              href={props.lattes_url ? props.lattes_url : ""}
              color="inherit"
              target="_blank"
              rel="noopener"
            >
              {props.lattes_url ? props.lattes_url : ""}
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography variant="h6">Biografia</Typography>

        <TextField
          id="standard-multiline-static"
          multiline
          rowsMax={15}
          defaultValue={props.bio ? props.bio : " "}
          readOnly
          style={{
            minWidth: "100%",
            border: "none",
            background: "none",
            color: "black",
            fontSize: "1rem",
          }}
          InputProps={{ disableUnderline: true }}
        />
      </Grid>
    </Grid>
  );
}

// Formulário para editar dados de perfil
function Form(props) {
  // Estado do botão
  const [buttonValue, setButtonValue] = useState(true);

  function enableButton() {
    setButtonValue(false);
  }

  function disableButton() {
    setButtonValue(true);
  }

  return (
    <Formsy
      autoComplete="off"
      onSubmit={props.handleSubmit}
      onValid={enableButton}
      onInvalid={disableButton}
    >
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <InputText
            fullWidth
            label="Nome Completo"
            name="name"
            handleChange={props.handleFormChange}
            required
            value={props.name ? props.name : ""}
            variant="outlined"
            disabled={props.scopes}
            validations={{
              minLength: 2,
            }}
            validationErrors={{
              minLength: "Por favor, preencha este campo corretamente",
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputText
            fullWidth
            label="Email"
            name="email"
            handleChange={props.handleFormChange}
            value={props.email ? props.email : ""}
            variant="outlined"
            validations="isEmail"
            validationError="Este não é um email válido!"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputText
            fullWidth
            label="Username"
            name="username"
            value={props.username ? props.username : ""}
            variant="outlined"
            handleChange={props.handleFormChange}
            disabled
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputText
            fullWidth
            label="CPF"
            name="cpf"
            handleChange={props.handleFormChange}
            disabled
            value={props.cpf ? props.cpf : ""}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputText
            fullWidth
            label="Telefone"
            name="phone"
            handleChange={props.handleFormChange}
            required
            variant="outlined"
            value={props.phone ? props.phone : ""}
            placeholder="(xx) xxxxx-xxxx "
            validations={{
              minLength: 11,
            }}
            validationErrors={{
              minLength: "Por favor, preencha este campo corretamente",
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputText
            fullWidth
            label="Lattes"
            name="lattes_url"
            handleChange={props.handleFormChange}
            value={props.lattes_url ? props.lattes_url : ""}
            variant="outlined"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <InputText
            fullWidth
            label="Biografia"
            name="bio"
            handleChange={props.handleFormChange}
            type="textarea"
            value={props.bio ? props.bio : ""}
            variant="outlined"
            validations={{
              maxLength: 2000,
            }}
            validationErrors={{
              maxLength: "Não é possivel inserir mais que 1000 caracteres!",
            }}
            multiline
            rows={2}
            rowsMax={10}
          />
        </Grid>

        <Grid item md={12} xs={12}>
          <InputText
            fullWidth
            label="Foto"
            name="photo_url"
            handleChange={props.handleFormChange}
            type="textarea"
            value={props.photo_url ? props.photo_url : ""}
            variant="outlined"
            placeholder="Colocar um Link válido para uma foto sua na Internet"
          />
        </Grid>
      </Grid>
      <br />
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          className={props.formButton}
          disabled={buttonValue}
        >
          Salvar
        </Button>

        <Button
          color="primary"
          variant="contained"
          className={props.deleteButton}
          onClick={props.handleCancel}
        >
          Cancelar
        </Button>
      </Box>
    </Formsy>
  );
}

function AboutTab(props) {
  const [value, setValue] = useState(false);
  // Estado do campo de texto
  const [internValue, setInternValue] = useState(false);

  useEffect(() => {
    props.user.scopes.forEach((scope) => {
      if (scope.name === "Regular") {
        setInternValue(true);
      }
    });
  }, [props.user.scopes]);

  function handleChange() {
    setValue(!value);
  }

  function handleSubmit() {
    props.submit();
  }

  return (
    <Container
      maxWidth={false}
      classes={{ root: props.rootContainer }}
      className={props.box}
    >
      <div className={props.body}>
        {/* <Grid container spacing={3}> */}
        <Grid className={props.grid} item lg={9} md={9} xs={12}>
          <Card className={props.card} elevation={0} square variant="outlined">
            <AppBar
              position="static"
              elevation={0}
              className={props.cardAppBar}
            >
              <Toolbar className={props.cardAppBar}>
                <Typography variant="h6" color="inherit">
                  Informações Gerais
                </Typography>
                {props.isUser && (
                  <IconButton
                    aria-label="Edit"
                    color="inherit"
                    onClick={handleChange}
                    disabled={value}
                  >
                    <CreateIcon />
                  </IconButton>
                )}
              </Toolbar>
            </AppBar>

            <CardContent>
              {value ? (
                <Form
                  handleSubmit={handleSubmit}
                  name={props.user.name}
                  cpf={props.user.cpf}
                  username={props.user.username}
                  email={props.user.email}
                  lattes_url={props.user.lattes_url}
                  bio={props.user.bio}
                  phone={props.user.phone}
                  photo_url={props.user.photo_url}
                  formButton={props.formButton}
                  deleteButton={props.deleteButton}
                  handleFormChange={props.handleFormChange}
                  scopes={internValue}
                  handleCancel={handleChange}
                />
              ) : (
                <ProfileDetails
                  name={props.user.name}
                  cpf={props.user.cpf}
                  username={props.user.username}
                  lattes_url={props.user.lattes_url}
                  bio={props.user.bio}
                  phone={props.user.phone}
                  email={props.user.email}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={3} xs={12}>
          <Card className={props.card} elevation={0} square variant="outlined">
            <AppBar
              position="static"
              elevation={0}
              className={props.cardAppBar}
            >
              <Toolbar className={props.scopeToolbar}>
                <Typography variant="h6" color="inherit">
                  Perfil
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <Box display="flex" alignItems="center" flexDirection="column">
                {props.user.scopes.map((scope) => (
                  <Box key={scope.id}>
                    <Typography variant="subtitle2">{scope.name}</Typography>
                    <br />
                  </Box>
                ))}
                <Box />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* </Grid> */}
      </div>
    </Container>
  );
}

export default AboutTab;

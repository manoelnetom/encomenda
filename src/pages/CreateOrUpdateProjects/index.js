import React, { createRef, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Formsy from "formsy-react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import InputText from "../../components/formsy/InputText";
import useStyles from "./style";
import history from "../../history";
import Service from "../../service/featureProjectService";
import Page from "../../components/Page";
import MessageAlert from "../../components/MessageAlert";
import Footer from "../../components/Footer/index";

const createInitialValues = {
  title: "",
  description: "",
  banner_url: "",
};

function CreateOrUpdateProjects() {
  const classes = useStyles();
  const ref = createRef();
  const { type, id } = useParams();

  // Variável que guarda os dados do formulario
  const [project, setProject] = useState(createInitialValues);
  const [createIsWorked, setCreateIsWorked] = useState(false);
  const [createIsFailed, setCreateIsFailed] = useState(false);
  const buttonDisable =
    project.title === "" ||
    project.description === "" ||
    project.banner_url === "";
  const [newProjectId, setNewProjectId] = useState(null);
  const {
    stateTokenProject,
    handleMessageAlert,
    getProject,
    createFeatureProject,
    updateProject,
  } = Service();

  useEffect(() => {
    async function load() {
      const response = await getProject(id);

      if (response.worked) {
        setProject({
          title: response.project.title,
          description: response.project.description,
          banner_url: response.project.banner_url,
        });
      } else history.push("/search_projects");
    }
    if (type === "update") {
      load();
    }

    if (type === undefined) history.push("/home");

    // eslint-disable-next-line
  }, [id, type]);

  function handleFormChange(event) {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  }

  // função que envia os dados para cadastro
  async function handleSubmit(data) {
    if (type === "create") {
      const response = await createFeatureProject(data);

      if (response.worked) {
        setCreateIsWorked(response.worked);
        setNewProjectId(response.data.id);
      } else setCreateIsFailed(true);
    } else {
      const response = await updateProject(id, data);
      if (response) setCreateIsWorked(response);
    }
  }

  function handleBack() {
    history.goBack();
  }

  function handleFinish() {
    if (type === "create") history.push(`/project/${newProjectId}`);
    else history.push(`/project/${id}`);
  }

  return (
    <Page
      className={classes.root}
      title={type === "create" ? "Criar Projeto" : "Atualizar Projejo:"}
      ref={ref}
    >
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.filterHeader}>
            <div className={classes.title}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon className={classes.arrowBack} />
              </IconButton>
              Projetos
            </div>
            <div className={classes.subtitle}>
              <Typography variant="h5">Criar Projeto </Typography>
            </div>
          </div>
        </div>
      </header>
      <Container
        maxWidth={false}
        classes={{ root: classes.rootContainer }}
        className={classes.containerBody}
      >
        <Card className={classes.card}>
          <AppBar
            position="static"
            elevation={0}
            className={classes.cardAppBar}
          >
            <ToolBar className={classes.cardAppBar}>
              <Typography variant="body1" color="inherit">
                Preencha os campos abaixo
              </Typography>
            </ToolBar>
          </AppBar>
          <CardContent>
            <Formsy autoComplete="off" onSubmit={handleSubmit}>
              <Grid style={{ paddingTop: 8 }} container spacing={3}>
                <Grid item xs={12}>
                  <InputText
                    fullWidth
                    label="Título"
                    name="title"
                    variant="outlined"
                    setValue={setProject}
                    value={project.title}
                    required
                    placeholder="Digite aqui a título do projeto"
                    handleChange={handleFormChange}
                    validations={{
                      minLength: 2,
                    }}
                    validationErrors={{
                      minLength: "Por favor, preencha este campo corretamente",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputText
                    fullWidth
                    label="Descrição"
                    setValue={setProject}
                    value={project.description}
                    name="description"
                    variant="outlined"
                    required
                    multiline
                    rows={5}
                    handleChange={handleFormChange}
                    placeholder="Digite aqui a descrição do projeto"
                    validations={{
                      minLength: 2,
                    }}
                    validationErrors={{
                      minLength: "Por favor, preencha este campo corretamente",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputText
                    fullWidth
                    label="Banner"
                    name="banner_url"
                    variant="outlined"
                    setValue={setProject}
                    value={project.banner_url}
                    required
                    handleChange={handleFormChange}
                    placeholder="Digite aqui a URL do banner do projeto"
                    validations={{
                      minLength: 2,
                    }}
                    validationErrors={{
                      minLength: "Por favor, preencha este campo corretamente",
                    }}
                  />
                </Grid>
              </Grid>
              <br />
              <br />
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  color="primary"
                  variant="contained"
                  classes={{ root: classes.button }}
                  type="submit"
                  disabled={buttonDisable}
                >
                  {type === "create" ? "Criar" : "Atualizar"}
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  classes={{ root: classes.button }}
                  onClick={() => {
                    history.push("/search_projects");
                  }}
                >
                  Voltar
                </Button>
              </Box>
            </Formsy>
          </CardContent>
        </Card>

        {createIsWorked && (
          <MessageAlert
            success
            title={`Projeto ${
              type === "create" ? "CRIADO" : "ATUALIZADO"
            } com Sucesso!`}
            onCancel={() => {
              setCreateIsWorked(false);
            }}
            buttons={
              <Button
                variant="contained"
                classes={{ root: classes.button }}
                onClick={() => {
                  setCreateIsWorked(false);
                  handleFinish();
                }}
              >
                OK
              </Button>
            }
          />
        )}
        {createIsFailed && (
          <MessageAlert
            error
            title="Ocorreu um ERRO ao tentar criar um projeto!"
            message="Por favor, tente novamente!"
            onCancel={() => {
              setCreateIsFailed(false);
            }}
            buttons={
              <Button
                variant="contained"
                classes={{ root: classes.button }}
                onClick={() => {
                  setCreateIsFailed(false);
                }}
              >
                OK
              </Button>
            }
          />
        )}
      </Container>
      {stateTokenProject && (
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
      )}
      <Footer />
    </Page>
  );
}

export default CreateOrUpdateProjects;

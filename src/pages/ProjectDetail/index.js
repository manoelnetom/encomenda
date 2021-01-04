import React, { createRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  IconButton,
  Box,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Service from "../../service/featureProjectService";
import Page from "../../components/Page";
import history from "../../history";
import useStyles from "./style";
import Footer from "../../components/Footer";
import { Context } from "../../contexts/authContext/AuthContext";
import ProjectCard from "../../components/ProjectCard/index";
import Spinner from "../../components/Loader/index";
import MessageAlert from "../../components/MessageAlert";

const initialValue = {
  id: 0,
  title: "",
  description: "",
  banner_url: "",
  creation_date: "2020-12-12T00:15:17.000Z",
  creator: {
    username: "",
    name: "",
    photo_url: null,
  },
};

function ProjectDetail() {
  // Pega parametros da URL
  const params = useParams();

  const { isAdmin } = useContext(Context);
  // Desestrutura o parametro ID do objeto params
  const { id } = params;
  const ref = createRef();
  const classes = useStyles();
  const [project, setProject] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { stateTokenProject, handleMessageAlert,
    getProject,
    deleteProject, } = Service();


  useEffect(() => {
    async function load() {
      setLoading(true);
      const response = await getProject(id);

      if (response.worked) {
        setProject(response.project);
        setLoading(false);
      } else history.push("/search_projects");
    }

    if (id) load();
    else history.push("/search_projects");
    // eslint-disable-next-line
  }, [id]);

  function handleGoBack() {
    history.push("/search_projects");
  }

  function handleOpenOrCloseModal(value) {
    setOpenModal(value);
  }

  function handleGoToUpdadeProject() {
    history.push(`/projects/update/${project.id}`);
  }

  async function handleDelete() {
    const response = await deleteProject(project.id);
    if (response) {
      setOpenModal(false);
      setDeleted(true);
    }
  }

  return (
    <Page title={project.title} ref={ref} className={classes.root}>
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.filterHeader}>
            <Box className={classes.title}>
              <IconButton onClick={handleGoBack}>
                <ArrowBackIcon className={classes.arrowBack} />
              </IconButton>
            </Box>
            <Box className={classes.subtitle}>
              <Typography variant="h5" className={classes.title}>
                Projeto
              </Typography>
            </Box>
          </div>
        </div>
      </header>
      <Container
        maxWidth={false}
        classes={{ root: classes.rootContainer }}
        className={classes.card}
      >
        {loading ? (
          <Spinner type="Puff" color="#192d3e" height={100} width={100} />
        ) : (
            <ProjectCard
              project={project}
              wrap={false}
              isDetail
              isAdmin={isAdmin}
              handleUpdate={handleGoToUpdadeProject}
              handleDelete={() => {
                handleOpenOrCloseModal(true);
              }}
            />
          )}
      </Container>

      {openModal && (
        <MessageAlert
          warning
          title="Tem certeza que deseja DELETAR este projeto?"
          message="Confirma?"
          onCancel={() => {
            handleOpenOrCloseModal(false);
          }}
          buttons={
            <>
              <Box className={classes.buttonGroup}>
                <Button
                  variant="contained"
                  className={classes.buttonGerir}
                  onClick={handleDelete}
                >
                  Sim
                </Button>
                <Button
                  variant="contained"
                  className={classes.buttonDeletar}
                  onClick={() => {
                    handleOpenOrCloseModal(false);
                  }}
                >
                  Não
                </Button>
              </Box>
            </>
          }
        />
      )}

      {deleted && (
        <MessageAlert
          success
          title="Projeto deletado com sucesso!"
          onCancel={handleGoBack}
          buttons={
            <>
              <Box className={classes.buttonGroup}>
                <Button
                  variant="contained"
                  className={classes.buttonGerir}
                  onClick={handleGoBack}
                >
                  Ok
                </Button>
              </Box>
            </>
          }
        />
      )}
      {stateTokenProject &&
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
      <Footer />
    </Page>
  );
}

export default ProjectDetail;

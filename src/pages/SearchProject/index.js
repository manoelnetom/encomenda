import React, { createRef, useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import Search from "../../components/Search/index";
import Page from "../../components/Page";
import { useStyles } from "./styles";
import ComponentAlert from "../../components/Alert";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard/index";
import Service from "../../service/featureProjectService";
import Spinner from "../../components/Loader/index";
import { Context } from "../../contexts/authContext/AuthContext";
import ToolTip from "../../components/ToolTip/index";
import history from "../../history";
import MessageAlert from "../../components/MessageAlert";

const initialValue = {
  query: "",
};

function SearchProjects() {
  const ref = createRef();
  const classes = useStyles();
  const { isAdmin } = useContext(Context);

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    stateTokenProject,
    handleMessageAlert,
    searchFeatureProjects,
  } = Service();

  const messageInitial = "Não foi possivel encontrar o projeto desejado";

  useEffect(() => {
    async function load() {
      setLoading(true);
      const response = await searchFeatureProjects(searchTerm);
      if (response.worked) {
        setProjects(response.data.data);
        setError(false);
      } else {
        setError(true);
        setProjects([]);
      }

      setLoading(false);
    }

    load();
    // eslint-disable-next-line
  }, [searchTerm]);

  function handleSearch(event) {
    setSearchTerm({
      ...searchTerm,
      [event.target.name]: event.target.value,
    });
  }

  function handleGoToCreateproject() {
    history.push("/projects/create");
  }

  return (
    <Page className={classes.root} title="Projetos" ref={ref}>
      <header className={classes.header}>
        <Container maxWidth={false} className={classes.container}>
          <form className={classes.filterHeader}>
            <div className={classes.nameSymbol}>
              <AnnouncementIcon className={classes.icon} />
              <Typography className={classes.typografy} variant="h6">
                Projetos
              </Typography>
            </div>
            <Search
              disabled={false}
              name="query"
              placeholder="Procurar por..."
              search={searchTerm.query}
              onChangeSearch={handleSearch}
            />
          </form>
          {isAdmin && (
            <ToolTip position="bottom" title="Criar Projeto">
              <IconButton
                className={classes.iconButton}
                onClick={handleGoToCreateproject}
              >
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </ToolTip>
          )}
        </Container>
      </header>
      <div className={classes.tabPanel}>
        {error && (
          <div className={classes.tableResults}>
            <ComponentAlert
              severity="warning"
              title="Informação"
              message={messageInitial}
            />
          </div>
        )}

        {loading ? (
          <div className={classes.spinner}>
            <Spinner type="Puff" color="#192d3e" height={100} width={100} />
          </div>
        ) : (
          <Container
            maxWidth={false}
            classes={{ root: classes.rootContainer2 }}
            className={classes.containerBody2}
          >
            {projects.length > 0 && (
              <>
                {projects.map((project) => (
                  <ProjectCard project={project} key={project.id} wrap />
                ))}
              </>
            )}
          </Container>
        )}
      </div>
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

export default SearchProjects;

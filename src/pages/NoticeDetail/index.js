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
import Service from "../../service/noticesService";
import Page from "../../components/Page";
import history from "../../history";
import useStyles from "./style";
import Footer from "../../components/Footer";
import { Context } from "../../contexts/authContext/AuthContext";
import NoticeCard from "../../components/NoticeCard/index";
import Spinner from "../../components/Loader/index";
import MessageAlert from "../../components/MessageAlert";


const initialValue = {
  id: 0,
  title: "",
  description: "",
  creation_date: "2020-12-12T00:15:17.000Z",
  creator: {
    username: "",
    name: "",
    photo_url: null,
  },
};

function NoticeDetail() {
  // Pega parametros da URL
  const params = useParams();

  const { isAdmin } = useContext(Context);
  // Desestrutura o parametro ID do objeto params
  const { id } = params;
  const ref = createRef();
  const classes = useStyles();
  const [notice, setNotice] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { stateTokenNotice,
    handleMessageAlert,
    getNotice,
    deleteNotice } = Service();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const response = await getNotice(id);

      if (response.worked) {
        setNotice(response.notice);
        setLoading(false);
      } else history.push("/search_notices");
    }

    if (id) load();
    else history.push("/search_notices");

    // eslint-disable-next-line
  }, [id]);

  function handleGoBack() {
    history.push("/search_notices");
  }

  function handleOpenOrCloseModal(value) {
    setOpenModal(value);
  }

  function handleGoToUpdateNotice() {
    history.push(`/notices/update/${notice.id}`);
  }

  async function handleDelete() {
    const response = await deleteNotice(notice.id);
    if (response) {
      setOpenModal(false);
      setDeleted(true);
    }
  }

  return (
    <Page title={notice.title} ref={ref} className={classes.root}>
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
                Notícia
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
            <NoticeCard
              notice={notice}
              wrap={false}
              isDetail
              isAdmin={isAdmin}
              handleUpdate={handleGoToUpdateNotice}
              handleDelete={() => {
                handleOpenOrCloseModal(true);
              }}
            />
          )}
      </Container>

      {openModal && (
        <MessageAlert
          warning
          title="Tem certeza que deseja DELETAR esta notícia?"
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
          title="Notícia deletada com sucesso!"
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
      {stateTokenNotice &&
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

export default NoticeDetail;

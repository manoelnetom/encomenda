import React, { createRef, useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Search from "../../components/Search/index";
import Page from "../../components/Page";
import { useStyles } from "./styles";
import ComponentAlert from "../../components/Alert";
import Footer from "../../components/Footer";
import NoticeCard from "../../components/NoticeCard/index";
import Service from "../../service/noticesService";
import Spinner from "../../components/Loader/index";
import { Context } from "../../contexts/authContext/AuthContext";
import ToolTip from "../../components/ToolTip/index";
import history from "../../history";
import MessageAlert from "../../components/MessageAlert";
import Button from '@material-ui/core/Button';

const initialValue = {
  query: "",
};

function SearchNotices() {
  const ref = createRef();
  const classes = useStyles();
  const { isAdmin } = useContext(Context);

  const [notices, setNoticies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { stateTokenNotice, handleMessageAlert, searchNotice } = Service();

  const messageInitial = "Não foi possivel encontrar a notícia desejada";

  useEffect(() => {
    async function load() {
      setLoading(true);
      const response = await searchNotice(searchTerm);
      if (response.worked) {
        setNoticies(response.data.data);
        setError(false);
      } else {
        setError(true);
        setNoticies([]);
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

  function handleGoToCreateNotice() {
    history.push("/notices/create");
  }

  return (
    <Page className={classes.root} title="Notícias" ref={ref}>
      <header className={classes.header}>
        <Container maxWidth={false} className={classes.container}>
          <form className={classes.filterHeader}>
            <div className={classes.nameSymbol}>
              <AnnouncementIcon className={classes.icon} />
              <Typography className={classes.typografy} variant="h6">
                Notícias
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
            <ToolTip position="bottom" title="Criar notícia">
              <IconButton
                className={classes.iconButton}
                onClick={handleGoToCreateNotice}
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
              {notices.length > 0 && (
                <>
                  {notices.map((notice) => (
                    <NoticeCard notice={notice} key={notice.id} wrap />
                  ))}
                </>
              )}
            </Container>
          )}
      </div>
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

export default SearchNotices;

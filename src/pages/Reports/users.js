import React, { createRef, useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import BookIcon from "@material-ui/icons/Book";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import TabPanel from "../../components/TabPanel";
import Search from "../../components/Search/index";
import Page from "../../components/Page";
import { useStyles } from "./styles";
import AllReports from "./tabs/ReportsUsers.js";
import { Context } from "../../contexts/authContext/AuthContext";
import history from "../../history";
import ComponentAlert from "../../components/Alert";
import Footer from "../../components/Footer";
import MessageAlert from "../../components/MessageAlert";
import reportsService from "../../service/reportsService";
import Spinner from "../../components/Loader/index";
import PdfGenerator from "./pdf/users";

const orderByFields = [
  "Nome",
  "Quantidade de Demandas",
  "Quantidade de Propostas",
  "Quantidade de Comentários",
  "Quantidade de Curtidas",
  "Pontuação Final",
];

const orderBy = ["Crescente", "Decrescente"];

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ReportsUser() {
  const ref = createRef();
  const classes = useStyles();

  // Pega dados do user
  const { isAdmin } = useContext(Context);
  // campo de busca
  const [search, setSearch] = useState("");
  const [registration, setRegistration] = useState("");
  // Lista de demandas gerais
  const [users, setUsers] = useState([]);
  // armazena condição do campo de pesquisa vazio
  const [searchEmpty, setSearchEmpty] = useState(false);
  const [valueOrder, setValueOrder] = useState("");
  const [valueOrderBy, setValueOrderBy] = useState("");

  // Estados para controlar a abertura dos selectF
  const [isSelectorOpen, setisSelectorOpen] = useState(false);
  const [isSelectorByOpen, setisSelectorByOpen] = useState(false);

  const {
    stateTokenDemmand,
    handleMessageAlert,
    getReportsUsers,
  } = reportsService();
  const [searchLoading, setSearchLoading] = useState(false);

  const messageInitial =
    "Realize a busca de um dado válido para visualizar o relatório.";
  const messageEmpty = "Não há demandas para essa busca.";

  useEffect(() => {
    if (searchEmpty) {
      if (search === "") {
        setSearchEmpty(false);
      }
    }
    // eslint-disable-next-line
  }, [search]);

  function handleSearch(event) {
    setSearch(event.target.value);
  }
  function handleRegistration(event) {
    setRegistration(event.target.value);
  }

  function clickDemand(demand) {
    history.push(`/detalhar_demandas/${demand.id}`);
  }

  // faz a busca no database
  async function clickSearch(event) {
    event.preventDefault();
    setSearchLoading(true);
    const data = {};
    if (search !== "") {
      data.name = search;
    } else if (search === "") {
    } else {
      data.name = search;
    }

    if (registration !== "") {
      data.username = registration;
    } else if (registration === "") {
    } else {
      data.username = registration;
    }

    if (valueOrder !== "") {
      if (valueOrder === "Nome") data.order = "name";
      if (valueOrder === "Quantidade de Demandas") data.order = "demand_count";
      if (valueOrder === "Quantidade de Comentários")
        data.order = "comment_count";
      if (valueOrder === "Quantidade de Curtidas") data.order = "like_count";
      if (valueOrder === "Quantidade de Propostas")
        data.order = "proposal_count";
      if (valueOrder === "Pontuação Final") data.order = "score";
    } else if (valueOrder === "") {
    } else {
      data.order = valueOrder;
    }

    if (valueOrderBy !== "") {
      if (valueOrderBy === "Crescente") {
        data.by = "ASC";
      } else {
        data.by = "DESC";
      }
    } else if (valueOrderBy === "") {
    } else {
      data.by = valueOrderBy;
    }

    if (data !== undefined) {
      console.log("Dados Enviados", data);
      const response = await getReportsUsers(JSON.stringify(data));
      if (response !== undefined) {
        console.log(response);

        setSearchEmpty(false);
        setUsers(response.data);
        setTimeout(() => {
          setSearchLoading(false);
        }, 1000);
      } else {
        setSearchEmpty(true);
        // setDemands([]);
      }
    }
  }

  function handleChangeOrder(event) {
    setValueOrder(`${event.target.value}`);
  }
  function handleChangeOrderBy(event) {
    setValueOrderBy(`${event.target.value}`);
  }

  return (
    <Page className={classes.root} title="Usuários" ref={ref}>
      <header className={classes.header}>
        <Container maxWidth={false} className={classes.container}>
          <form className={classes.filterHeader} onSubmit={clickSearch}>
            <div className={classes.nameSymbol}>
              <BookIcon className={classes.icon} />
              <Typography className={classes.typografy} variant="h6">
                Usuários
              </Typography>
            </div>

            <Search
              disabled={false}
              name="search"
              placeholder="Nome"
              search={search}
              onChangeSearch={handleSearch}
            />

            <Search
              disabled={false}
              name="quert"
              placeholder="Matricula"
              search={registration}
              onChangeSearch={handleRegistration}
              type="number"
            />

            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                className={classes.selectStatus}
                displayEmpty
                open={isSelectorOpen}
                value={valueOrder}
                autoWidth
                input={
                  <Input onClick={() => setisSelectorOpen(!isSelectorOpen)} />
                }
                onChange={handleChangeOrder}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <div className={classes.statusSearch}>
                        <SearchIcon className={classes.searchIcon} />
                        <span className={classes.spanStatus}>Ordenar Por</span>
                      </div>
                    );
                  }
                  return selected;
                }}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Ordenar por:</em>
                </MenuItem>
                {orderByFields.map((value) => (
                  <MenuItem key={value} value={value}>
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                className={classes.selectStatus}
                displayEmpty
                open={isSelectorByOpen}
                value={valueOrderBy}
                autoWidth
                input={
                  <Input
                    onClick={() => setisSelectorByOpen(!isSelectorByOpen)}
                  />
                }
                onChange={handleChangeOrderBy}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <div className={classes.statusSearch}>
                        <SearchIcon className={classes.searchIcon} />
                        <span className={classes.spanStatus}>Ordenar Por</span>
                      </div>
                    );
                  }
                  return selected;
                }}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Ordenação:</em>
                </MenuItem>
                {orderBy.map((value) => (
                  <MenuItem key={value} value={value}>
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className={classes.divButton}>
              <Button className={classes.searchButton} type="submit">
                Buscar
              </Button>
            </div>
          </form>
        </Container>
      </header>
      <TabPanel className={classes.tabPanel}>
        {searchEmpty ? (
          <div className={classes.tableResults}>
            <ComponentAlert
              severity="info"
              title="Informação"
              message={messageEmpty}
            />
          </div>
        ) : users.length === 0 ? (
          <div className={classes.tableResults}>
            <ComponentAlert
              severity="info"
              title="Informação"
              message={messageInitial}
            />
          </div>
        ) : searchLoading ? (
          <Spinner type="Puff" color="#192d3e" height={75} width={75} />
        ) : (
          <>
            <div className={classes.pdf2}>
              <PdfGenerator list={users} />
            </div>
            <AllReports
              users={users.length}
              messageEmpty="Não existem demandas na base de dados!!"
              click={clickDemand}
              listUsers={users}
              isAdmin={isAdmin}
            />
          </>
        )}
        {stateTokenDemmand && (
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
      </TabPanel>
      <Footer />
    </Page>
  );
}

export default ReportsUser;

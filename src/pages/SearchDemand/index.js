import React, { createRef, useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import BookIcon from "@material-ui/icons/Book";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import TabPanel from "../../components/TabPanel";
import Search from "../../components/Search/index";
import Page from "../../components/Page";
import { useStyles } from "./styles";
import AllDemands from "./tabs/Demands";
import { Context } from "../../contexts/authContext/AuthContext";
import history from "../../history";
import ComponentCheck from "../../components/CheckBox";
import ComponentAlert from "../../components/Alert";
import Footer from "../../components/Footer";
import MessageAlert from "../../components/MessageAlert";
import demandService from "../../service/demandService";
import Spinner from "../../components/Loader/index";

// dados dos status
const status = ["Liberada", "Submetida", "Em Edição", "Fechada", "Cancelada"];

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

function SearchDemand() {
  const ref = createRef();
  const classes = useStyles();
  // Pega dados do user
  const { user, isAdmin } = useContext(Context);
  // campo de busca
  const [search, setSearch] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  // Lista de demandas gerais
  const [demands, setDemands] = useState([]);
  // armazena condição do campo de pesquisa vazio
  const [searchEmpty, setSearchEmpty] = useState(false);
  // estado do botão buscar
  const [stateButton, setStateButton] = useState(false);
  const {
    stateTokenDemmand,
    handleMessageAlert,
    getAllDemands,
  } = demandService();
  const [searchLoading, setSearchLoading] = useState(false);
  const [valueStatus, setValueStatus] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState({
    Liberada: false,
    Submetida: false,
    "Em Edição": false,
    Fechada: false,
    Cancelada: false,
  });

  const messageInitial =
    "Realize a busca de um dado válido para visualizar as demandas.";
  const messageEmpty = "Não há demandas para essa busca.";

  const [checkState, setCheckState] = useState({
    Todas: false,
    Minhas: false,
  });

  useEffect(() => {
    if (searchEmpty) {
      if (search === "" || searchUsername === "") {
        setSearchEmpty(false);
      }
    }
    // eslint-disable-next-line
  }, [search, searchUsername]);

  // Para o admin ficará visível o campo Procurar por login.
  // Para usuário regular não aparece
  // verifica o valor da tab, se for para TODAS o campo username fica vazio, caso contrário é
  // setado o username do usuário
  useEffect(() => {
    if (!checkState.Minhas) {
      setSearchUsername("");
    } else {
      setSearchUsername(user.username);
    }
  }, [checkState.Minhas, user.username]);

  useEffect(() => {
    if (isAdmin) {
      if (
        !checkState.Minhas &&
        !checkState.Todas &&
        search === "" &&
        searchUsername === "" &&
        valueStatus.length === 0
      ) {
        setStateButton(true);
      } else {
        setStateButton(false);
      }
    } else if (!checkState.Minhas && !checkState.Todas && search === "")
      setStateButton(true);
    else setStateButton(false);
    // eslint-disable-next-line
  }, [
    checkState.Minhas,
    checkState.Todas,
    search,
    searchUsername,
    valueStatus.length,
  ]);

  function handleSearch(event) {
    setSearch(event.target.value);
  }

  function handleSearchUsername(event) {
    setSearchUsername(event.target.value);
  }

  function clickDemand(demand) {
    history.push(`/detalhar_demandas/${demand.id}`);
  }

  function changeCheckBox(event) {
    const { name } = event.target;
    const { checked } = event.target;
    if (name === "Todas") {
      if (checked) {
        setCheckState({
          Todas: checked,
          Minhas: !checked,
        });
      } else {
        changeSetCheck("Todas", checked);
      }
    } else if (checked) {
      setCheckState({
        Todas: !checked,
        Minhas: checked,
      });
    } else {
      changeSetCheck("Minhas", checked);
    }
  }

  function changeSetCheck(name, value) {
    setCheckState({
      ...checkState,
      [name]: value,
    });
  }

  // faz a busca no database
  async function clickSearch(event) {
    event.preventDefault();
    setSearchLoading(true);
    let data = {};
    if (search !== "" && searchUsername === "") {
      data = { query: search };
    } else if (search === "" && searchUsername === "") {
      if (checkState.Todas) {
        data = {};
      }
    } else {
      data = { query: search, username: searchUsername };
    }

    if (valueStatus.length !== 0) {
      const array = [];
      valueStatus.map((value) => array.push({ name: value }));
      data.status = array;
    }

    if (data !== undefined) {
      const response = await getAllDemands(JSON.stringify(data));

      if (response !== undefined) {
        // caso não tenha a palavra na busca
        if (response.data.length === 0) {
          setSearchEmpty(true);
          // setDemands([]);
        } else {
          setSearchEmpty(false);
          setDemands(response.data);
          setTimeout(() => {
            setSearchLoading(false);
          }, 1000);
        }
      } else {
        setSearchEmpty(true);
        // setDemands([]);
      }
    }
  }

  function changeChecked(key, value) {
    setCheckedStatus({
      ...checkedStatus,
      [key]: value,
    });
  }

  function handleChangeStatus(event) {
    const index = valueStatus.indexOf(event.target.value);
    if (index > -1) {
      changeChecked(event.target.value, false);
      valueStatus.splice(index, 1);
    } else {
      changeChecked(event.target.value, true);
      setValueStatus([...valueStatus, event.target.value]);
    }
  }

  return (
    <Page className={classes.root} title="Demandas" ref={ref}>
      <header className={classes.header}>
        <Container maxWidth={false} className={classes.container}>
          <form className={classes.filterHeader} onSubmit={clickSearch}>
            <div className={classes.nameSymbol}>
              <BookIcon className={classes.icon} />
              <Typography className={classes.typografy} variant="h6">
                Demandas
              </Typography>
            </div>
            <Search
              disabled={false}
              name="search"
              placeholder="Procurar por..."
              search={search}
              onChangeSearch={handleSearch}
            />
            {isAdmin ? (
              <Search
                disabled={checkState.Minhas ? true : false}
                name="searchUsername"
                placeholder="Procurar por login"
                search={searchUsername}
                onChangeSearch={handleSearchUsername}
              />
            ) : null}
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                className={classes.selectStatus}
                displayEmpty
                multiline
                value={valueStatus}
                input={<Input />}
                onChange={handleChangeStatus}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <div className={classes.statusSearch}>
                        <SearchIcon className={classes.searchIcon} />
                        <span className={classes.spanStatus}>Status</span>
                      </div>
                    );
                  }
                  return selected.join(", ");
                }}
                inputProps={{ "aria-label": "Without label" }}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em>Status</em>
                </MenuItem>
                {status.map((value, index) => (
                  <MenuItem key={index} value={value}>
                    <Checkbox checked={checkedStatus[value]} />
                    <ListItemText primary={value} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              className={
                isAdmin ? classes.filterToType : classes.filterToTypeUser
              }
            >
              <ComponentCheck
                formLabel={classes.formLabel}
                title="Procurar por:"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Todas"
                      style={{ color: "white" }}
                      checked={checkState.Todas}
                      onChange={changeCheckBox}
                    />
                  }
                  label="Todas as Demandas"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Minhas"
                      style={{ color: "white" }}
                      checked={checkState.Minhas}
                      onChange={changeCheckBox}
                    />
                  }
                  label="Minhas Demandas"
                />
              </ComponentCheck>
            </div>
            <div className={classes.divButton}>
              <Button
                disabled={stateButton}
                className={classes.searchButton}
                type="submit"
              >
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
        ) : demands.length === 0 ? (
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
          <AllDemands
            demands={demands.length}
            messageEmpty="Não existem demandas na base de dados!!"
            click={clickDemand}
            listDemands={demands}
            isAdmin={isAdmin}
          />
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

export default SearchDemand;

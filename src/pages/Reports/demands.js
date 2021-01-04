import React, { createRef, useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import BookIcon from "@material-ui/icons/Book";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
import AllReports from "./tabs/Reports";
import { Context } from "../../contexts/authContext/AuthContext";
import history from "../../history";
import ComponentAlert from "../../components/Alert";
import Footer from "../../components/Footer";
import MessageAlert from "../../components/MessageAlert";
import reportsService from "../../service/reportsService";
import Spinner from "../../components/Loader/index";
import Calendar from "../../components/Calendar";
import PdfGenerator from "./pdf/demands";

// dados dos status
const status = ["Liberada", "Submetida", "Em Edição", "Fechada", "Cancelada"];
const itensSelect = [
  "Alcance Interno",
  "Regional",
  "Nacional",
  "Internacional",
];
const optional = [
  "Criador",
  "Data de Criação",
  "Status",
  "Alcance",
  "Tipo",
  "Visibilidade",
  "Descrição",
  "Critérios de Solução",
  "Problema",
  "Recursos Disponiveis",
  "Palavras-Chave",
  "Observação",
  "Proponentes",
  "Associados",
  "Propostas",
  "Data inicial para submissão para submissão de propostas",
  "Data final para submissão para submissão de propostas",
  "Visibilidade das propostas de solução",
  "Quantidade de Propostas submetidas",
  "Quantidade de curtidas",
  "Quantidade de comentários",
];
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

function ReportsDemand() {
  const ref = createRef();
  const classes = useStyles();

  // Pega dados do user
  const { isAdmin } = useContext(Context);
  // campo de busca
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  // Lista de demandas gerais
  const [demands, setDemands] = useState([]);
  // armazena condição do campo de pesquisa vazio
  const [searchEmpty, setSearchEmpty] = useState(false);

  // Estados para controlar a abertura dos selectF
  const [isSelectorOpen, setisSelectorOpen] = useState(false);
  const [isSelectorScopeOpen, setisSelectorScopeOpen] = useState(false);
  const [isSelectorFieldOpen, setisSelectorFieldOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  const {
    stateTokenDemmand,
    handleMessageAlert,
    getReports,
  } = reportsService();
  const [searchLoading, setSearchLoading] = useState(false);
  const [valueStatus, setValueStatus] = useState([]);
  const [checkedStatus, setCheckedStatus] = useState({
    Liberada: false,
    Submetida: false,
    "Em Edição": false,
    Fechada: false,
    Cancelada: false,
  });
  const [valueAlcance, setValueAlcance] = useState([]);
  const [checkedAlcance, setCheckedAlcance] = useState({
    Regional: false,
    Nacional: false,
    "Alcance Interno": false,
    Internacional: false,
  });

  const [valueOptional, setValueOptional] = useState([]);
  const [checkedOptional, setCheckedOptional] = useState({
    Criador: false,
    "Data de Criação": false,
    Status: false,
    Alcance: false,
    Visibilidade: false,
    Tipo: false,
    Descrição: false,
    "Critérios de Solução": false,
    Problema: false,
    "Recursos Disponiveis": false,
    "Palavras-Chave": false,
    Observação: false,
    Proponentes: false,
    Associados: false,
    "Data inicial para submissão para submissão de propostas": false,
    "Data final para submissão para submissão de propostas": false,
    "Visibilidade das propostas de solução": false,
    "Quantidade de Propostas submetidas": false,
    "Quantidade de curtidas": false,
    "Quantidade de comentários": false,
    Propostas: false,
  });

  // Data inicial de submissão
  const [beginDate, setBeginDate] = useState(Date.now());
  // Data final de submissão
  const [endDate, setEndDate] = useState(Date.now());

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
  function handleQuery(event) {
    setQuery(event.target.value);
  }

  function clickDemand(demand) {
    history.push(`/detalhar_demandas/${demand.id}`);
  }

  // faz a busca no database
  async function clickSearch(event) {
    event.preventDefault();
    setSearchLoading(true);
    let data = {};
    if (search !== "") {
      data = { name: search };
    } else if (search === "") {
    } else {
      data = { name: search };
    }

    if (query !== "") {
      data = { query };
    } else if (query === "") {
    } else {
      data = { query };
    }

    if (valueStatus.length !== 0) {
      const array = [];
      valueStatus.map((value) => array.push({ name: value }));
      data.status = array;
    }

    if (valueAlcance.length !== 0) {
      const array = [];
      valueAlcance.map((value) => array.push({ scope: value }));
      data.scopes = array;
    }

    if (!viewAll) {
      data.initial_date = new Date(beginDate);
      data.final_date = new Date(endDate);
    }

    if (
      search === "" &&
      valueStatus.length === 0 &&
      valueAlcance.length === 0 &&
      query === ""
    ) {
      data = {};
    }

    if (data !== undefined) {
      console.log(data);
      const response = await getReports(JSON.stringify(data));
      if (response !== undefined) {
        // caso não tenha a palavra na busca
        if (response.data.demand_count === 0) {
          setSearchEmpty(true);
          // setDemands([]);
        } else {
          setSearchEmpty(false);
          setDemands(response.data.demands);
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

  // método para mudar data inicial
  function handleBeginDate(date) {
    setBeginDate(date);
  }

  // método para mudar data final
  function handleEngDate(date) {
    setEndDate(date);
  }

  function changeChecked(key, value) {
    setCheckedStatus({
      ...checkedStatus,
      [key]: value,
    });
  }

  function changeCheckedAlcance(key, value) {
    setCheckedAlcance({
      ...checkedAlcance,
      [key]: value,
    });
  }

  function changeCheckedOptions(key, value) {
    setCheckedOptional({
      ...checkedOptional,
      [key]: value,
    });
  }

  function handleChangeOptional(event) {
    const index = valueOptional.indexOf(event.target.value);

    if (index > -1) {
      changeCheckedOptions(event.target.value, false);
      valueOptional.splice(index, 1);
    } else {
      changeCheckedOptions(event.target.value, true);
      setValueOptional([...valueOptional, event.target.value]);
    }
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

  function handleChangeAlcance(event) {
    const index = valueAlcance.indexOf(event.target.value);

    if (index > -1) {
      changeCheckedAlcance(event.target.value, false);
      valueAlcance.splice(index, 1);
    } else {
      changeCheckedAlcance(event.target.value, true);
      setValueAlcance([...valueAlcance, event.target.value]);
    }
  }

  return (
    <Page className={classes.root} title="Demandas" ref={ref}>
      <header className={classes.header}>
        <Container maxWidth={false} className={classes.container}>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                placeholder="Autor"
                search={search}
                onChangeSearch={handleSearch}
              />

              <Search
                disabled={false}
                name="quert"
                placeholder="Texto"
                search={query}
                onChangeSearch={handleQuery}
              />

              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  className={classes.selectStatus}
                  displayEmpty
                  multiline
                  open={isSelectorOpen}
                  value={valueStatus}
                  input={
                    <Input onClick={() => setisSelectorOpen(!isSelectorOpen)} />
                  }
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

              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  className={classes.selectStatus}
                  displayEmpty
                  multiline
                  value={valueAlcance}
                  open={isSelectorScopeOpen}
                  input={
                    <Input
                      onClick={() =>
                        setisSelectorScopeOpen(!isSelectorScopeOpen)
                      }
                    />
                  }
                  onChange={handleChangeAlcance}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <div className={classes.statusSearch}>
                          <SearchIcon className={classes.searchIcon} />
                          <span className={classes.spanStatus}>Alcance</span>
                        </div>
                      );
                    }
                    return selected.join(", ");
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={MenuProps}
                >
                  <MenuItem disabled value="">
                    <em>Alcance</em>
                  </MenuItem>
                  {itensSelect.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      <Checkbox checked={checkedAlcance[value]} />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  className={classes.selectStatus}
                  displayEmpty
                  multiline
                  open={isSelectorFieldOpen}
                  value={valueOptional}
                  input={
                    <Input
                      onClick={() =>
                        setisSelectorFieldOpen(!isSelectorFieldOpen)
                      }
                    />
                  }
                  onChange={handleChangeOptional}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return (
                        <div className={classes.statusSearch}>
                          <SearchIcon className={classes.searchIcon} />
                          <span className={classes.spanStatus}>Campos</span>
                        </div>
                      );
                    }
                    return selected.join(", ");
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                  MenuProps={MenuProps}
                >
                  <MenuItem disabled value="">
                    <em>Campos</em>
                  </MenuItem>
                  {optional.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      <Checkbox checked={checkedOptional[value]} />
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value={viewAll}
                      onChange={() => setViewAll(!viewAll)}
                      style={{ color: "#f5f5f5" }}
                    />
                  }
                  label="Ver Todas"
                />
              </div>
              <div className={classes.divButton}>
                <Button className={classes.searchButton} type="submit">
                  Buscar
                </Button>
              </div>
            </form>
          </div>
        </Container>

        <div className={classes.dates}>
          <div className={classes.dateComponent}>
            <Calendar
              name="beginDate"
              required
              disabled={viewAll}
              className={classes.errorDate}
              label="Data inicial"
              selectedDate={beginDate}
              handleDate={handleBeginDate}
              messageInvalidDate="Data em formato inválido."
              messageError="Data final não pode ser menor que a data inicial."
            />
          </div>

          <div className={classes.dateComponent}>
            <Calendar
              name="endDate"
              minDate={beginDate}
              required
              disabled={viewAll}
              className={classes.errorDate}
              label="Data final"
              selectedDate={endDate}
              handleDate={handleEngDate}
              messageInvalidDate="Data em formato inválido."
              messageError="Data final não pode ser menor que a data inicial."
            />
          </div>
        </div>
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
          <>
            <div className={classes.pdf}>
              <PdfGenerator list={demands} fields={valueOptional} />
            </div>
            <AllReports
              demands={demands.length}
              messageEmpty="Não existem demandas na base de dados!!"
              click={clickDemand}
              listDemands={demands}
              isAdmin={isAdmin}
              fields={valueOptional}
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

export default ReportsDemand;

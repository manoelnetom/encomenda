import React, { useState, createRef, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import history from '../../history';
import Search from '../../components/Search';
import Page from '../../components/Page';
import useStyles from './styles';
import staticImg from '../../assets/static-profile.svg';
import ComponentCheck from '../../components/CheckBox';
import ComponentAlert from '../../components/Alert';
import Footer from '../../components/Footer';
import TabPanel from '../../components/TabPanel';
import userService from '../../service/userService';
import MessageAlert from '../../components/MessageAlert';
import Spinner from "../../components/Loader/index";

/*
Está page terá dois campos de pesquisas: Matrícula e Nome.
Inicialmente, aparecerá uma lista de usuários admins, e ao pesquisar só o usuário específico.
Ao clicar nesse usuário, será direcionado para a página de profile passando a matrícula como paramêtro.
*/

// Cabeçalho da tabela
const titleHeads = [
  { id: 0, title: 'Nome', },
  { id: 1, title: 'Usuário', },
  { id: 2, title: 'E-mail', },
  { id: 3, title: 'Telefone', },
  { id: 4, title: 'Perfil', },
];

function SearchPerfil() {
  const classes = useStyles();
  const valuesSearch = {
    username: "",
    name: "",
  };

  const ref = createRef();
  const messageInitial = "Realize a busca para visualizar os usuários";
  const messageEmpty = "Não há usuários para essa busca.";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState(valuesSearch);
  const [checkState, setCheckState] = useState({
    Admin: false,
    Regular: false,
  });
  const [checkStateType, setCheckStateType] = useState({
    Interno: false,
    Externo: false,
  });
  const [usersSearch, setUsersSearch] = useState([]);
  const [message, setMessage] = useState(false);

  const [stateButton, setStateButton] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const { stateTokenUser, handleMessageAlertUser, getUsersByUsernameNameScope } = userService();

  useEffect(() => {
    if (checkState.Admin ||
      checkState.Regular ||
      checkStateType.Externo ||
      checkStateType.Interno ||
      search.name !== "" ||
      search.username !== "") {
      setStateButton(false);
    } else {
      setStateButton(true);
    }
  }, [checkState.Admin,
  checkState.Regular,
  checkStateType.Externo,
  checkStateType.Interno,
  search.name,
  search.username
  ])

  function changePage(event, newPage) {
    setPage(newPage);
  }

  function changeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function changeCheckBox(event) {
    const { name } = event.target;
    const { checked } = event.target;
    if (name === "Admin") {
      if (checked) {
        setCheckState({
          Admin: checked,
          Regular: !checked,
        });
      } else {
        changeSetScope("Admin", checked);
      }
    } else if (checked) {
      setCheckState({
        Admin: !checked,
        Regular: checked,
      });
    } else {
      changeSetScope("Regular", checked);
    }
  }

  function changeSetScope(name, value) {
    setCheckState({
      ...checkState,
      [name]: value,
    });
  }

  function changeCheckBoxType(event) {
    const { name } = event.target;
    const { checked } = event.target;
    if (name === "Externo") {
      if (checked) {
        setCheckStateType({
          Externo: checked,
          Interno: !checked,
        });
      } else {
        changeSetType("Externo", checked);
      }
    } else if (checked) {
      setCheckStateType({
        Externo: !checked,
        Interno: checked,
      });
    } else {
      changeSetType("Interno", checked);
    }
  }

  function changeSetType(name, value) {
    setCheckStateType({
      ...checkStateType,
      [name]: value,
    });
  }

  // ao clicar num item da tabela vai para a tela de profile com os dados do usuário
  function clickRow(row) {
    history.push("/profile", row);
  }

  function onChangeSearch(event) {
    setSearch({
      ...search,
      [event.target.name]: event.target.value,
    });
  }

  // ao clicar no botão Buscar, pega o usuário específico
  async function userFilterOnChange(event) {
    event.preventDefault();
    setSearchLoading(true);
    let data;
    search.username !== '' && (data = { username: search.username });
    search.name !== '' && (data = { ...data, name: search.name });
    checkState.Admin && (data = { ...data, scope: 'Admin' });
    checkState.Regular && (data = { ...data, scope: 'Regular' });
    checkStateType.Externo && (data = { ...data, type: 'Externo' });
    checkStateType.Interno && (data = { ...data, type: 'Interno' });

    // verifica se todos os campos estão vazios
    if (data === undefined) {
      setMessage(false);
      setUsersSearch([]);
    } else {
      const response = await getUsersByUsernameNameScope(JSON.stringify(data));

      if (response !== undefined) {
        // caso digite algum dado que não esteja no banco de dados
        if (response.data.length === 0) {
          setMessage(true);
        } else {
          setMessage(false);
          setUsersSearch(response.data);
          setTimeout(() => {
            setSearchLoading(false);
          }, 1000);
        }
      }
    }
  }

  return (
    <Page className={classes.root} title="Pesquisa de Perfil" ref={ref}>
      <header className={classes.header}>
        <Container maxWidth="lg" className={classes.container}>
          <form className={classes.fieldFilter} onSubmit={userFilterOnChange}>
            <Search
              label="Buscar por login:"
              name="username"
              search={search.username}
              placeholder="Procurar por ..."
              onChangeSearch={onChangeSearch}
            />
            <Search
              label="Buscar por nome:"
              name="name"
              search={search.name}
              placeholder="Procurar por ..."
              onChangeSearch={onChangeSearch}
            />
            <div className={classes.filterToType}>
              <ComponentCheck
                formLabel={classes.formLabel}
                title="Filtrar por escope:"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Admin"
                      style={{ color: "white" }}
                      checked={checkState.Admin}
                      onChange={changeCheckBox}
                    />
                  }
                  label="Administrador"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Regular"
                      style={{ color: "white" }}
                      checked={checkState.Regular}
                      onChange={changeCheckBox}
                    />
                  }
                  label="Regular"
                />
              </ComponentCheck>
              <ComponentCheck
                formLabel={classes.formLabel}
                title="Filtrar por perfil:"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Externo"
                      style={{ color: "white" }}
                      checked={checkStateType.Externo}
                      onChange={changeCheckBoxType}
                    />
                  }
                  label="Externo"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="Interno"
                      style={{ color: "white" }}
                      checked={checkStateType.Interno}
                      onChange={changeCheckBoxType}
                    />
                  }
                  label="Interno"
                />
              </ComponentCheck>
            </div>
            <div className={classes.fieldFilterButton}>
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
        {/* <Container
        classes={{ root: classes.rootContainer }}
        className={classes.containerBody}
      > */}
        {message ? (
          <ComponentAlert
            severity="info"
            title="Informação"
            message={messageEmpty}
          />
        )
          : usersSearch.length === 0
            ? (
              <ComponentAlert
                severity="info"
                title="Informação"
                message={messageInitial}
              />
            )
            : searchLoading? 
              <Spinner type="Puff" color="#192d3e" height={75} width={75} />
            :(
              <Container maxWidth={false} classes={{ root: classes.rootContainer }} className={classes.containerBody}>
                <div className={classes.tableResults}>
                  <Paper>
                    <TableContainer className={classes.tableContainer}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {titleHeads.map((column) => (
                              <TableCell
                                key={column.id}
                                align="left"
                                className={classes.tableCell}
                              >
                                {column.title}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(rowsPerPage > 0
                            ? usersSearch.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : usersSearch).map((row) => (
                              <TableRow key={row.id} className={classes.tableRow} hover onClick={(event) => clickRow(row)}>
                                <TableCell component="th">
                                  <div className={classes.tableCellName}>
                                    {row.photo !== null
                                      ? <Avatar className={classes.img} src={row.photo_url} alt="" />
                                      : <Avatar className={classes.img} src={staticImg} alt="" />}
                                    {row.name}
                                  </div>
                                </TableCell>
                                <TableCell component="th">{row.username}</TableCell>
                                <TableCell component="th">{row.email}</TableCell>
                                <TableCell component="th">{row.phone}</TableCell>
                                <TableCell component="th">
                                  {row.scopes.map((scope) => scope.name.toUpperCase()).join(', ')}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={usersSearch.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={changePage}
                      onChangeRowsPerPage={changeRowsPerPage}
                      labelRowsPerPage="Linhas por página"
                    />
                  </Paper>
                </div>
              </Container>
            )}
        {/* </Container> */}
      </TabPanel>
      {stateTokenUser &&
        <MessageAlert
          warning
          message={process.env.REACT_APP_MSG_TOKEN_EXPIRATION}
          onCancel={handleMessageAlertUser}
          buttons={
            <>
              <Button
                variant="contained"
                className={classes.buttonGerir}
                onClick={handleMessageAlertUser}
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

export default SearchPerfil;

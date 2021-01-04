import React, { createRef, useState, useEffect } from "react";
import {
  Avatar,
  Table,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TableHead,
} from "@material-ui/core";
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
import Chip from "@material-ui/core/Chip";
import Formsy from "formsy-react";
import Grid from "@material-ui/core/Grid";
import { compareAsc, addDays } from "date-fns";
import { useParams } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import InputText from "../../components/formsy/InputText";
import useStyles from "./style";
import history from "../../history";
import Select from "../../components/formsy/Select";
import Calendar from "../../components/Calendar";
import Page from "../../components/Page";
import MessageAlert from "../../components/MessageAlert";
import StyledModal from "../../components/Modal/index";
import ToolTip from "../../components/ToolTip/index";
import Footer from "../../components/Footer/index";
import demandService from '../../service/demandService';
import userService from '../../service/userService';
import Spinner from "../../components/Loader/index";

const restrictionsValues = [
  {
    id: 1,
    description: "Privada",
  },
  {
    id: 2,
    description: "Restrita",
  },
  {
    id: 3,
    description: "Pública Interna",
  },
  {
    id: 4,
    description: "Pública Externa",
  },
];

const solutionsStatusValues = [
  {
    id: 1,
    description: "Públicas",
  },
  {
    id: 2,
    description: "Privadas",
  },
];

// Cabeçalho da tabela
const titleHeads = [
  {
    id: 0,
    title: "Nome",
  },
  {
    id: 1,
    title: "Usuário",
  },
];

const valuesInitial = {
  final_submission_date: Date.now(),
  initial_submission_date: Date.now(),
  visibility: "",
  associates: "",
  proposal_visibility: "",
};

function ManageDemands() {
  const classes = useStyles();
  const ref = createRef();
  const { id } = useParams();

  // Variável que guarda os dados do formulario
  const [demand, setDemand] = useState(valuesInitial);
  // Data inicial de submissão
  const [beginDate, setBeginDate] = useState(Date.now());
  // Data final de submissão
  const [endDate, setEndDate] = useState(Date.now());
  // variável para guardar o estado do dialog
  const [open, setOpen] = useState(false);
  // variável para tratar erro da data no calendário
  const [errorDate, setErrorDate] = useState(false);
  // Estado para armazenas novo participantes
  const [newParticipant, setNewParticipant] = useState("");
  // Estado que armazena os usuários retornados devido a pesquisa no backend
  const [usersSeach, setUserSeach] = useState([]);
  // Estado que define a aberta e fechamendo de do modal
  const [openModal, setOpenModal] = useState(false);
  // Estado para gerenciar todos os participants
  const [demandParticipant, setDemandParticipant] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [demandTitle, setDemandTitle] = useState("");
  const [limit, setLimit] = useState(10);

  const disabled =
    (demand.visibility === "Restrita" && demandParticipant.length === 0) ||
    errorDate;
  const [confirmRelease, setConfirmRelease] = useState(false);
  const { stateToken, handleMessageAlert, getDemandById, releaseDemand } = demandService();
  const { stateTokenUser, getAllUsers, handleMessageAlertUser } = userService();

  useEffect(() => {
    // metódo para checar as datas
    function checkDates() {
      if (compareAsc(beginDate, endDate) === 1) {
        setErrorDate(true);
      } else {
        setErrorDate(false);
      }
    }
    checkDates();
  }, [beginDate, endDate]);

  useEffect(() => {
    if (id) {
      getDemandById(id).then((response) => {
        if (response?.status === 200) {
          setDemand({
            final_submission_date: response.data.final_submission_date,
            initial_submission_date: response.data.initial_submission_date,
            visibility: response.data.demand_visibility.description,
            associates: response.data.associates,
            proposal_visibility: response.data.proposal_visibility.description,
          });
          setDemandTitle(response.data.title);

          setBeginDate(
            new Date(
              response.data.initial_submission_date
                ? response.data.initial_submission_date.substring(0, 19)
                : Date.now()
            )
          );
          setEndDate(
            new Date(
              response.data.final_submission_date
                ? response.data.final_submission_date.substring(0, 19)
                : addDays(Date.now(), 1)
            )
          );
          setDemandParticipant(response.data.associates);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleUpLimit(qtd) {
    setLimit(limit + qtd);
  }

  function handleFormChange(event) {
    setDemand({
      ...demand,
      [event.target.name]: event.target.value,
    });
  }

  function handleOpenConfirmAlert() {
    setConfirmRelease(true);
  }

  function handleCloseConfirmAlert() {
    setConfirmRelease(false);
  }

  // método para mudar data inicial
  function handleBeginDate(date) {
    setBeginDate(date);
  }

  // método para mudar o nome do novo participante
  function handleNewParticipantChange(event) {
    setNewParticipant(event.target.value);
  }

  // método para mudar data final
  function handleEngDate(date) {
    setEndDate(date);
  }

  // método que fecha o modal
  function hangleClose() {
    setOpen(false);
    handleBack();
  }

  // método que transforma a data para ser salva no banco
  function formDate(date) {
    const valu = new Date(date);

    return `${valu.getDate()}/${valu.getMonth() + 1}/${valu.getFullYear()}`;
  }

  // Retirar um usuário da proposta
  function handleDelete(data) {
    const ChipformData = demandParticipant.slice("");
    const newChipvalues = ChipformData.filter(
      (element) => element.username !== data
    );

    setParticipants(newChipvalues);
    setDemandParticipant(newChipvalues);
  }

  function existisInParticipants(username) {
    let response = false;
    demandParticipant.forEach((value) => {
      if (value.username === username) response = true;
    });

    return response;
  }

  // função que envia os dados para cadastro
  async function handleSubmit() {
    const data = {
      ...demand,
      initial_submission_date: formDate(beginDate),
      final_submission_date: formDate(endDate),
      associates: demandParticipant,
    };

    await releaseDemand(id, data).then((response) => {
      if (response) {
        setOpen(true);
      }
    });
  }

  // Função referente ao botão de volta para a tela de busca de demandas
  function handleBack() {
    let location = `/detalhar_demandas/${id}`;
    history.push(location);
  }
  // Abre o modal
  function handleOpen() {
    setOpenModal(true);
  }

  // Fecha o modal
  function handleClose() {
    setOpenModal(false);
  }

  // Pesquisa os usuários de acordo com o nome digitado
  async function searchUsers() {
    setSearchLoading(true);
    const response = await getAllUsers({
      name: newParticipant,
      type: "Interno",
    }).catch((error) => {
      console.log(error);
    });

    if (response) {
      const seachedUsers = response.data.map((data) => ({
        id: data.id,
        name: data.name,
        username: data.username,
        photo: data.photo_url,
      }));
      setUserSeach(seachedUsers);
      setTimeout(() => {
        setSearchLoading(false);
      }, 1000);
    }
  }

  // Adiciona componentes com o checkbox
  function handleAddComponents() {
    // Copia array de participantes
    const participantsCopy = participants.slice();
    // Copia array de gerencia de participantes
    const demandParticipantsCopy = demandParticipant.slice();

    participantsCopy.forEach((participantData, index) => {
      demandParticipantsCopy.forEach((data, index2) => {
        // Verifica se o participante adicionado no array já existe na gerencia
        if (data.username === participantData.username) {
          demandParticipantsCopy.splice(index2, 1);
        }
      });

      demandParticipantsCopy.push(participantData);
    });

    setDemandParticipant(demandParticipantsCopy);
    setUserSeach([]);
    handleClose();
  }

  // Adiciona um usuário a proposta
  function handleAddParticipants(data) {
    const participantsCopy = participants.slice();

    if (participantsCopy.length > 0) {
      participantsCopy.forEach((participantData, index) => {
        if (participantData.username === data.username) {
          participantsCopy.splice(index, 1);

          setParticipants(participantsCopy);
        } else {
          participantsCopy.push(data);
          setParticipants(participantsCopy);
        }
      });
    } else {
      participantsCopy.push(data);

      setParticipants(participantsCopy);
    }
  }

  function getMessageAlert(){
    if(stateToken){
      handleMessageAlert();
    }else if(stateTokenUser){
      handleMessageAlertUser();
    }
  }

  return (
    <Page
      className={classes.root}
      title={demandTitle ? `Gerir: ${demandTitle}` : "Gerir:"}
      ref={ref}
    >
      <header className={classes.header}>
        <div className={classes.container}>
          <div className={classes.filterHeader}>
            <div className={classes.title}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon className={classes.arrowBack} />
              </IconButton>
              Demandas
            </div>
            <div className={classes.subtitle}>
              <Typography variant="h5">
                {demandTitle ? `Gerir: ${demandTitle}` : "Gerir:"}
              </Typography>
            </div>
          </div>
        </div>
      </header>
      <Container
        maxWidth={false}
        classes={{ root: classes.rootContainer }}
        className={classes.containerBody}
      >
        {open && (
          <MessageAlert
            success
            title="Demanda LIBERADA com Sucesso!"
            onCancel={hangleClose}
            buttons={
              <Button
                variant="contained"
                classes={{ root: classes.button }}
                onClick={hangleClose}
              >
                OK
              </Button>
            }
          />
        )}
        {confirmRelease && (
          <MessageAlert
            warning
            title="Deseja LIBERAR esta demanda?"
            onCancel={handleCloseConfirmAlert}
            message="Confirma?"
            buttons={
              <>
                <Box className={classes.buttonGroup}>
                  <Button
                    variant="contained"
                    className={classes.buttonGerir}
                    onClick={() => {
                      handleCloseConfirmAlert();
                      handleSubmit();
                    }}
                  >
                    Sim
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.buttonDeletar}
                    onClick={handleCloseConfirmAlert}
                  >
                    Não
                  </Button>
                </Box>
              </>
            }
          />
        )}
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
                <ToolTip title="Visibilidade desta demanda" position="top">
                  <Grid item xs={12}>
                    <Select
                      name="visibility"
                      label="Visibilidade da demanda"
                      value={demand.visibility ? demand.visibility : "Privada"}
                      itens={restrictionsValues}
                      required
                      onChange={handleFormChange}
                      validations={{
                        minLength: 2,
                      }}
                      validationErrors={{
                        minLength:
                          "Por favor, selecione uma das visibilidades.",
                      }}
                    />
                  </Grid>
                </ToolTip>
                {demand.visibility === "Restrita" && (
                  <>
                    <Grid item md={12} sm={12}>
                      <div className={classes.chipInput}>
                        <InputText
                          fullWidth
                          label="Associado"
                          variant="outlined"
                          name="component"
                          placeholder="Digite o nome do associado que deseja adicionar"
                          handleChange={handleNewParticipantChange}
                          value={newParticipant}
                          validations={{
                            minLength: 3,
                          }}
                          validationErrors={{
                            minLength:
                              "Por favor, preencha este campo corretamente",
                          }}
                        />
                        <IconButton
                          onClick={() => {
                            searchUsers();
                            handleOpen();
                          }}
                          className={classes.formIconButton}
                          disabled={newParticipant.length < 3}
                        >
                          <SearchIcon />
                        </IconButton>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className={classes.chipContainer}>
                        {demandParticipant.map((data) => (
                          <Chip
                            key={data.username}
                            label={data.name}
                            onDelete={() => {
                              handleDelete(data.username);
                            }}
                            className={classes.chip}
                            color="primary"
                            avatar={
                              <Avatar
                                alt={data.name}
                                src={
                                  data.photo_url ? data.photo_url : data.photo
                                }
                                style={{ background: "gray" }}
                              />
                            }
                            /*     disabled={fieldStatus}
                             */ classes={{
                              deleteIcon: classes.icon,
                            }}
                          />
                        ))}
                      </Box>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <Select
                    name="proposal_visibility"
                    label="Visibilidade das Propostas de Solução"
                    value={
                      demand.proposal_visibility
                        ? demand.proposal_visibility
                        : "Públicas"
                    }
                    itens={solutionsStatusValues}
                    required
                    onChange={handleFormChange}
                    validations={{
                      minLength: 2,
                    }}
                    validationErrors={{
                      minLength:
                        "Por favor, selecione uma das visibilidades para proposta de solução.",
                    }}
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <Calendar
                    name="beginDate"
                    minDate={Date.now()}
                    required
                    className={classes.errorDate}
                    errorDate={errorDate}
                    label="Início da submissão de propostas"
                    selectedDate={beginDate}
                    handleDate={handleBeginDate}
                    messageInvalidDate="Data em formato inválido."
                    messageError="Data final não pode ser menor que a data inicial."
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <Calendar
                    name="endDate"
                    minDate={beginDate}
                    required
                    className={classes.errorDate}
                    errorDate={errorDate}
                    label="Fim da submissão de propostas"
                    selectedDate={endDate}
                    handleDate={handleEngDate}
                    messageInvalidDate="Data em formato inválido."
                    messageError="Data final não pode ser menor que a data inicial."
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
                  onClick={handleOpenConfirmAlert}
                  disabled={disabled}
                >
                  Liberar
                </Button>

                <Button
                  color="primary"
                  variant="contained"
                  classes={{ root: classes.button }}
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Voltar
                </Button>
              </Box>
            </Formsy>
            <StyledModal open={openModal} onClose={handleClose}>
              {searchLoading ? (
                <Spinner type="Puff" color="#192d3e" height={75} width={75} />
              ) : (
                <Paper className={classes.tablePaper}>
                  {usersSeach.length !== 0 ? (
                    <TableContainer className={classes.tableContainer}>
                      <Table
                        classes={{ root: classes.rootTableParent }}
                        stickyHeader
                        className={classes.table}
                      >
                        <TableHead classes={{ root: classes.rootTable }}>
                          <TableRow className={classes.tableHead}>
                            {titleHeads.map((column) => (
                              <TableCell
                                key={column.id}
                                aling="left"
                                className={classes.tableCell}
                              >
                                {column.title}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody classes={{ root: classes.rootTable }}>
                          {usersSeach.map((userData, index) => (
                            <TableRow role="checkbox" hover key={index}>
                              {index < limit && (
                                <>
                                  <TableCell aling="left">
                                    <div className={classes.tableCellName}>
                                      <Checkbox
                                        onChange={() => {
                                          handleAddParticipants(userData);
                                        }}
                                        disabled={existisInParticipants(
                                          userData.username
                                        )}
                                      />
                                      <Avatar
                                        src={userData.photo}
                                        alt=""
                                        className={classes.img}
                                        disabled={existisInParticipants(
                                          userData.username
                                        )}
                                      />
                                      <Typography>{userData.name}</Typography>
                                    </div>
                                  </TableCell>
                                  <TableCell aling="left">
                                    {userData.username}
                                  </TableCell>
                                </>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                        
                         <caption className={classes.viewMore}>
                              {limit + 10 < usersSeach.length && (
                                <Button
                                  variant="contained"
                                  className={classes.button3}
                                  onClick={() => {
                                    handleUpLimit(10);
                                  }}
                                >
                                  Ver mais
                                </Button>
                              )}
                          
                          </caption>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Container maxWidth="lg" className={classes.notFound}>
                      <ErrorOutlineIcon />
                      <Typography variant="body2">
                        Nenhum usuário encontrado
                      </Typography>
                    </Container>
                  )}

                  <Container maxWidth="lg" className={classes.buttonContainer}>
                    {usersSeach.length !== 0 && (
                      <Button
                        className={classes.button2}
                        variant="contained"
                        onClick={handleAddComponents}
                      >
                        Adicionar
                      </Button>
                    )}
                    <Button
                      className={classes.button2}
                      variant="contained"
                      onClick={() => {
                        handleClose();
                        setUserSeach([]);
                      }}
                    >
                      Fechar
                    </Button>
                  </Container>
                </Paper>
              )}
            </StyledModal>
          </CardContent>
        </Card>
      </Container>
      {(stateToken || stateTokenUser) &&
        <MessageAlert
          warning
          message={process.env.REACT_APP_MSG_TOKEN_EXPIRATION}
          onCancel={getMessageAlert}
          buttons={
            <>
              <Button
                variant="contained"
                className={classes.buttonGerir}
                onClick={getMessageAlert}
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

export default ManageDemands;

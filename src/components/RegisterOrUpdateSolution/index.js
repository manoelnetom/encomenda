import React, { createRef, useState, useContext, useEffect } from "react";
import {
  Container,
  IconButton,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Paper,
  CardHeader,
  Avatar,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Box,
  Grid,
} from "@material-ui/core";
import Formsy from "formsy-react";
import SearchIcon from "@material-ui/icons/Search";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import InputText from "../formsy/InputText";
import Page from "../Page";
import useStyles from "./style";
import StyledModal from "../Modal/index";
import { Context } from "../../contexts/authContext/AuthContext";
import MessageAlert from "../MessageAlert";
import proposalService from "../../service/proposals";
import userService from "../../service/userService";
import Spinner from "../Loader/index";

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

function RegisterOrUpdateSolution({
  type,
  demand_id,
  proposal_id,
  demandTitle,
  onClose,
  updated,
}) {
  const classes = useStyles();
  const ref = createRef();

  // Pega o tipo da pagina, se é para criar ou realizar update
  // Se o type for = update, então rota virá com o id da proposta chamado de proposalID para alterar funcionamento da pag.
  // Se o type for cadastrar, então a rota virá com o ID da demanda chamado de demandID
  // const { type, demand_id, proposal_id } = useParams();

  const { isAdmin, user } = useContext(Context);

  // Estrutura inicial da proposta
  const initialFormValues = {
    description: "",
    proponents: [
      {
        id: user.id,
        name: user.name,
        username: user.username,
        photo: user.photo_url,
      },
    ],
  };

  // Estado do formulário
  const [formValues, setFormValues] = useState(initialFormValues);
  // Estado para adicionar um novo participante a proposta
  const [participants, setParticipants] = useState([]);

  // Estado para adicionar um novo participante a proposta
  const [newParticipant, setNewParticipant] = useState("");

  // Estado que define a aberta e fechamendo de do modal
  const [open, setOpen] = useState(false);
  // Estado que armazena os usuários retornados devido a pesquisa no backend
  const [usersSeach, setUserSeach] = useState([]);
  // Estado que controla a mensagem do alerta!
  const [message, setMessage] = useState({
    title: "",
    body: "",
    success: false,
  });
  // Estado para abrir o Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [stateButtonSearch, setStateButtonSearch] = useState(true);

  const {
    stateToken,
    handleMessageAlert,
    getProposalById,
    createProposal,
    updateProposal,
  } = proposalService();
  const { stateTokenUser, getAllUsers, handleMessageAlertUser } = userService();
  const [limit, setLimit] = useState(10);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    async function getProposals() {
      await getProposalById(proposal_id)
        .then((response) => {
          setFormValues({
            description: response.data.description,
            status: response.data.proposal_status,
            proponents: response.data.proponents,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (type === "update" && proposal_id !== undefined) {
      getProposals();
    }

    return function cleanUp() {
      setFormValues([]);
    };
    // eslint-disable-next-line
  }, [proposal_id, type]);

  useEffect(() => {
    if (newParticipant !== "") {
      setStateButtonSearch(false);
    }
  }, [newParticipant]);

  function handleUpLimit(qtd) {
    setLimit(limit + qtd);
  }

  // Abre o modal
  function handleOpen() {
    setOpen(true);
  }

  // Fecha o modal
  function handleClose() {
    setOpen(false);
  }

  // Adiciona componentes com o checkbox
  function handleAddComponents() {
    const participantsCopy = participants.slice();
    const formValuesCopy = formValues.proponents.slice();
    participantsCopy.forEach((participantData) => {
      formValuesCopy.forEach((data, index2) => {
        if (data.username === participantData.username) {
          formValuesCopy.splice(index2, 1);
        }
      });

      formValuesCopy.push(participantData);
    });

    setFormValues({
      ...formValues,
      proponents: formValuesCopy,
    });

    setUserSeach([]);
    handleClose();
  }

  // impedir submit com enter 13 === Enter
  function onKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleGoToProposalOrDetail() {
    updated();
    onClose();
    handleCloseDialog();
  }

  function existisInParticipants(username) {
    let response = false;
    participants.forEach((value) => {
      if (value.username === username) response = true;
    });

    return response;
  }

  // Pesquisa os usuários de acordo com o nome digitado
  async function searchUsers() {
    setSearchLoading(true);

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

  // Retirar um usuário da proposta
  function handleDelete(data) {
    const ChipformData = formValues.proponents.slice("");
    const newChipvalues = ChipformData.filter(
      (element) => element.username !== data
    );

    setFormValues({
      ...formValues,
      proponents: newChipvalues,
    });

    setParticipants(newChipvalues);
  }
  // Adicionar um usuário a proposta
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

  // Altera o estado do novo participante
  function handleNewParticipantChange(e) {
    setNewParticipant(e.target.value);
  }

  // Realiza a conclusão do formulário
  async function handleSubmit() {
    let data = {
      ...formValues,
    };

    console.log(data);
    if (isAdmin) {
      data = {
        ...formValues,
        status: "",
      };
    }

    if (type === "create") {
      await createProposal(demand_id, data).then((response) => {
        if (response.status === 200) {
          setMessage({
            title: "Sucesso!",
            body: "Sua proposta foi criada.",
            success: true,
          });
          setOpenDialog(true);
        } else {
          setMessage({
            title: "Error!",
            body: "Não foi possivel criar sua proposta",
            success: false,
          });
          setOpenDialog(true);
        }
      });
    } else {
      const response = await updateProposal(proposal_id, data);

      if (response.status === 200) {
        setMessage({
          title: "Sucesso",
          body: "Sua proposta foi atualizada com sucesso.",
          success: true,
        });
        setOpenDialog(true);
      } else {
        setMessage({
          title: "Error!",
          body: "Não foi possivel atualizar sua proposta",
          success: false,
        });
        setOpenDialog(true);
      }
    }
  }

  // Altera os valores do estado do formulário.
  function handleFormChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  function getMessageAlert() {
    if (stateToken) {
      handleMessageAlert();
    } else if (stateTokenUser) {
      handleMessageAlertUser();
    }
  }

  return (
    <Page
      className={classes.root}
      title="Registrar Proposta de solução"
      ref={ref}
    >
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardAppBar}
          title={
            type === "create"
              ? `Crie uma proposta de solução para "${demandTitle}"`
              : "Atualize os dados de sua proposta "
          }
          titleTypographyProps={{ align: "center" }}
        />

        <CardContent>
          {openDialog && (
            <MessageAlert
              success
              title={message.title}
              message={message.body}
              onCancel={handleCloseDialog}
              buttons={
                <Button
                  onClick={
                    message.success
                      ? handleGoToProposalOrDetail
                      : handleCloseDialog
                  }
                  className={classes.buttonDialog}
                >
                  OK
                </Button>
              }
            />
          )}
          <Formsy
            autoComplete="off"
            onSubmit={handleSubmit}
            onKeyPress={onKeyPress}
          >
            <Grid container spacing={0}>
              {type === "create" && (
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    className={classes.message}
                    color="textSecondary"
                  >
                    * Preencha todos os dados
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <InputText
                  fullWidth
                  placeholder="Escreva aqui sua proposta de solução!"
                  name="description"
                  value={formValues.description}
                  handleChange={handleFormChange}
                  variant="outlined"
                  validations={{
                    minLength: 2,
                  }}
                  validationErrors={{
                    minLength: "Por favor, preencha este campo corretamente",
                  }}
                  label="Descrição"
                  multiline
                  rows={5}
                  rowsMax={20}
                />
                <Grid item xs={12}>
                  <div className={classes.chipInput}>
                    <InputText
                      fullWidth
                      label="Proponentes"
                      variant="outlined"
                      name="component"
                      placeholder="Digite o nome do proponente que deseja adicionar"
                      handleChange={handleNewParticipantChange}
                      value={newParticipant}
                      validations={{
                        minLength: 1,
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
                      disabled={stateButtonSearch}
                    >
                      <SearchIcon />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Box className={classes.groupChip}>
                    {formValues.proponents.map((data) => (
                      <div className={classes.proponents} key={data.username}>
                        <Chip
                          label={data.name}
                          onDelete={() => {
                            handleDelete(data.username);
                          }}
                          className={classes.chip}
                          color="primary"
                          avatar={
                            <Avatar
                              alt={data.name}
                              src={data.photo_url || data.photo}
                            />
                          }
                          classes={{
                            deleteIcon: classes.icon,
                          }}
                        />
                      </div>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <div>
              <Button
                className={classes.formButton}
                type="submit"
                color="primary"
                disabled={formValues.description === "" ? true : false}
                variant="contained"
              >
                Enviar
              </Button>
              <Button
                className={classes.formDelete}
                onClick={onClose}
                color="primary"
                variant="contained"
              >
                Cancelar
              </Button>
              <StyledModal open={open} onClose={handleClose}>
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

                    <Container
                      maxWidth="lg"
                      className={classes.buttonContainer}
                    >
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
            </div>
          </Formsy>
        </CardContent>
      </Card>
      {(stateToken || stateTokenUser) && (
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
      )}
    </Page>
  );
}

export default RegisterOrUpdateSolution;

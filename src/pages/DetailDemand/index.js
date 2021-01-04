/* eslint-disable no-param-reassign */
import React, { createRef, useState, useEffect, useContext } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams, useLocation } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Container,
  Typography,
  Tab,
  Tabs,
  IconButton,
  Button,
  TextField,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Box,
  Grid,
} from "@material-ui/core";
import { compareAsc } from "date-fns";
import Expansible from "./expansible/Expansible";
import staticImg from "../../assets/static-profile.svg";
import { useStyles } from "./styles";
import history from "../../history";
import Page from "../../components/Page";
import { Context } from "../../contexts/authContext/AuthContext";
import StyledModal from "../../components/Modal/index";
import CommentElement from "../../components/Comment";
import TabPanel from "../../components/TabPanel";
import MessageAlert from "../../components/MessageAlert";
import CardList from "../../components/CardList/index";
import RegisterOrUpdateSolution from "../../components/RegisterOrUpdateSolution/index";
import Footer from "../../components/Footer/index";
import EditIcon from "@material-ui/icons/Edit";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import ToolTip from "../../components/ToolTip/index";
import Formsy from "formsy-react";
import InputText from "../../components/formsy/InputText";
import Information from "../../components/Alert";
import ChipLabel from "../../components/ChipColor";
import demandService from "../../service/demandService";
import HelpIcon from "@material-ui/icons/Help";

/*
    Page que mostrará detalhes da demanda.
*/

// endpoints da demanda
const modelDemand = {
  id: 0,
  title: "",
  problem: "",
  like_count: 0,
  solutions_criteria: "",
  solution_proposals: [],
  user: {
    id: 0,
    name: "",
    photo_url: "",
  },
  keywords: [],
  initial_submission_date: "",
  has_liked: false,
  final_submission_date: "",
  description: "",
  demand_visibility: {},
  demand_type: {},
  demand_status: {},
  demand_scope: {},
  creation_date: "",
  available_resources: "",
  associates: [],
  comments: [],
  proponents: [],
  proposal_visibility: {},
  observation: null,
  chosen_proposal: {},
  comment_count:0
};

const toolTipeMessageModel = {
  edit: "Editar Demanda",
  submit: "Submeter Demanda",
  unSubmit: "Liberar novamente para Edição do proponente",
  release: "Liberar Demanda",
  finish: "Fechar Demanda",
  cancel: "Cancelar Demanda",
};

// Configurações do Panel
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function goToDetailProposal(id) {
  history.push(`/propostas/${id}`);
}

function base64toBlob(base64Data) {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data.split(',')[1]);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: "application/pdf" });
}

function DetailDemand() {
  // Pega o estado global que diz se o usuário é admin ou não.
  const { isAdmin, user } = useContext(Context);
  const ref = createRef();
  const classes = useStyles();
  // guarda o status de expansão dos paineis
  const [expanded, setExpanded] = useState("0");
  // guarda o status do botão de comentário para permitir a abertura ou não do collapse
  const [stateComment, setStateComment] = useState(false);
  // guarda os dados da demanda selecionada
  const [demand, setDemand] = useState(modelDemand);
  // guarda comentário
  const [comment, setComment] = useState("");

  // Verifica se o usuário é dono da demanda
  const [isCreator, setIsCreator] = useState(false);
  const [isProponent, setIsProponent] = useState(false);
  const [isAssociate, setIsAssociate] = useState(false);
  const liberedUser = isCreator || isProponent;
  const [toolTipMessage, setToolTipMessage] = useState(toolTipeMessageModel);
  const [acceptedProposal, setAcceptedProposal] = useState("");
  // Muda valores das Tabs
  const [value, setValue] = useState(0);

  // Controla o alert do delete
  const [deleted, setDeleted] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  //controla o alert do erro
  const [error, setError] = useState(false);

  const dateNow = new Date(Date.now());
  const initial_submission_date = new Date(
    demand.initial_submission_date
      ? demand.initial_submission_date.substring(0, 19)
      : Date.now()
  );
  const final_submission_date = new Date(
    demand.final_submission_date
      ? demand.final_submission_date.substring(0, 19)
      : Date.now()
  );

  const initialDateIsAfterOrEqual =
    compareAsc(dateNow, initial_submission_date) === 1 ||
    compareAsc(dateNow, initial_submission_date) === 0;
  const finalDateIsBeforeOrEqual =
    compareAsc(dateNow, final_submission_date) === -1 ||
    compareAsc(dateNow, final_submission_date) === 0;
  const isLibered =
    initialDateIsAfterOrEqual &&
    finalDateIsBeforeOrEqual &&
    demand.demand_status.description === "Liberada";

  const cancelVerification =
    demand.demand_status.description === "Cancelada" ||
    demand.demand_status.description === "Fechada";

  // Pega ID da demanda passada pelos parametros da rota
  const routeState = useLocation();
  const { id } = useParams();

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const [cancelModal, setCancelModal] = useState(false);
  const [unSubmitModal, setUnSubmitModal] = useState(false);
  const [unSubmited, setUnSubmited] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [canceled, setCanceled] = useState(false);
  const [cancelationText, setCancelationText] = useState("");
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [openFinishAlert, setOpenFinishAlert] = useState(false);
  const [finished, setFinished] = useState(false);
  const {
    stateTokenDemmand,
    handleMessageAlert,
    getDemandById,
    likeDemand,
    commentDemand,
    likeCommentDemand,
    submitDemand,
    unsubmitDemand,
    cancelDemand,
    finishDemand,
    getFilePdf
  } = demandService();
  const [filePdf, setFilePdf] = useState('');

  useEffect(() => {
    async function loadingData(data) {
      if (data.user.name === user.name) setIsCreator(true);
      data.proponents.forEach((proponent) => {
        if (proponent.username === user.username) setIsProponent(true);
      });
      data.associates.forEach((associate) => {
        if (associate.username === user.username) setIsAssociate(true);
      });
      setDemand((newDemand) => {
        const demandData = { ...newDemand.modelDemand };
        demandData.id = data.id;
        demandData.title = data.title;
        demandData.problem = data.problem;
        demandData.like_count = data.like_count;
        demandData.available_resources = data.available_resources;
        demandData.solutions_criteria = data.solutions_criteria;
        demandData.keywords = data.keywords;
        demandData.solution_proposals = data.solution_proposals;
        demandData.user = data.user;
        demandData.creation_date = data.creation_date;
        demandData.demand_scope = data.demand_scope;
        demandData.demand_status = data.demand_status;
        demandData.demand_type = data.demand_type;
        demandData.demand_visibility = data.demand_visibility;
        demandData.description = data.description;
        demandData.final_submission_date = data.final_submission_date;
        demandData.has_liked = data.has_liked;
        demandData.initial_submission_date = data.initial_submission_date;
        demandData.associates = data.associates;
        demandData.comments = data.comments;
        demandData.proponents = data.proponents;
        demandData.proposal_visibility = data.proposal_visibility;
        demandData.user = data.user;
        demandData.observation = data.observation;
        demandData.chosen_proposal = data.chosen_proposal;
        demandData.comment_count = data.comment_count
        return demandData;
      });

      const messageData = { ...toolTipMessage };

      if (data.demand_status.description !== "Em Edição")
        messageData.edit = "Você não pode editar esta demanda.";

      if (data.demand_status.description === "Submetida")
        messageData.submit = "Esta demanda já foi submetida!";

      if (data.demand_status.description !== "Submetida") {
        messageData.release =
          "Esta demanda já foi liberada ou não pode ser liberada";
        messageData.unSubmit =
          "Esta demanda não pode retornar para o status EM EDIÇÃO";
      }
      if (
        data.demand_status.description !== "Liberada" &&
        compareAsc(dateNow, final_submission_date) !== 1
      )
        messageData.finish = "Esta demanda não pode ser fechada";

      if (data.demand_status.description === "Cancelada") {
        const message = "Esta demanda foi Cancelada";
        messageData.edit = message;
        messageData.submit = message;
        messageData.unSubmit = message;
        messageData.finish = message;
        messageData.release = message;
        messageData.unSubmit = message;
        messageData.finish = message;
      }

      if (data.demand_status.description === "Fechada") {
        const message = "Esta demanda foi Fechada";
        messageData.edit = message;
        messageData.submit = message;
        messageData.unSubmit = message;
        messageData.finish = message;
        messageData.release = message;
        messageData.unSubmit = message;
        messageData.cancel = message;
      }

      setToolTipMessage(messageData);
    }

    async function getFile(demand_id){
      await getFilePdf(demand_id).then((res)=>{
        setFilePdf(res.data.pdf_base64);
      })
    }

    async function loadDemand() {
      await getDemandById(id)
        .then((response) => {
          if (response?.status === 200) {
            loadingData(response.data);
            getFile(response.data.id);
          } else {
            const url = history.location.pathname;
            if (url === `/detalhar_demandas/${id}`) {
              history.push("/search_demandas");
            }
          }
        })
        .catch((error) => {
          console.log(error);
          const url = history.location.pathname;
          if (url === `/detalhar_demandas/${id}`) {
            history.push("/search_demandas");
          }
        });
    }

    if (routeState.state !== undefined) {
      setValue(routeState.state.tab);
    }

    loadDemand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user, isUpdated, routeState]);

  //const [unSubmitModal, setUnSubmitModal] = useState(false);

  function handleChangeCancelationText(event) {
    setCancelationText(event.target.value);
  }

  function handleOpenOrCloseCancelModal(value) {
    setOpenCancelModal(value);
  }

  function handleOpenFinishModal() {
    setOpenFinishModal(true);
  }

  function handleOpenOrCloseUnSubmitModal(value) {
    setUnSubmitModal(value);
  }

  // Função referente ao botão de volta para a tela de busca de demandas
  function handleBack() {
    history.push("/search_demandas");
  }

  function toggleUpdated() {
    setIsUpdated(!isUpdated);
  }
  function formatDate(date) {
    const valu = new Date(date.substring(0, 19));

    return `${valu.getDate()}/${valu.getMonth() + 1}/${valu.getFullYear()}`;
  }

  // muda o painel e mostra o conteúdo embaixo
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // função chamada ao clicar no like
  async function changeLike() {
    const response = await likeDemand(demand.id);
    if (response !== undefined) {
      const count = response.data.like_count;
      setDemand({
        ...demand,
        like_count: count,
        has_liked: !demand.has_liked,
      });
    }
  }

  async function changeLikeComment(comment) {
    // requisição do like enviando o id do comentário
    const response = await likeCommentDemand(comment.id);
    if (response !== undefined) {
      if (response.status === 200) {
        const count = response.data.like_count;
        // transfere a lista para uma variável
        const newArray = demand.comments;
        // percorre a lista para achar o comentário que tem o mesmo id
        newArray.forEach((data, i) => {
          if (data.id === comment.id) {
            data.has_liked = !data.has_liked;
            data.like_count = count;
          }
        });
        // seta em comments
        setDemand({
          ...demand,
          comments: newArray,
        });
      }
    }
  }

  function changeComment() {
    setStateComment(!stateComment);
  }

  function handleChangeComment(event) {
    setComment(event.target.value);
  }

  // comentário
  async function clickComment() {
    // faz a requisição enviando a descrição do comentário e o id da demanda.
    const response = await commentDemand(
      demand.id,
      JSON.stringify({ description: comment })
    );
    if (response !== undefined) {
      if (response.status === 200) {
        // seta o retorno do response em uma nova variável
        const newComment = {
          id: response.data.id,
          description: response.data.description,
          creation_date: response.data.creation_date,
          has_liked: response.data.has_liked,
          like_count: response.data.like_count,
          creator: {
            username: response.data.creator.username,
            name: response.data.creator.name,
            photo_url: response.data.creator.photo_url,
          },
        };
        // transfere a lista para uma variável
        const newArray = demand.comments;
        // adiciona o novo objeto a esse array
        newArray.push(newComment);
        // coloca esse novo array em comentários para atualizar
        setDemand({
          ...demand,
          comments: newArray,
        });
        // coloca o campo do comentário como vazio
        setComment("");
      }
    }
  }

  // Muda o valor do estado para as tabs
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleOpenCancelModal() {
    setCancelModal(true);
  }
  function handleCloseCancelModal() {
    setCancelModal(false);
  }

  function handleError() {
    setError(false);
  }
  function closeModal() {
    setOpenCreateModal(false);
  }

  function handleOkMessageDeleted() {
    setDeleted(false);
    history.go(0);
  }

  async function handleSubmitDemand() {
    const response = await submitDemand(demand.id);
    if (response) {
      if (response.status === 200) {
        setOpenModal(false);
        setDeleted(true);
      }
    }
  }

  async function handleCancelDemand() {
    const data = {
      observation: cancelationText,
    };
    await cancelDemand(demand.id, data)
      .then((response) => {
        if (response) {
          setCancelModal(false);
          setCanceled(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleGoToUpdate() {
    history.push(`/demandas/update/${demand.id}`);
  }

  async function handleUnSubmitDemand() {
    await unsubmitDemand(demand.id).then((response) => {
      if (response) {
        setUnSubmited(true);
      }
    });
  }

  function handleGoToManageDemand() {
    history.push(`/gerir_demanda/${demand.id}`);
  }

  async function demandFinish() {
    await finishDemand(demand.id, acceptedProposal)
      .then((response) => {
        if (response) {
          setFinished(true);
          setOpenFinishAlert(false);
        }
      })
      .catch((err) => {});
  }

  function openFile(e) {
    e.preventDefault();
    var blob = base64toBlob(filePdf);
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, "pdfBase64.pdf");
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  }

  return (
    <Page className={classes.root} title="Detalhes da Demanada" ref={ref}>
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
                {demand === undefined || demand.title === ""
                  ? "Não há título"
                  : demand.title}
              </Typography>

              {isLibered && (
                <Button
                  variant="contained"
                  className={classes.createProposal}
                  onClick={() => {
                    setOpenCreateModal(true);
                  }}
                >
                  Criar proposta de solução
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        classes={{
          indicator: classes.tabsIndicator,
        }}
        className={classes.tabsText}
        variant="fullWidth"
      >
        <Tab label="Dados" {...a11yProps(0)} />
        <Tab label="Propostas Submetidas" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {error ? (
          <MessageAlert
            error={true}
            title="Error no carregamento dos dados!"
            onCancel={handleError}
            buttons={
              <div>
                <Button
                  variant="contained"
                  classes={{ root: classes.buttonGerir }}
                  onClick={handleError}
                >
                  OK
                </Button>
              </div>
            }
          />
        ) : (
            <Container
              maxWidth={false}
              classes={{ root: classes.rootContainer }}
              className={classes.card}
            >
              {openModal && (
                <MessageAlert
                  warning={true}
                  title="Tem certeza que deseja SUBMETER esta demanda?"
                  message="Confirma?"
                  onCancel={handleCloseModal}
                  buttons={
                    <>
                      <Box className={classes.buttonGroup}>
                        <Button
                          variant="contained"
                          className={classes.buttonGerir}
                          onClick={handleSubmitDemand}
                        >
                          Sim
                      </Button>
                        <Button
                          variant="contained"
                          className={classes.buttonDeletar}
                          onClick={handleCloseModal}
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
                  success={true}
                  title="Sua demanda foi Submetida com sucesso!"
                  onCancel={handleOkMessageDeleted}
                  buttons={
                    <div>
                      <Button
                        variant="contained"
                        className={classes.buttonGerir}
                        onClick={handleOkMessageDeleted}
                      >
                        Ok
                    </Button>
                    </div>
                  }
                />
              )}
              {canceled && (
                <MessageAlert
                  success={true}
                  title="Sua demanda foi CANCELADA com sucesso!"
                  onCancel={handleOkMessageDeleted}
                  buttons={
                    <div>
                      <Button
                        variant="contained"
                        className={classes.buttonGerir}
                        onClick={() => history.go(0)}
                      >
                        Ok
                    </Button>
                    </div>
                  }
                />
              )}
              {cancelModal && (
                <MessageAlert
                  warning={true}
                  title="Tem certeza que deseja CANCELAR esta demanda?"
                  onCancel={handleCloseModal}
                  message="Confirma?"
                  buttons={
                    <>
                      <Button
                        variant="contained"
                        className={classes.buttonGerir}
                        onClick={handleCancelDemand}
                      >
                        Sim
                    </Button>
                      <Button
                        variant="contained"
                        className={classes.buttonDeletar}
                        onClick={() => {
                          handleCloseCancelModal();
                          handleOpenOrCloseCancelModal(true);
                        }}
                      >
                        Não
                    </Button>
                    </>
                  }
                />
              )}
              {unSubmitModal && (
                <MessageAlert
                  warning
                  title="Tem certeza que deseja retornar o status desta demanda para 'EM EDIÇÃO' ?"
                  onCancel={() => {
                    handleOpenOrCloseUnSubmitModal(false);
                  }}
                  message="Confirma?"
                  buttons={
                    <>
                      <Button
                        variant="contained"
                        className={classes.buttonGerir}
                        onClick={() => {
                          handleUnSubmitDemand();
                          handleOpenOrCloseUnSubmitModal(false);
                        }}
                      >
                        Sim
                    </Button>
                      <Button
                        variant="contained"
                        className={classes.buttonDeletar}
                        onClick={() => {
                          handleOpenOrCloseUnSubmitModal(false);
                        }}
                      >
                        Não
                    </Button>
                    </>
                  }
                />
              )}

              {unSubmited && (
                <MessageAlert
                  success
                  title="Demanda voltou para o Status 'EM EDIÇÃO' com sucesso!"
                  onCancel={() => {
                    history.go(0);
                  }}
                  buttons={
                    <>
                      <Button
                        variant="contained"
                        className={classes.buttonGerir}
                        onClick={() => history.go(0)}
                      >
                        Ok
                    </Button>
                    </>
                  }
                />
              )}

              {openFinishAlert && (
                <MessageAlert
                  success
                  title="Tem certeza que deseja fechar a demanda?"
                  message="Confirma?"
                  onCancel={() => {
                    setOpenFinishAlert(false);
                  }}
                  buttons={
                    <>
                      <Button
                        variant="contained"
                        className={classes.buttonGerir}
                        onClick={() => {
                          demandFinish(demand.id, acceptedProposal);
                        }}
                      >
                        Sim
                    </Button>
                      <Button
                        variant="contained"
                        className={classes.buttonDeletar}
                        onClick={() => {
                          setOpenFinishAlert(false);
                          setOpenFinishModal(true);
                        }}
                      >
                        Não
                    </Button>
                    </>
                  }
                />
              )}

              {finished && (
                <MessageAlert
                  success
                  title="Sua demanda foi Fechada com sucesso!"
                  onCancel={() => {
                    history.go(0);
                  }}
                  buttons={
                    <div>
                      <Button
                        variant="contained"
                        className={classes.buttonGerir}
                        onClick={() => {
                          history.go(0);
                        }}
                      >
                        Ok
                    </Button>
                    </div>
                  }
                />
              )}

              <StyledModal open={openFinishModal}>
                <Card square className={classes.styledCard2}>
                  <CardHeader
                    className={classes.header}
                    title="Clique em uma proposta para selecionar"
                  />
                  <CardContent>
                    <TableContainer className={classes.overflow2}>
                      <Table className={classes.ttContainer}>
                        <TableBody>
                          {demand.solution_proposals.map((proposal) => (
                            <TableRow
                              key={proposal.id}
                              hover
                              className={classes.tableRow2}
                              onClick={() => {
                                setAcceptedProposal(proposal.id);
                                setOpenFinishModal(false);
                                setOpenFinishAlert(true);
                              }}
                            >
                              <TableCell>
                                <div className={classes.tableContainer}>
                                  <div className={classes.userAvatar}>
                                    <Avatar
                                      className={classes.avatar}
                                      src={proposal.creator.photo_url}
                                    />
                                    <div className={classes.user}>
                                      <Typography variant="subtitle2">
                                        {proposal.creator.name}
                                      </Typography>
                                      <Typography color="textSecondary">
                                        Autor
                                    </Typography>
                                    </div>
                                  </div>
                                  <div className={classes.dontOverflowContainer}>
                                    <TextField
                                      className={classes.dontOverflow}
                                      multiline
                                      fullWidth
                                      readOnly
                                      disabled
                                      maxLength="1000"
                                      value={
                                        proposal.description.length > 1000
                                          ? `${proposal.description}...`
                                          : `${proposal.description}`
                                      }
                                      InputProps={{
                                        classes: {
                                          input: classes.dontOverflow,
                                        },
                                        disableUnderline: true,
                                      }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                  <div className={classes.buttonGroup2}>
                    <Button
                      className={classes.buttonGerir2}
                      variant="contained"
                      onClick={() => setOpenFinishModal(false)}
                    >
                      Fechar
                  </Button>
                  </div>
                </Card>
              </StyledModal>

              <div className={classes.body}>
                {/* <Grid container spacing={1}> */}
                <Grid className={classes.grid} item xs={12} sm={8}>
                  <Card square elevalion={0} variant="outlined">
                    <CardHeader
                      title="Dados gerais"
                      className={classes.header}
                      action={
                        <>
                          {liberedUser && (
                            <>
                              <ToolTip position="top" title={toolTipMessage.edit}>
                                <span>
                                  <IconButton
                                    style={
                                      demand.demand_status.description !==
                                        "Em Edição"
                                        ? { color: "gray" }
                                        : { color: "#f5f5f5" }
                                    }
                                    onClick={
                                      demand.demand_status.description !==
                                        "Em Edição"
                                        ? () => { }
                                        : handleGoToUpdate
                                    }
                                    disabled={
                                      demand.demand_status.description !==
                                        "Em Edição"
                                        ? true
                                        : false
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </span>
                              </ToolTip>

                              <ToolTip
                                position="top"
                                title={toolTipMessage.submit}
                              >
                                <span>
                                  <IconButton
                                    variant="contained"
                                    style={
                                      demand.demand_status.description ===
                                        "Em Edição"
                                        ? { color: "#f5f5f5" }
                                        : { color: "gray" }
                                    }
                                    onClick={handleOpenModal}
                                    disabled={
                                      demand.demand_status.description ===
                                        "Em Edição"
                                        ? false
                                        : true
                                    }
                                  >
                                    <SendIcon />
                                  </IconButton>
                                </span>
                              </ToolTip>
                            </>
                          )}

                          {isAdmin && (
                            <>
                              <ToolTip
                                position="top"
                                title={toolTipMessage.unSubmit}
                              >
                                <span>
                                  <IconButton
                                    variant="contained"
                                    style={
                                      demand.demand_status.description ===
                                        "Submetida"
                                        ? { color: "#f5f5f5" }
                                        : { color: "gray" }
                                    }
                                    onClick={() =>
                                      handleOpenOrCloseUnSubmitModal(true)
                                    }
                                    disabled={
                                      demand.demand_status.description ===
                                        "Submetida"
                                        ? false
                                        : true
                                    }
                                  >
                                    <SettingsBackupRestoreIcon />
                                  </IconButton>
                                </span>
                              </ToolTip>

                              <ToolTip
                                position="top"
                                title={toolTipMessage.release}
                              >
                                <span>
                                  <IconButton
                                    variant="contained"
                                    style={
                                      demand.demand_status.description ===
                                        "Submetida"
                                        ? { color: "#f5f5f5" }
                                        : { color: "gray" }
                                    }
                                    onClick={handleGoToManageDemand}
                                    disabled={
                                      demand.demand_status.description ===
                                        "Submetida"
                                        ? false
                                        : true
                                    }
                                  >
                                    <LockOpenIcon />
                                  </IconButton>
                                </span>
                              </ToolTip>

                              <ToolTip
                                position="top"
                                title={toolTipMessage.finish}
                              >
                                <span>
                                  <IconButton
                                    variant="contained"
                                    style={
                                      demand.demand_status.description ===
                                        "Liberada" &&
                                        compareAsc(
                                          dateNow,
                                          final_submission_date
                                        ) === 1
                                        ? { color: "#f5f5f5" }
                                        : { color: "gray" }
                                    }
                                    onClick={handleOpenFinishModal}
                                    disabled={
                                      demand.demand_status.description ===
                                        "Liberada" &&
                                        compareAsc(
                                          dateNow,
                                          final_submission_date
                                        ) === 1
                                        ? false
                                        : true
                                    }
                                  >
                                    <LockIcon />
                                  </IconButton>
                                </span>
                              </ToolTip>
                            </>
                          )}

                          {liberedUser && isAdmin === false && (
                            <ToolTip position="top" title={toolTipMessage.cancel}>
                              <span>
                                <IconButton
                                  variant="contained"
                                  style={
                                    demand.demand_status.description ===
                                      "Em Edição"
                                      ? { color: "#f5f5f5" }
                                      : { color: "gray" }
                                  }
                                  onClick={() =>
                                    handleOpenOrCloseCancelModal(true)
                                  }
                                  disabled={
                                    demand.demand_status.description !==
                                      "Em Edição"
                                      ? true
                                      : false
                                  }
                                >
                                  <CancelIcon />
                                </IconButton>
                              </span>
                            </ToolTip>
                          )}

                          {isAdmin && (
                            <ToolTip position="top" title={toolTipMessage.cancel}>
                              <span>
                                <IconButton
                                  variant="contained"
                                  style={
                                    cancelVerification === false
                                      ? { color: "#f5f5f5" }
                                      : { color: "gray" }
                                  }
                                  onClick={() =>
                                    handleOpenOrCloseCancelModal(true)
                                  }
                                  disabled={
                                    cancelVerification === false ? false : true
                                  }
                                >
                                  <CancelIcon />
                                </IconButton>
                              </span>
                            </ToolTip>
                          )}

                          {demand.observation && (
                            <ToolTip position="top" title={demand.observation}>
                              <span>
                                <IconButton
                                  variant="contained"
                                  style={{ color: "#f5f5f5" }}
                                  disabled
                                >
                                  <HelpIcon />
                                </IconButton>
                              </span>
                            </ToolTip>
                          )}
                        </>
                      }
                    />

                    <CardContent>
                      <div className={classes.titleDemand}>
                        <div className={classes.userAvatar}>
                          <Avatar
                            className={classes.avatar}
                            src={
                              demand.user === undefined ||
                                demand.user.photo_url === null
                                ? staticImg
                                : demand.user.photo_url
                            }
                          />
                          <div className={classes.user}>
                            <p className={classes.userName}>
                              {demand.user !== undefined ||
                                demand.user.name !== ""
                                ? demand.user.name
                                : "Usuário"}
                            </p>
                            <p className={classes.userTitleDemand}>
                              {demand.title}
                            </p>
                          </div>
                        </div>
                        <p className={classes.demandCreation}>
                          {`Data de criação: ${formatDate(demand.creation_date)}`}
                        </p>
                      </div>
                      <div className={classes.descriptionDemand}>
                        <p className={classes.descriptionDemand_p}>
                          {demand.description !== ""
                            ? demand.description
                            : "Não há descrição para esta demanda."}
                        </p>
                      </div>
                      <div className={classes.infoAdd}>
                        <div className={classes.elemntInfo}>
                          <p>
                            <strong>Data da Submissão</strong>
                          </p>
                          <p>
                            Início:{" "}
                            {demand.initial_submission_date
                              ? formatDate(demand.initial_submission_date)
                              : "Data não fornecida"}
                          </p>
                          <p>
                            Final:{" "}
                            {demand.final_submission_date
                              ? formatDate(demand.final_submission_date)
                              : "Data não fornecida"}
                          </p>
                        </div>
                        <div className={classes.elemntInfo}>
                          <p>
                            <strong>Tipo</strong>
                          </p>
                          <p>
                            {demand.demand_type.description !== ""
                              ? demand.demand_type.description
                              : "Não foi especificado o tipo da demanda."}
                          </p>
                        </div>
                        <div className={classes.elemntInfo}>
                          <p>
                            <strong>Alcance</strong>
                          </p>
                          <p>
                            {demand.demand_scope.description !== ""
                              ? demand.demand_scope.description
                              : "Não foi especificado o escopo da demanda."}
                          </p>
                        </div>
                        <div className={classes.elemntInfoStatus}>
                          <p>
                            <strong>Status</strong>
                          </p>
                          {demand.demand_status.description ? (
                            <ChipLabel
                              description={demand.demand_status.description}
                            />
                          ) : (
                              <p>Não foi especificado o status da demanda.</p>
                            )}
                        </div>

                        {isAdmin && (
                          <>
                            <div className={classes.elemntInfo}>
                              <p>
                                <strong>Visibilidade</strong>
                              </p>
                              <p className={classes.descriptionDemand_p}>
                                {demand.demand_visibility.description !== ""
                                  ? demand.demand_visibility.description
                                  : "Não há visibilidade para esta demanda."}
                              </p>
                            </div>
                            <div className={classes.elemntInfo}>
                              <p>
                                <strong>Visibilidade das Propostas</strong>
                              </p>
                              <p className={classes.descriptionDemand_p}>
                                {demand.proposal_visibility.description !== ""
                                  ? demand.proposal_visibility.description
                                  : "Não há visibilidade para as propostas de solução."}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <div className={classes.otherTopics}>
                        <Expansible
                          expanded={expanded === "1"}
                          handleChange={handleChange("1")}
                          controls="panel1d-content"
                          id="panel1d-header"
                          title="Problema"
                          text={
                            demand.problem === ""
                              ? "O usuário não descreveu o problema."
                              : demand.problem
                          }
                          rootTypografy={classes.rootTypografy}
                        />
                        <Expansible
                          expanded={expanded === "2"}
                          handleChange={handleChange("2")}
                          controls="panel2d-content"
                          id="panel2d-header"
                          title="Critérios de Solução"
                          text={
                            demand.solutions_criteria === ""
                              ? "Não foram especificados critérios de solução."
                              : demand.solutions_criteria
                          }
                          rootTypografy={classes.rootTypografy}
                        />
                        <Expansible
                          expanded={expanded === "3"}
                          handleChange={handleChange("3")}
                          controls="panel3d-content"
                          id="panel3d-header"
                          title="Recursos Disponíveis"
                          text={
                            demand.available_resources === ""
                              ? "Não foram especificados recursos disponíveis."
                              : demand.available_resources
                          }
                          rootTypografy={classes.rootTypografy}
                        />
                        <Expansible
                          expanded={expanded === "4"}
                          handleChange={handleChange("4")}
                          controls="panel4d-content"
                          id="panel4d-header"
                          title="Palavras-Chave"
                          text={
                            demand.keywords.length === 0
                              ? "Não foram especificadas palavras-chave."
                              : demand.keywords.map((key) => key.word).join(", ")
                          }
                          rootTypografy={classes.rootTypografy}
                        />
                        <Expansible
                          expanded={expanded === "5"}
                          handleChange={handleChange("5")}
                          controls="panel4d-content"
                          id="panel4d-header"
                          title="Anexo"
                          text={
                            (filePdf === null || filePdf=== "" )
                              ? "Não existe anexo."
                              : <Button
                                onClick={e => openFile(e)}
                                variant="contained"
                                component="label"
                              >
                                Abrir Anexo
                              </Button>
                          }
                          rootTypografy={classes.rootTypografy}
                        />
                      </div>
                      <CommentElement
                        stateComment={stateComment}
                        value={comment}
                        handleChangeComment={handleChangeComment}
                        clickComment={clickComment}
                        list={demand.comments}
                        staticImg={staticImg}
                        changeLikeComment={changeLikeComment}
                        formatDate={formatDate}
                        changeLike={changeLike}
                        has_liked={demand.has_liked}
                        like_count={demand.like_count}
                        changeComment={changeComment}
                        comments={demand.comment_count}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CardList title="Autor" user={demand.user} />
                  <div className={classes.space} />
                  {(isAdmin || isAssociate) &&
                    demand.demand_visibility.description === "Restrita" && (
                      <CardList title="Associados" data={demand.associates} />
                    )}
                  <div className={classes.space} />
                  {demand.demand_status.description === "Fechada" && (
                    <CardList
                      title="Proposta selecionada"
                      data={demand.chosen_proposal.proponents}
                      proposal={demand.chosen_proposal.description}
                      proposalID={demand.chosen_proposal.id}
                    />
                  )}
                </Grid>
                {/* </Grid> */}
              </div>
            </Container>
          )}
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        {demand.solution_proposals.length === 0 ? (
          <div className={classes.message}>
            <Information
              severity="info"
              title="Informação"
              message="Não existem propostas para esta demanda."
            />
          </div>
        ) : (
          <Container maxWidth={false} classes={{ root: classes.rootContainer }}>
            <Card className={classes.card} variant="outlined">
              <CardHeader title="Propostas" className={classes.cardHeader2} />
              <CardContent>
                <TableContainer className={classes.overflow}>
                  <Table>
                    <TableBody>
                      {demand.solution_proposals.map((proposal) => (
                        <TableRow
                          key={proposal.id}
                          hover
                          className={classes.tableRow}
                          onClick={() => {
                            goToDetailProposal(proposal.id);
                          }}
                        >
                          <TableCell>
                            <div className={classes.tableContainer}>
                              <div className={classes.userAvatar}>
                                <Avatar
                                  className={classes.avatar}
                                  src={proposal.creator.photo_url}
                                />
                                <div className={classes.user}>
                                  <Typography variant="subtitle2">
                                    {proposal.creator.name}
                                  </Typography>
                                  <Typography color="textSecondary">
                                    Autor
                                  </Typography>
                                  </div>
                                </div>
                                <div className={classes.dontOverflowContainer}>
                                  <TextField
                                    className={classes.dontOverflow}
                                    multiline
                                    fullWidth
                                    readOnly
                                    disabled
                                    maxLength="1000"
                                    value={
                                      proposal.description.length > 1000
                                        ? `${proposal.description}...`
                                        : `${proposal.description}`
                                    }
                                    InputProps={{
                                      classes: {
                                        input: classes.dontOverflow,
                                      },
                                      disableUnderline: true,
                                    }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Container>
          )}
      </TabPanel>

      <StyledModal open={openCreateModal}>
        <RegisterOrUpdateSolution
          type="create"
          demand_id={demand.id}
          demandTitle={demand.title}
          onClose={closeModal}
          updated={toggleUpdated}
        />
      </StyledModal>
      <StyledModal open={openCancelModal}>
        <Card square className={classes.styledCard}>
          <CardHeader
            className={classes.header}
            title="Por favor, sinalize o motivo do cancelamento!"
          />
          <CardContent>
            <Formsy autoComplete="off" onValid={() => { }} onInvalid={() => { }}>
              <InputText
                fullWidth
                label="Motivo de cancelamento"
                name="cancelTitle"
                variant="outlined"
                placeholder="Digite aqui o motivo do cancelamento desta demanda."
                multiline
                rows={4}
                value={cancelationText}
                required
                handleChange={handleChangeCancelationText}
                validations={{
                  minLength: 2,
                }}
                validationErrors={{
                  minLength: "Por favor, preencha este campo corretamente",
                }}
              />
            </Formsy>
          </CardContent>
          <div className={classes.buttonGroup2}>
            <Button
              variant="contained"
              className={classes.buttonGerir}
              onClick={() => {
                handleOpenCancelModal();
                handleOpenOrCloseCancelModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              className={classes.buttonGerir2}
              variant="contained"
              onClick={() => handleOpenOrCloseCancelModal(false)}
            >
              Voltar
            </Button>
          </div>
        </Card>
      </StyledModal>
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
      <Footer />
    </Page>
  );
}

export default DetailDemand;

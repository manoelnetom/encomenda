import React, { createRef, useState, useEffect, useContext } from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Formsy from "formsy-react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import InputText from "../../components/formsy/InputText";
import useStyles from "./styles";
import history from "../../history";
import Select from "../../components/formsy/Select";
import RadioButton from "../../components/formsy/RadioButton";
import Page from "../../components/Page";
import MessageAlert from "../../components/MessageAlert";
import { Context } from "../../contexts/authContext/AuthContext";
import ToolTip from "../../components/ToolTip/index";
import Footer from "../../components/Footer/index";
import demandService from '../../service/demandService';
import { green, red } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
/*
Página referente ao registro das demandas.
*/

/*
Por enquanto está local os itens que serão colocados na seleção do escopo.
Refatorar para pegar da requisição.
*/
const itensSelect = [
  { id: 1, description: "Alcance Interno" },
  { id: 2, description: "Regional" },
  { id: 3, description: "Nacional" },
  { id: 4, description: "Internacional" },
];

// campos da demanda. COMPARAR COM OS ENDPOINTS DO BACK
const valuesInitial = {
  title: "",
  description: "",
  problem: "",
  solutions_criteria: "",
  scope: "Alcance Interno",
  available_resources: "",
  initial_submission_date: "",
  final_submission_date: "",
  keywords: [],
  type: "",
  pdf_base64: null
};

//componente que irá anexar arquivo
function UploadFile(props) {
  return (
    <Grid className={props.rootGrid} item md={12} xs={12}>
      <div className={props.divFile}>
        <Button
          className={props.buttonFile}
          variant="contained"
          component="label"
        >
          Anexar Arquivo
          <input
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => props.getFile(e)}
          />
        </Button>
        {(!props.statusPdf && props.filePdf) &&
          <div className={props.divCheckFile}>
            <Typography className={props.typografyFile}>{props.nameFile}</Typography>
            <CheckCircleIcon style={{ color: green[500] }} />
            <IconButton onClick={props.removeFile}>
              <DeleteIcon />
            </IconButton>
          </div>
        }
        {props.statusPdf &&
          <ErrorIcon style={{ color: red[500] }} />}
      </div>
      {props.statusPdf &&
        <span className={props.spanErrorFile}>
          Tamanho máximo do arquivo é 5mb
                        </span>}
    </Grid>
  )

}

function RegisterOrUpdateDemand() {
  const ref = createRef();
  const classes = useStyles();

  const { type, id } = useParams();
  const { user } = useContext(Context);
  // Estado do botão de salvar dados
  const [buttonValue, setButtonValue] = useState(true);
  // Variável que guarda os dados do formulario
  const [demand, setDemand] = useState(valuesInitial);
  // Variável que armazena o value do componente.
  const [radioButon, setRadioButton] = useState("");
  // variável para guardar o estado do dialog
  const [open, setOpen] = useState(false);
  // variável para tratar erro da data no calendário
  // Estado que armazena as keywords de uma demanda
  const [demandKeywords, setDemandKeywords] = useState([]);
  // Estado para armazenar nova keyword na demanda
  const [newKeyword, setNewKeyWord] = useState("");
  //teste para a variavel de pdf
  const [filePdf, setFilePdf] = useState(null);
  //status tamanho filePdf
  const [statusPdf, setStatusPdf] = useState(false);
  const [nameFile, setNameFile] = useState('');

  // Estado de msg de error no servidor
  const [error, setError] = useState(false);
  const [newDemandId, setNewDemandId] = useState("");
  const fieldStatus =
    demand.status === "Liberada" ||
    demand.status === "Fechada" ||
    demand.status === "Cancelada" ||
    demand.status === "Submetida";


  const { stateTokenDemmand,
    handleMessageAlert,
    getDemandById,
    createDemand,
    updateDemmand, getFilePdf } = demandService();

  useEffect(() => {
    async function getDemand() {
      let proponenti = false;
      let creator = false;
      const response = await getDemandById(id).catch(() =>
        history.push("/home")
      );

      const responseFile = await getFilePdf(id);

      if (response) {
        console.log(response.data)
        if (response.status === 200) {
          setDemand({
            title: response.data.title,
            description: response.data.description,
            problem: response.data.problem,
            final_submission_date: response.data.final_submission_date,
            initial_submission_date: response.data.initial_submission_date,
            solutions_criteria: response.data.solutions_criteria,
            type: response.data.demand_type.description,
            scope: response.data.demand_scope.description,
            visibility: response.data.demand_visibility.description,
            associates: response.data.associates,
            proponents: response.data.proponents,
            available_resources: response.data.available_resources,
            keywords: response.data.keywords,
            proposal_visibility: response.data.proposal_visibility.description,
            status: response.data.demand_status.description,
          });

          setDemandKeywords(response.data.keywords);
          setRadioButton(response.data.demand_type.description);
          if(type === "update"){
            setNameFile('document.pdf');
            setStatusPdf(false);
            setFilePdf(responseFile.data.pdf_base64);
          }else{
            setNameFile('');
            setFilePdf(null);
            setStatusPdf(false);
          }
          if (user && response) {
            response.data.proponents.forEach((proponent) => {
              if (proponent.username === user.username) proponenti = true;
            });
            if (response.data.user.username === user.username) {
              creator = true;
            }
          }

          if (creator === false) {
            if (proponenti === false) {
              history.push("/*");
            }
          }
        }
      }
    }

    if (id && type === "update") {
      getDemand();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type]);

  function handleFormChange(event) {
    setDemand({
      ...demand,
      [event.target.name]: event.target.value,
    });
  }

  // método para mudar o radiobutton
  function handleRadioChange(event) {
    setRadioButton(event.target.value);
    setDemand({
      ...demand,
      type: event.target.value,
    });
  }

  // método que fecha o modal
  function hangleClose() {
    setOpen(false);
    handleBack();
  }

  // método que fecha o modal de error
  function handleCloseError() {
    setError(false);
  }

  function enableButton() {
    setButtonValue(false);
  }

  function disableButton() {
    setButtonValue(true);
  }

  // Adiciona uma palavra-chave a demanda
  function handleAddKeyword() {
    const demandKeywordsCopy = demandKeywords.slice();
    const newKey = { word: newKeyword };

    demandKeywordsCopy.push(newKey);
    setDemandKeywords(demandKeywordsCopy);
    setNewKeyWord("");
  }

  // Retirar keyword da demanda
  function handleDeleteKeyword(index) {
    const demandKeywordsCopy = demandKeywords.slice();
    const newDemandKeywords = demandKeywordsCopy.filter(
      (key) => demandKeywordsCopy.indexOf(key) !== index
    );
    setDemandKeywords(newDemandKeywords);
  }

  // Altera o estado da nova palavra-chave
  function handleNewKeyword(e) {
    setNewKeyWord(e.target.value);
  }

  // função que envia os dados para cadastro
  async function handleSubmit(status) {
    const data = {
      title: demand.title,
      description: demand.description,
      problem: demand.problem,
      solutions_criteria: demand.solutions_criteria,
      available_resources: demand.available_resources,
      status: status,
      keywords: demandKeywords,
      scope:demand.scope,
      type: demand.type,
      pdf_base64: filePdf
    };

    if (type === "create") {
      setButtonValue(false);

      const response = await createDemand(JSON.stringify(data));

      if (response !== undefined) {
        if (response.status === 200) {
          setNewDemandId(response.data.id);
          setOpen(true);
          setError(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    }
    if (type === "update") {

      await updateDemmand(id, data).then((response) => {
        if (response !== undefined) {
          if (response.status === 200) {
            setOpen(true);
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      });
    }
  }

  // Função referente ao botão de volta para a tela de busca de demandas
  function handleBack() {
    let location = "";
    if (type === "create") location = "/search_demandas";
    if (type === "update") location = `/detalhar_demandas/${id}`;
    history.push(location);
  }

  function getFile(e) {
    var files = e.target.files[0];
    if (files.size > 5120000) {
      setStatusPdf(true);
    } else {
      setNameFile(files.name);
      setStatusPdf(false);
      var reader = new FileReader();
      reader.readAsDataURL(files)
      reader.onload = (e) => {
        if (e.target.result !== "")
          setFilePdf(e.target.result);
      }
    }
  }

  function removeFile(e) {
    e.preventDefault();
    setFilePdf("");
  }

  return (
    <Page
      className={classes.root}
      title={type === "create" ? "Registrar Demanda" : "Atualizar Demanda"}
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
                {type === "create" ? "Registrar Demanda" : "Atualizar Demanda"}
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
            title={
              type === "create"
                ? "Demanda Cadastrada com Sucesso!"
                : "Demanda Atualizada com Sucesso!"
            }
            onCancel={hangleClose}
            buttons={
              <Button
                variant="contained"
                classes={{ root: classes.button }}
                onClick={() =>
                  type === "create"
                    ? history.push(`/detalhar_demandas/${newDemandId}`)
                    : history.push(`/detalhar_demandas/${id}`)
                }
              >
                OK
              </Button>
            }
          />
        )}
        {error && (
          <MessageAlert
            error
            title="Erro no Cadastro da Demanda!!"
            onCancel={handleCloseError}
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
            <Formsy
              autoComplete="off"
              onSubmit={handleSubmit}
              onValid={enableButton}
              onInvalid={disableButton}
            >
              <Grid container style={{ paddingTop: 8 }} spacing={3}>
                {type === "create" ? (
                  <>
                    <Grid item md={12} xs={12}>
                      <InputText
                        fullWidth
                        label="Título"
                        name="title"
                        variant="outlined"
                        value={demand.title}
                        setValue={setDemand}
                        required
                        handleChange={handleFormChange}
                        validations={{
                          minLength: 2,
                        }}
                        validationErrors={{
                          minLength:
                            "Por favor, preencha este campo corretamente",
                        }}
                        disabled={fieldStatus}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <InputText
                        fullWidth
                        label="Descrição"
                        name="description"
                        type="textarea"
                        variant="outlined"
                        value={demand.description}
                        handleChange={handleFormChange}
                        required
                        validations={{
                          minLength: 2,
                          maxLength: 1000,
                        }}
                        validationErrors={{
                          minLength:
                            "Precisa inserir uma descrição para a nova demanda!",
                          maxLength:
                            "Não é possivel inserir mais que 1000 caracteres!",
                        }}
                        multiline
                        rows={3}
                        rowsMax={15}
                        disabled={fieldStatus}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <InputText
                        fullWidth
                        label="Problema"
                        name="problem"
                        type="textarea"
                        variant="outlined"
                        value={demand.problem}
                        handleChange={handleFormChange}
                        required
                        validations={{
                          minLength: 2,
                          maxLength: 250,
                        }}
                        validationErrors={{
                          minLength:
                            "Precisa inserir uma descrição para a nova demanda.",
                          maxLength:
                            "Não é possivel inserir mais que 250 caracteres.",
                        }}
                        multiline
                        rows={3}
                        rowsMax={15}
                        disabled={fieldStatus}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <InputText
                        fullWidth
                        label="Critérios de Solução"
                        name="solutions_criteria"
                        type="textarea"
                        variant="outlined"
                        value={demand.solutions_criteria}
                        handleChange={handleFormChange}
                        multiline
                        rows={3}
                        rowsMax={15}
                        disabled={fieldStatus}
                      />
                    </Grid>
                    <ToolTip
                      title="Defina a distância máxima que sua demanda irá chegar!"
                      position="top"
                    >
                      <Grid
                        className={classes.gridSelCalendItem}
                        // style={{ marginTop: "0.5rem" }}
                        xs={12}
                        md={12}
                        item
                      >
                        <Select
                          name="scope"
                          label="Alcance"
                          value={demand.scope}
                          itens={itensSelect}
                          required
                          onChange={handleFormChange}
                          validations={{
                            minLength: 2,
                          }}
                          validationErrors={{
                            minLength: "Por favor, selecione um dos escopes.",
                          }}
                          disabled={fieldStatus}
                        />

                        {/* <br /> */}
                      </Grid>
                    </ToolTip>
                    <Grid item md={12} xs={12}>
                      <InputText
                        fullWidth
                        label="Recursos Disponíveis"
                        name="available_resources"
                        type="textarea"
                        variant="outlined"
                        value={demand.available_resources}
                        handleChange={handleFormChange}
                        multiline
                        rows={3}
                        rowsMax={15}
                        disabled={fieldStatus}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <div className={classes.chipInput}>
                        <InputText
                          fullWidth
                          variant="outlined"
                          name="keywords"
                          label="Palavras Chaves"
                          value={newKeyword}
                          validations={{
                            minLength: 2,
                          }}
                          handleChange={(event) => {
                            handleNewKeyword(event);
                          }}
                          disabled={fieldStatus}
                        />
                        <IconButton
                          className={classes.icon}
                          onClick={handleAddKeyword}
                          disabled={fieldStatus}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <Box>
                        {demandKeywords.map((words) => (
                          <Chip
                            key={demandKeywords.indexOf(words)}
                            onDelete={() => {
                              handleDeleteKeyword(
                                demandKeywords.indexOf(words)
                              );
                            }}
                            label={words.word}
                            className={classes.chip}
                            color="primary"
                            classes={{
                              deleteIcon: classes.icon,
                            }}
                            disabled={fieldStatus}
                          />
                        ))}
                      </Box>
                    </Grid>
                    <Grid container justify="flex-start">
                      <RadioButton
                        name="type"
                        classe={classes.formControl}
                        label="Selecione o tipo da demanda *"
                        value={radioButon}
                        required
                        onChange={handleRadioChange}
                        validations={{
                          minLength: radioButon.length === 0,
                        }}
                        validationErrors={{
                          minLength: "Por favor, marque uma das opções.",
                        }}
                        disabled={fieldStatus}
                      >
                        <ToolTip
                          title="Necessidades que o mercado não sabe que tem, observada por nossos pesquisadores"
                          position="right"
                        >
                          <FormControlLabel
                            value="Impulso Tecnológico"
                            control={<Radio />}
                            label="Impulso Tecnológico"
                            disabled={fieldStatus}
                          />
                        </ToolTip>

                        <ToolTip
                          title="Necessidades que o mercado clama por uma solução"
                          position="right"
                        >
                          <FormControlLabel
                            value="Pressão de Mercado"
                            control={<Radio />}
                            label="Pressão de Mercado"
                            disabled={fieldStatus}
                          />
                        </ToolTip>
                        <FormControlLabel
                          value="Outro"
                          control={<Radio />}
                          label="Outro"
                          disabled={fieldStatus}
                        />
                      </RadioButton>
                    </Grid>
                    <UploadFile
                      rootGrid={classes.rootGrid}
                      divFile={classes.divFile}
                      buttonFile={classes.buttonFile}
                      getFile={getFile}
                      statusPdf={statusPdf}
                      filePdf={filePdf}
                      divCheckFile={classes.divCheckFile}
                      typografyFile={classes.typografyFile}
                      nameFile={nameFile}
                      removeFile={removeFile}
                    />
                  </>
                ) : (
                    <>
                      <Grid item md={12} xs={12}>
                        <InputText
                          fullWidth
                          label="Título"
                          name="title"
                          variant="outlined"
                          value={demand.title}
                          setValue={setDemand}
                          required
                          handleChange={handleFormChange}
                          validations={{
                            minLength: 2,
                          }}
                          validationErrors={{
                            minLength:
                              "Por favor, preencha este campo corretamente",
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <InputText
                          fullWidth
                          label="Descrição"
                          name="description"
                          type="textarea"
                          variant="outlined"
                          value={demand.description}
                          handleChange={handleFormChange}
                          required
                          validations={{
                            minLength: 2,
                            maxLength: 1000,
                          }}
                          validationErrors={{
                            minLength:
                              "Precisa inserir uma descrição para a nova demanda!",
                            maxLength:
                              "Não é possivel inserir mais que 1000 caracteres!",
                          }}
                          multiline
                          rows={3}
                          rowsMax={15}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <InputText
                          fullWidth
                          label="Problema"
                          name="problem"
                          type="textarea"
                          variant="outlined"
                          value={demand.problem}
                          handleChange={handleFormChange}
                          required
                          validations={{
                            minLength: 2,
                            maxLength: 250,
                          }}
                          validationErrors={{
                            minLength:
                              "Precisa inserir uma descrição para a nova demanda.",
                            maxLength:
                              "Não é possivel inserir mais que 250 caracteres.",
                          }}
                          multiline
                          rows={3}
                          rowsMax={15}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <InputText
                          fullWidth
                          label="Critérios de Solução"
                          name="solutions_criteria"
                          type="textarea"
                          variant="outlined"
                          value={demand.solutions_criteria}
                          handleChange={handleFormChange}
                          multiline
                          rows={3}
                          rowsMax={15}
                        />
                      </Grid>
                      <ToolTip
                        title="Defina a distância máxima que sua demanda irá chegar!"
                        position="top"
                      >
                        <Grid
                          className={classes.gridSelCalendItem}
                          style={{ marginTop: "0.5rem" }}
                          sm={12}
                          md={12}
                          item
                        >
                          <Select
                            name="scope"
                            label="Alcance"
                            value={demand.scope}
                            itens={itensSelect}
                            required
                            onChange={handleFormChange}
                            validations={{
                              minLength: 2,
                            }}
                            validationErrors={{
                              minLength: "Por favor, selecione um dos escopes.",
                            }}
                          />

                          <br />
                        </Grid>
                      </ToolTip>
                      <Grid item md={12} xs={12}>
                        <InputText
                          fullWidth
                          label="Recursos Disponíveis"
                          name="available_resources"
                          type="textarea"
                          variant="outlined"
                          value={demand.available_resources}
                          handleChange={handleFormChange}
                          multiline
                          rows={3}
                          rowsMax={15}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <div className={classes.chipInput}>
                          <InputText
                            fullWidth
                            variant="outlined"
                            name="keywords"
                            label="Palavras Chaves"
                            value={newKeyword}
                            validations={{
                              minLength: 2,
                            }}
                            handleChange={(event) => {
                              handleNewKeyword(event);
                            }}
                          />
                          <IconButton
                            className={classes.icon}
                            onClick={handleAddKeyword}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                        <Box>
                          {demandKeywords.map((words) => (
                            <Chip
                              key={demandKeywords.indexOf(words)}
                              onDelete={() => {
                                handleDeleteKeyword(
                                  demandKeywords.indexOf(words)
                                );
                              }}
                              label={words.word}
                              className={classes.chip}
                              color="primary"
                              classes={{
                                deleteIcon: classes.icon,
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                      <Grid container justify="flex-start">
                        <RadioButton
                          name="type"
                          classe={classes.formControl}
                          label="Selecione o tipo da demanda *"
                          value={radioButon}
                          required
                          onChange={handleRadioChange}
                          validations={{
                            minLength: radioButon.length === 0,
                          }}
                          validationErrors={{
                            minLength: "Por favor, marque uma das opções.",
                          }}
                        >
                          <ToolTip
                            title="Necessidades que o mercado não sabe que tem, observada por nossos pesquisadores"
                            position="right"
                          >
                            <FormControlLabel
                              value="Impulso Tecnológico"
                              control={<Radio />}
                              label="Impulso Tecnológico"
                            />
                          </ToolTip>

                          <ToolTip
                            title="Necessidades que o mercado clama por uma solução"
                            position="right"
                          >
                            <FormControlLabel
                              value="Pressão de Mercado"
                              control={<Radio />}
                              label="Pressão de Mercado"
                            />
                          </ToolTip>
                          <FormControlLabel
                            value="Outro"
                            control={<Radio />}
                            label="Outro"
                          />
                        </RadioButton>
                      </Grid>
                      <UploadFile
                        rootGrid={classes.rootGrid}
                        divFile={classes.divFile}
                        buttonFile={classes.buttonFile}
                        getFile={getFile}
                        statusPdf={statusPdf}
                        filePdf={filePdf}
                        divCheckFile={classes.divCheckFile}
                        typografyFile={classes.typografyFile}
                        nameFile={nameFile}
                        removeFile={removeFile}
                      />
                    </>
                  )}
              </Grid>
              <br />
              <Divider />
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button
                  color="primary"
                  variant="contained"
                  classes={{ root: classes.button }}
                  disabled={buttonValue}
                  onClick={() => {
                    handleSubmit("Em Edição");
                  }}
                >
                  Salvar
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
          </CardContent>
        </Card>
      </Container>
      {stateTokenDemmand &&
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

export default RegisterOrUpdateDemand;

import React, { createRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Box,
  TextField,
  Menu,
  MenuItem,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Page from "../../components/Page";
import history from "../../history";
import useStyles from "./style";
import StyledModal from "../../components/Modal/index";
import staticImg from "../../assets/static-profile.svg";
import CommentComponent from "../../components/Comment";
import RegisterOrUpdateSolution from "../../components/RegisterOrUpdateSolution/index";
import MessageAlert from "../../components/MessageAlert";
import CardList from "../../components/CardList/index";
import Footer from "../../components/Footer";
import { Context } from "../../contexts/authContext/AuthContext";
import proposalService from '../../service/proposals';

const proposalModel = {
  id: "",
  demand_id: "",
  comments: [],
  creator: {
    name: "",
    photo: "",
  },
  description: "",
  has_liked: false,
  like_count: 0,
  proponents: [
    {
      username: 20160702024,
      photo_url:
        "https://pbs.twimg.com/profile_images/1263639597076144130/GrA8GPFc_400x400.jpg",
      name: "Lucas Rosa",
    },
  ],
  creation_date: Date.now(),
  proposal_status: {},
};

function DetailProposal() {
  // Pega parametros da URL
  const params = useParams();

  const { user } = useContext(Context);
  // Desestrutura o parametro ID do objeto params
  const { id } = params;
  const ref = createRef();
  const classes = useStyles();
  // Estado para armazenar proposta de solução
  const [proposal, setProposal] = useState(proposalModel);
  // Estados e variaveis para controlar a aparição do menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);
  // Controla o alert do delete
  const [deleted, setDeleted] = useState(false);
  // guarda o status do botão de comentário para permitir a abertura ou não do collapse
  const [stateComment, setStateComment] = useState(false);
  // guarda comentário
  const [comment, setComment] = useState("");

  const [op, setOp] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);

  const [isCreator, setIsCreator] = useState(false);

  const { stateToken,
    handleMessageAlert,
    getProposalById,
    deleteProposal,
    likeProposal,
    commentProposal,
    likeCommentProposal } = proposalService();

  useEffect(() => {
    async function loadProposal() {
      const response = await getProposalById(id);

      if (response !== undefined) {
        if (response.status === 200) {
          setProposal(response.data);
          if (response.data.creator.username === user.username) {
            setIsCreator(true);
          }
        }
      } else {
        history.push("/search_demandas");
      }
    }

    loadProposal();
    // eslint-disable-next-line
  }, [id, isUpdated, user]);

  function handleCloseOp() {
    setOp(false);
  }

  function toggleUpdated() {
    setIsUpdated(!isUpdated);
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  // forma a data para dd/MM/yyyy
  function formatDate(date) {
    const valu = new Date(date);
    return `${valu.getDate()}/${valu.getMonth() + 1}/${valu.getFullYear()}`;
  }
  // Voltar
  function handleGoBack() {
    history.push(`/detalhar_demandas/${proposal.demand_id}`, { tab: 1 });
  }

  async function handleDeleteProposal() {
    const response = await deleteProposal(id);

    if (response.status === 200) {
      setOpenModal(false);
      setDeleted(true);
    }
  }

  // função chamada ao clicar no like
  async function changeLikeProposal() {
    const response = await likeProposal(proposal.id).catch((err) => {
      console.log(err);
    });
    if (response !== undefined) {
      const count = response.data.like_count;
      setProposal({
        ...proposal,
        like_count: count,
        has_liked: !proposal.has_liked,
      });
    }
  }

  function changeComment() {
    setStateComment(!stateComment);
  }

  function handleChangeComment(event) {
    setComment(event.target.value);
  }

  async function clickComment() {
    // faz a requisição enviando a descrição do comentário e o id da proposta
    const response = await commentProposal(
      proposal.id,
      JSON.stringify({ description: comment })
    );
    if (response !== undefined) {
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
      const newArray = proposal.comments;
      // adiciona o novo objeto a esse array
      newArray.push(newComment);
      // coloca esse novo array em comentários para atualizar
      setProposal({
        ...proposal,
        comments: newArray,
      });
      // coloca o campo do comentário como vazio
      setComment("");
    }
  }

  async function changeLikeComment(comment) {
    // requisição do like enviando o id do comentário
    const response = await likeCommentProposal(comment.id).catch((err) => {
      console.log(err);
    });
    if (response !== undefined) {
      if (response.status === 200) {
        const count = response.data.like_count;
        // transfere a lista para uma variável
        const newArray = proposal.comments;
        // percorre a lista para achar o comentário que tem o mesmo id
        newArray.forEach((data, i) => {
          if (data.id === comment.id) {
            data.has_liked = !data.has_liked;
            data.like_count = count;
          }
        });
        // seta em comments
        setProposal({
          ...proposal,
          comments: newArray,
        });
      }
    }
  }

  function handleOkMessageDeleted() {
    setDeleted(false);
    history.goBack();
  }

  return (
    <Page title="Detalhar proposta" ref={ref} className={classes.root}>
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
                Proposta de solução
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
        <div className={classes.body}>
          {/* <Grid container spacing={3}> */}
          <Grid className={classes.grid} item xs={12} sm={8}>
            <Card square elevation={0} variant="outlined">
              <CardHeader
                title="Dados gerais"
                className={classes.header}
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={handleProfileMenuOpen}
                    style={isCreator === false ? { cursor: "default" } : {}}
                    disabled={isCreator === false}
                  >
                    <MoreVertIcon
                      style={
                        isCreator === false
                          ? { color: "transparent" }
                          : { color: "#f5f5f5" }
                      }
                    />
                  </IconButton>
                }
              />
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id="menu-bar"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    setOp(true);
                  }}
                >
                  Alterar
                </MenuItem>
                <MenuItem onClick={handleOpenModal}>Apagar</MenuItem>
              </Menu>
              <CardContent className={classes.classBody}>
                <div className={classes.userAvatar}>
                  <Avatar
                    className={classes.avatar}
                    src={proposal.creator.photo_url}
                  />
                  <div className={classes.user}>
                    <Typography variant="subtitle2">
                      {proposal.creator.name}
                    </Typography>
                    <Typography color="textSecondary">Autor</Typography>
                  </div>

                  <Typography color="textSecondary">
                    {`Data de criação: ${formatDate(proposal.creation_date)}`}
                  </Typography>
                </div>
                <br />
                <Typography variant="h6">
                  {`Data de criação: ${formatDate(proposal.creation_date)}`}
                </Typography>

                <TextField
                  className={classes.dontOverflow}
                  multiline
                  fullWidth
                  readOnly
                  maxLength="1000"
                  value={proposal.description}
                  InputProps={{
                    classes: {
                      input: classes.dontOverflow,
                    },
                    disableUnderline: true,
                  }}
                />
                <div className={classes.containerBody}>
                  {openModal && (
                    <MessageAlert
                      warning
                      title="Tem certeza que deseja apagar esta proposta?"
                      onCancel={handleCloseModal}
                      buttons={
                        <Box className={classes.buttonGroup}>
                          <Button
                            variant="contained"
                            className={classes.buttonGerir}
                            onClick={handleDeleteProposal}
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
                      }
                    />
                  )}
                  {deleted && (
                    <MessageAlert
                      success
                      title="Sua proposta foi deletada com sucesso!!"
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
                </div>
              </CardContent>
              <CommentComponent
                stateComment={stateComment}
                value={comment}
                handleChangeComment={handleChangeComment}
                clickComment={clickComment}
                list={proposal.comments}
                staticImg={staticImg}
                changeLikeComment={changeLikeComment}
                formatDate={formatDate}
                changeLike={changeLikeProposal}
                has_liked={proposal.has_liked}
                like_count={proposal.like_count}
                changeComment={changeComment}
                comments={proposal.comments.length}
              />
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <CardList title="Proponentes" data={proposal.proponents} />
          </Grid>
          {/* </Grid> */}
        </div>

        <StyledModal open={op}>
          <RegisterOrUpdateSolution
            proposal_id={proposal.id}
            type="update"
            onClose={handleCloseOp}
            updated={toggleUpdated}
          />
        </StyledModal>
      </Container>
      {stateToken &&
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

export default DetailProposal;

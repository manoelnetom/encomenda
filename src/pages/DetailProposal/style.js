import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    position: "relative",
    flex: "1",
    flexShrink: "0",
    flexBasis: "auto",
    height: "auto",
  },
  header: {
    flexWrap: "wrap",
    width: "auto",
    background: "linear-gradient(to left, #122230 0%,#192d3e 100%)",
    color: "#fff",
  },

  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    flex: "1 1",
    justifyContent: "space-between",
  },
  filterHeader: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    width: "100%",
    height: "inherit",
    justifyContent: "start",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: "25px",
  },
  subtitle: {
    display: "flex",
    margin: "5px",
    paddingLeft: "1.2rem",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  arrowBack: {
    color: "white",
    marginLeft: "10px",
    marginTop: "10px",
  },

  statusContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  containerBody: {
    width: "100%",
    display: "flex",
  },

  card: {
    marginTop: "0.5rem",
    width: "100%",
    flex: "1",
  },

  cardBody: {
    display: "flex",
    flexDirection: "column",
  },

  box: {
    display: "flex",
    alignItems: "center",
  },

  creatorName: {
    marginLeft: 10,
  },
  descriptionContainer: {
    marginTop: 10,
  },

  likeComment: {
    display: "flex",
    width: "100%",
    marginBottom: 10,
    marginRight: 10,
  },

  iconButtonRootCommentsLike: {
    padding: "2px",
    paddingRight: "10px",
  },
  thumbUpAltComments: {
    width: "20px",
    height: "20px",
    marginRight: "5px",
  },
  userAvatar: {
    display: "flex",
    alignItems: "center",
    WebkitBoxAlign: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  user: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },

  buttonGerir: {
    background: "#122230",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#547591",
    },
  },
  buttonDeletar: {
    color: "#FFF",
    background: "#A30000",
    marginLeft: 10,
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fa4141",
    },
  },

  containerAlert: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  alertContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  buttonGroup: {
    margin: 5,
    display: "inline-table",
    width: "100%",
  },

  buttonGerir2: {
    marginLeft: 10,
    background: "#122230",
    color: "#fff",
  },
  like: {
    color: "#3498db",
  },

  rootContainer: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
  },
  body: {
    margin: '-12px',
    padding: '0.8rem',
    display: 'flex',
    flexWrap: 'wrap'
  },
  grid: {
    paddingRight: '0.5rem',
    [theme.breakpoints.down('xs')]: {
      paddingRight: '0rem',
      paddingBottom: '0.5rem'
    }
  },

}));

export default useStyles;

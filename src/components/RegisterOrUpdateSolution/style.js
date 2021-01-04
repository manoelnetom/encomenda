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
    height: "inherit",
  },
  header: {
    flexWrap: "wrap",
    width: "auto",
    background: "linear-gradient(to left, #122230 0%,#192d3e 100%)",
    color: "#fff",
  },
  button3: {
    background: "#122230",
    color: "#f5f5f5",
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: "40%",

    "&:hover": {
      color: "#122230",
      border: "none",
    },
  },
  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
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
    fontSize: "16px",
  },
  subtitle: {
    display: "flex",
    margin: "5px",
    paddingLeft: "5px",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  arrowBack: {
    color: "white",
  },
  containerBody: {
    width: "100%",
    display: "flex",
  },
  card: {
    flexGrow: 1,
    margin: 8,
    minWidth: "60vw",
    maxWidth: "98vw",
    display: "flex",
    flexDirection: "column",
    borderRadius: 0,
  },
  cardAppBar: {
    background: "#122230",
    display: "flex",
    justifyContent: "space-between",
    color: "#FFF",
  },

  button2: {
    background: "#122230",
    color: "#f5f5f5",
    margin: 10,

    "&:hover": {
      color: "#122230",
      border: "none",
    },
  },
  formButton: {
    background: "#122230",
    color: "#fff",
    marginTop: 10,
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#547591",
    },
  },
  formDelete: {
    marginLeft: 10,
    background: "#870B00",
    color: "#fff",
    marginTop: 10,
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fa4141",
    },
  },
  formIconButton: {
    color: "#122230",
  },
  formControl: {
    margin: 16,
  },
  chip: {
    margin: theme.spacing(0.5),
    background: "#122230",
    color: "#fff",
    display: "flex",
  },
  groupChip: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    listStyle: "none",
    marginTop: 10,
    marginBottom: 10,
  },
  chipInput: {
    width: "100%",
    display: "flex",
    marginBottom: 10,
    marginTop: 10,
  },

  icon: {
    color: "#FFF",
    width: "22px",
    cursor: "pointer",
    height: "22px",
    margin: "0 5px 0 -6px",
  },

  tablePaper: {
    backgroundColor: "#FFF",
    maxWidth: "95%",
  },

  tableContainer: {
    maxHeight: "75vh",
  },

  tableRow: {
    cursor: "pointer",
  },

  tableCell: {
    width: "170px",
    color: "white",
    background: "#122230",
    fontSize: "16px",
  },

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    color: "#f5f5f5",
    background: "#122230",
    margin: 10,
  },

  img: {
    width: "40px",
    height: "40px",
    marginRight: "5px",
  },

  tableCellName: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },

  buttonDialog: {
    background: "#122230",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#547591",
    },
  },
  check: {
    maxHeight: "25px",
    maxWidth: "25px",
    margin: "10px",
  },
  messageCheck: {
    display: "flex",
  },
  message: {
    marginBottom: 10,
  },
  proponentes:{
    display:'flex',
    flexWrap:'wrap'
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
}));

export default useStyles;

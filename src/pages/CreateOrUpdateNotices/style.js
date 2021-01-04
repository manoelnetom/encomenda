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
    overflow: "hidden",
  },
  buttonGroup: {
    margin: 5,
    display: "inline-table",
    width: "100%",
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
  buttonGerir: {
    background: "#122230",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#547591",
    },
  },

  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    flex: "1 1",
    justifyContent: "space-between",
    marginLeft: 6,
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
    overflow: "hidden",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "5px",
    fontSize: "16px",
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
  },
  containerBody: {
    width: "100%",
    display: "flex",
  },
  card: {
    flexGrow: 1,
    borderRadius: 0,
    // margin: 8,
    height: "100%",
  },
  cardAppBar: {
    background: "#122230",
    display: "flex",
    justifyContent: "space-between",
  },
  formControl: {
    margin: 16,
  },
  gridSelCalend: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  button: {
    background: "#122230",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#547591",
    },
  },

  errorDate: {
    color: "red",
  },
  chipInput: {
    width: "100%",
    display: "flex",
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    borderRadius: "none",
  },
  chip: {
    margin: theme.spacing(0.5),
    background: "#122230",
    color: "#fff",
    width: "auto",
    maxWidth: "200px",
  },

  paper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "Column",
    listStyle: "none",
    marginTop: 10,
    marginBottom: 10,
  },

  formButton: {
    background: "#122230",
    color: "#fff",
    margin: "5px",
    border: "none",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#547591",
    },
  },

  tablePaper: {
    backgroundColor: "#FFF",
    maxWidth: "95%",
  },

  tableContainer: {
    maxHeight: "75vh",
  },

  table: {
    overflowX: "scroll",
    overflowY: "hidden",
  },
  rootTableParent: {
    display: "inline-table",
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

  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonsGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
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
  rootContainer: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    paddingTop: "0.5rem",
  },
  rootTable: {
    display: "contents",
  },
}));

export default useStyles;

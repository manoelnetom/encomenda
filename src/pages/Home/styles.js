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

  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    flex: "1 1 ",
    justifyContent: "space-between",
    paddingTop: "2rem",
  },

  row: {
    maxWidth: "100%",
  },

  header: {
    width: "100%",
    minHeight: "9rem",
    background: "linear-gradient(to left, #122230 0%, #192d3e 100%)",
    color: "#fff",
  },

  tabsIndicator: {
    background: "#122230",
  },

  color: {
    color: "#122230",
  },

  card: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 10,
  },
  cardRanking: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: 10,
  },

  cardHeader: {
    background: "linear-gradient(to left, #122230 0%, #192d3e 100%)",
    color: "#fff",
  },
  avatar: {
    width: "30px",
    height: "30px",
    marginRight: 10,
  },

  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
  },

  containerUser: {
    width: "100%",
    flex: "1",
  },
}));

export default useStyles;

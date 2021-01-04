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
  iconButton: {
    color: "#f5f5f5",
    marginRight: 20,
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
    width: "inherit",
    height: "inherit",
    justifyContent: "center",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    flex: "1",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  nameSymbol: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: "1em",
    height: "1em",
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    direction: "ltr",
  },
  typografy: {
    marginLeft: "1.2rem",
    marginRight: "1.2rem",
  },

  containerBody2: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    oveflowY: "hidden",
  },
  tableResults: {
    width: "inherit",
  },

  spinner: {
    display: "flex",
    justifyContent: "center",
    width: "inherit",
    margin: "15rem",
  },

  rootContainer2: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    marginTop: "0.5rem",
    oveflowY: "hidden",
  },

  tabPanel: {
    flex: "1",
  },
}));

export { useStyles };

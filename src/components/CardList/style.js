import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  header: {
    flexWrap: "wrap",
    width: "auto",
    background: "linear-gradient(to left, #122230 0%,#192d3e 100%)",
    color: "#fff",
  },

  box: {
    display: "flex",
    alignItems: "center",
  },

  creatorName: {
    marginLeft: 10,
  },

  description: {
    marginLeft: 10,
    marginBottom: 10,
  },
}));

export { useStyles };

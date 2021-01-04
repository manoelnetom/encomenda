import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    heigth: "100%",
    display: "flex",

    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  img: {
    width: "50%",
    height: "50%",
  },

  title: {
    color: "#122230",
  },
}));

export default useStyles;

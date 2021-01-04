import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    marginBottom: "0.5rem",
  },
  cardTitle: {
    color: "#122230",
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 1,
  },
  creatorData: {
    display: "flex",
  },
  media: {
    height: 140,
    paddingTop: "56.25%", // 16:9
  },
  box: { display: "flex" },
  timeData: {
    display: "flex",
    marginLeft: 5,
  },
  cardHeader: {
    background: "#122230",
    color: "#f5f5f5",
  },
}));

export default useStyles;

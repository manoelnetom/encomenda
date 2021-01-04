import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

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
    // overflowY: "hidden",
  },
  header: {
    flexWrap: "wrap",
    width: "auto",
    background: "linear-gradient(to left, #122230 0%,#192d3e 100%)",
    color: "#fff",
    overflow: "hidden",
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
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    flexWrap: "wrap",
    boxShadow: "0px 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    width: "auto",
    margin: "0.3rem",
    overflow: "hidden",
  },
  titleDemand: {
    padding: "0.5rem 0.5rem",
    flex: "1",
    width: "100%",
  },
  userAvatar: {
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
  },
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
  user: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
  },
  userName: {
    color: "#9d9d9d",
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
  optButton1: {
    background: "#f5f5f5",
    color: "#192d3e",
    marginTop: 5,
    marginRight: 5,
  },
  optButton2: {
    background: "#f5f5f5",
    color: "#192d3e",
    marginTop: 5,
    marginRight: 5,
  },
  optButton3: {
    background: "#f5f5f5",
    color: "#192d3e",
    marginTop: 5,
  },
  userTitleDemand: {
    fontWeight: "500",
    fontSize: "1.2rem",
    marginRight: 5,
  },
  demandCreation: {
    fontSize: "1rem",
    marginRight: 5,
    color: "gray",
    marginTop: 2,
  },
  descriptionDemand: {
    display: "flex",
    flex: "1",
    padding: "0.5rem 0.5rem",
    width: "100%",
  },
  descriptionDemand_p: {
    textAlign: "justify",
    flex: 1,
  },
  infoAdd: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
  },
  elemntInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",

    margin: "0.5rem",
  },
  elemntInfoStatus: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: 'center',
    margin: "0.5rem",
  },
  otherTopics: {
    display: "flex",
    padding: "0.5rem 0.5rem",
    flexDirection: "column",
    width: "100%",
  },
  wrapper: {
    flex: "1",
  },
  button: {
    background: "#122230",
    color: "#fff",
    transition: "0.5s",
    marginTop: "0.5rem",
  },
  link: {
    cursor: "pointer",
    marginRight: "5px",
  },
  thumbUpAltComments: {
    width: "20px",
    height: "20px",
    marginRight: "5px",
  },
  tabsText: {
    color: "#122230",
    height: "auto",
  },
  tabsIndicator: {
    background: "#122230",
  },
  overflow: {
    overflow: "hidden",
  },
  overflow2: {
    maxHeight: "70vh",
  },

  ttContainer: {
    maxHeight: "80vh",
  },

  dontOverflow: {
    color: "gray",
  },

  cell: {
    maxWidth: "80%",
  },

  card: {
    marginTop: "0.5rem",
    borderRadius: 0,
  },

  likeProposal: {
    padding: "2px",
    paddingRight: "10px",
  },

  cardHeader: {
    background: "#122230",
    color: "#FFFF",
  },
  cardHeader2: {
    background: "#122230",
    color: "transparent",
    borderRadius: 0,
    cursor: "default",
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
  tableRow: {
    cursor: "pointer",
  },
  tableRow2: {
    cursor: "pointer",
    width: "100%",
  },
  dontOverflowContainer: {
    marginLeft: 25,
    display: "flex",
    alignItems: "center",
    cursor: "none",
    width: "100%",
  },
  box: {
    display: "flex",
    alignItems: "center",
  },
  tableContainer: {
    display: "flex",
    width: "100%",
  },
  containerAlert: {
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  creatorName: {
    marginLeft: 10,
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

  buttonGroup2: {
    marginTop: 10,
    marginBottom: 10,

    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  buttonGerir2: {
    marginLeft: 10,
    background: "#122230",
    color: "#fff",
  },
  styledCard: {
    marginTop: "20vh",
  },

  margin: {
    marginTop: "20%",
  },

  createProposal: {
    background: "#fff",
    color: "#122230",
    marginRight: 25,
  },

  messageEmptyTable: {
    // display: 'flex',
    width: "100%",
    // backgroundColor: 'rgba(194, 189, 189, 0.4)',
    // justifyContent: 'center',
    fontSize: "1.7rem",
    fontWeight: "lighter",
    marginTop: "5px",
  },
  tabPanel: {
    width: "auto",
    flex: "1",
  },
  rootTypografy: {
    fontWeight: "bold",
  },
  rootContainer: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  body: {
    margin: "-12px",
    padding: "0.8rem",
    display: "flex",
    flexWrap: "wrap",
  },
  grid: {
    paddingRight: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      paddingRight: "0rem",
      paddingBottom: "0.5rem",
    },
  },
  message: {
    width: "inherit",
  },
  space: {
    height: "0.5rem",
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
    width: "100%",
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export { useStyles, Accordion, AccordionSummary, AccordionDetails };

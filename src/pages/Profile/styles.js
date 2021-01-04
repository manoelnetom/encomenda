import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    position: "relative",
    flex: "1 0 auto",
    height: "100%",
  },
  header: {
    width: "100%",
    background: "linear-gradient(to left, #122230 0%, #192d3e 100%)",
    color: "#fff",
    flexWrap: "wrap",
  },
  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  avatar: {
    height: 130,
    width: 130,
    margin: "0.2rem",
  },
  boxProfile: {
    alignItems: "center",
    display: "flex",
    margin: "1rem",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
    },
  },
  card:{
    borderRadius: 0,
  },
  tabsText: {
    color: "#122230",
  },
  tabsIndicator: {
    background: "#122230",
  },
  box: {
    marginTop: "0.5rem",
  },
  cardAppBar: {
    background: "#122230",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: 0,
  },
  scopeToolbar: {
    display: "flex",
    justifyContent: "center",
  },
  formButton: {
    background: "#122230",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#547591",
    },
  },
  deleteButton: {
    background: "#B11623",
    color: "#fff",
    marginLeft: 10,
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#fa4141",
    },
  },
  gutterBottom: {
    marginLeft: "1rem",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0rem",
    },
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
    paddingRight: "0.5em",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "0rem",
      paddingBottom: "0.5rem",
    },
  },
  colorIconButton: {
    color: "#dddddd",
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
  tabPanel: {
    flex: '1'
  },
  button: {
    background: '#122230',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
    '&:hover': {
      backgroundColor: '#547591',
    },
  },
  rootSwitch: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
  rootGrid:{
    display:'flex',
    justifyContent:"space-between",
    alignItems:'center'
  },
  rootContainerSettings:{
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    minWidth:'60%',
    maxWidth:'60%',
    [theme.breakpoints.down("md")]: {
      minWidth: "100%",
    },
  }
}));

export default useStyles ;

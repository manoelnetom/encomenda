import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    position: 'relative',
    flex: '1',
    flexShrink: '0',
    flexBasis: 'auto',
    height: 'inherit',
  },
  header: {
    flexWrap: 'wrap',
    width: 'auto',
    background: 'linear-gradient(to left, #122230 0%,#192d3e 100%)',
    color: '#fff',
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    flex: '1 1',
    justifyContent: 'space-between',
  },
  filterHeader: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '100%',
    height: 'inherit',
    justifyContent: 'start',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '5px',
    fontSize: '16px',
  },
  subtitle: {
    display: 'flex',
    margin: '5px',
    paddingLeft: '1.2rem',
    flexWrap: 'wrap',
  },
  arrowBack: {
    color: 'white',
  },
  containerBody: {
    width: '100%',
    display: 'flex',
    height: '100%'
  },
  card: {
    flexGrow: 1,
    borderRadius: 0,
    //margin: 8,
    height: '100%',
  },
  cardAppBar: {
    background: '#122230',
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControl: {
    marginLeft:'1rem',
    marginTop:'1rem'
  },
  gridSelCalend: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  check: {
    maxHeight: '25px',
    maxWidth: '25px',
    margin: '10px',
  },
  messageCheck: {
    display: 'flex',
  },
  errorDate: {
    color: 'red',
  },
  chipInput: {
    width: '100%',
    display: 'flex',
    //marginBottom: 10,
    //marginTop: 10,
  },
  icon: {
    borderRadius: 'none',
  },
  chip: {
    margin: theme.spacing(0.5),
    background: '#122230',
    color: '#fff',
    width: 'auto',
    maxWidth: '200px',
  },

  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'Column',
    listStyle: 'none',
    marginTop: 10,
    marginBottom: 10,
  },

  formButton: {
    background: '#122230',
    color: '#fff',
    margin: '5px',
    border: 'none',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#547591',
    },
  },

  tablePaper: {
    backgroundColor: '#FFF',
  },

  tableContainer: {
    maxHeight: '80vh',
  },

  table: {
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableCell: {
    width: '170px',
    color: 'white',
    background: '#122230',
    fontSize: '16px',
  },

  img: {
    width: '40px',
    height: '40px',
    marginRight: '5px',
  },

  tableCellName: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
  },

  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  button2: {
    color: '#122230',
    border: '1px solid #122230',
    margin: 10,
  },
  rootContainer: {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.5rem',
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
  rootGrid: {
    display: 'flex',
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    flexDirection:'column',
    marginLeft:'0.4rem'
  },
  typografyFile:{
    marginRight:'0.2rem',
  },
  divFile:{
    display:'flex',
    flexWrap:'wrap',
    alignItems:'center'
  },
  spanErrorFile:{
    color:'red',
    fontSize:'0.9rem',
    marginTop:'0.2rem'
  },
  inputFile:{
    display:'flex',
    flexWrap:'wrap'
  },
  buttonFile:{
    marginRight:'0.5rem'
  },
  divCheckFile:{
    display:'flex',
    flexWrap:'wrap',
    alignItems:'center',
    margin:'0.2rem'
  }
}));

export default useStyles;

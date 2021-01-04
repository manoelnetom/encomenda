import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    background: '#122230',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  logo: {
    maxHeight: '200px',
    marginTop: '10px',
  },
  text: {
    margin: '10px',
  },

  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '5px',
    backgroundColor: '#122230',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '1.2rem',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#122230',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#547591',
    },
  },
  tabButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  tabsText: {
    color: '#122230',
  },
  tabsIndicator: {
    background: '#122230',
  },
  methodBox: {
    marginTop: '1.7rem',
    width:'100%',
    display:'flex',
    flexDirection:'column'
  },
  button: {
    marginTop: '10px',
    color: '#122230',
  },
  icon: {
    alignSelf: 'flex-end',
  },
  iconButton: {
    marginTop: '10px',
    display: 'Flex',
    justifyContent: 'space-between',
    color: '#122230',
    textAlign: 'center',
  },
  buttonDialog: {
    background: '#122230',
    color: "#fff",
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#547591',
    },
  },
  check: {
    maxHeight: '30px',
    maxWidth: '30px',
    margin: "10px"
  },
  messageCheck: {
    display: 'flex',
    alignItems: 'center'
  },
  inputText:{
    height:'6rem'
  },
  tab:{
    display:'flex',
    width:'100%',
    justifyContent:'center'
  },
  box:{
    width:'100%'
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  menuButton: {
    marginRight: "0.5rem",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  perfil: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width:'auto',
    height:'auto',
    flexWrap:'wrap',
  },
  configPerfil:{
    flexDirection:'column',
    display:'flex',
    flexWrap:'wrap',
    margin:'0.3rem',
    textAlign:'end',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]:{
      display: 'none'
    }
  },
  name: {
    fontSize:'1rem'
  },
  typePerfil:{
    color:'gray',
    fontSize:'0.8rem'
  },
  rootIconButton:{
    padding:'inherit',
    fontSize:'1rem'
  },
  toolbar:{
    display: 'flex',
    flexWrap:'wrap',
    alignItems:'center'
  },
  img:{
    width:'9rem',
    height:'3rem',
    marginTop:'0.3rem',
    [theme.breakpoints.down('sm')]:{
      width:'6rem',
      height:'2rem',
      marginTop:'0.3rem'
    }
  },
  imgMenuOpen:{
    width:'6rem',
    height:'2rem',
    marginTop:'0.3rem'
  },
  elementToolbar:{
    display:'flex',
    width:'100%',
    alignItems:"center",
    flexWrap:'wrap',
    flexDirection:"row",
  },
}));

export default useStyles;

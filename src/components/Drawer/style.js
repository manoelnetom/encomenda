import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',

  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: '3.5rem',
    },

  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    flexDirection:'column',
    background: 'linear-gradient(to left, #122230 0%, #192d3e 100%)',
    color: '#fff',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('xs')]:{
      minHeight:'3.2rem',
    }
  },
  iconButton: {
    color: '#fff',
    width:'100%',
    display:'flex',
    justifyContent:"flex-end"
  },
  iconRoot:{
    paddingBottom: '0.5rem'
  },
  iconButtonClose:{
    display:'none'
  },
  headerDrawer:{
    flexDirection:'column',
    display:"flex",
    width:'100%',
    height:'9.5rem',
    alignItems:'center',
    paddingTop:'0.3rem'
  },
  headerDrawerClose:{
    height:'1rem',
    [theme.breakpoints.down('sm')]:{
      height:'1rem',
    }
  },
  nameHeader:{
    fontSize:'1rem',
    margin:'0.2rem',
  },
  emailHeader:{
    color:'#d7d7c1',
    fontSize:'0.8rem',
    margin:'0.2rem',
  },
  photoHeader:{
    margin:'0.2rem',
  },
  avatar:{
    width: '4rem',
    height:'4rem'
  },
  listText:{
    fontWeight:'bold'
  }
}));

export default useStyles;

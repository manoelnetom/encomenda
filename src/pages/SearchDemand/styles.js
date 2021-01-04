import { makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        position: 'relative',
        flex: '1',
        flexShrink: '0',
        flexBasis: 'auto',
        height: 'inherit'
    },
    header: {
        flexWrap: 'wrap',
        width: 'auto',
        background: 'linear-gradient(to left, #122230 0%,#192d3e 100%)',
        color: "#fff",
    },
    container: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        flex: '1 1',
        justifyContent: 'space-between'
    },
    filterHeader: {
        display: 'flex',
        width: 'inherit',
        height: 'inherit',
        justifyContent: 'center',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        flex: '1',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column'
        }
    },
    nameSymbol: {
        display: 'flex',
        alignItems: "center"
    },
    icon: {
        width: "1em",
        height: '1em',
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        direction: 'ltr'
    },
    typografy: {
        marginLeft: '1.2rem',
    },
    divButton: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '0.2rem'
    },
    searchButton: {
        borderRadius: '5px',
        height: '3rem',
        width: '7rem',
        marginLeft: '5px',
        fontSize: 'initial',
        background: 'rgb(73, 100, 122)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'box-shadow 150ms ease-out',
        '&:hover': {
            backgroundColor: '#a7bed1',
        },
    },
    tabsText: {
        color: '#122230'
    },
    tabsIndicator: {
        background: '#122230',
    },
    containerBody: {
        width: '100%',
        display: 'flex',
        height: '100%'
    },
    tableResults: {
        width: 'inherit'
    },
    messageEmptyTable: {
        fontSize: '1.7rem',
        fontWeight: 'lighter',
        margin: '0.2rem'
    },
    tablePaper: {
        width: '100%',
    },
    tableContainer: {
        maxHeight: '90%'
    },
    tableRow: {
        cursor: "pointer",
    },
    tableCell: {
        width: '170px',
        color: 'white',
        background: '#122230',
        fontSize: '16px'
    },
    limitWidthText: {
        whiteSpace: 'nowrap',
        width: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        width: 'inherit',
        margin: '15rem'
    },
    rootContainer: {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        marginTop: '0.5rem',
    },
    filterToType: {
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0.5rem',
        width: 'auto',
        justifyContent: 'center',
    },
    filterToTypeUser: {
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0.5rem',
        width: '28%',
        [theme.breakpoints.down('sm')]: {
            width: '70%',
            justifyContent: 'center'
        }
    },
    formLabel: {
        color: 'white'
    },
    visuallyHidden: {
        border: 0,
        //clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        //overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
        color: '#fff',
        background: '#122230',
    },
    stickyHeader: {
        backgroundColor: "#122230",
        color: "#fff"
    },
    tabPanel: {
        flex: '1'
    },
    submitted: {
        backgroundColor: '#ff2e01',
        color: 'white'
    },
    released: {
        backgroundColor: '#014aff',
        color: 'white'
    },
    closed: {
        backgroundColor: '#36b207',
        color: 'white'
    },
    canceled: {
        backgroundColor: '#c58737',
        color: 'white'
    },
    inEditing: {
        backgroundColor: '#fbf406',
        color: 'black'
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
    formControl: {
        margin:'0.8rem',
        minWidth: '8rem',
        maxWidth: '10rem',
        marginTop:'1rem',
        width:'100%'
    },
    selectStatus:{
        backgroundColor:'white',
        borderRadius:'0.2rem',
        height:'3rem'
    },
    statusSearch:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center', 
    },
    spanStatus:{
        marginLeft:'0.3rem',
        color:'gray'
    },
    searchIcon:{
        marginLeft:'0.3rem'
    }
}));

const StyledTableSortLabel = withStyles({
    root: {
        color: 'white',
        '&:hover': {
            color: 'white',
        },
        '&$active': {
            color: 'white',
        },
    },
    active: {
        color: 'white',
        '&$active': {
            color: 'white',
        },
        '&:hover': {
            color: 'white',
        },
    },
    icon: {
        color: 'inherit !important'
    },
})(TableSortLabel);

export { useStyles, StyledTableSortLabel, };
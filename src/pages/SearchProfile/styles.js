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
        height: 'inherit'
    },
    header: {
        width: 'auto',
        background: 'linear-gradient(to left, #122230 0%,#192d3e 100%)',
        color: "#fff"
    },
    container: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
    },
    containerBody: {
        width: '100%',
        display: 'flex',
        height: '100%'
    },
    fieldFilter: {
        display: 'flex',
        //flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        height: 'inherit',
        justifyContent: 'space-evenly',
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'column'
        }
    },
    filterToType: {
        display: 'inline-flex',
        alignItems: 'center',
        margin: '0.5rem',
        paddingTop: 'inherit',
        width: 'inherit',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    formLabel: {
        color: 'white'
    },
    fieldFilterButton: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '0.2rem',
        justifyContent: 'center'
    },
    searchButton: {
        borderRadius: '0.5rem',
        height: '3rem',
        width: '7rem',
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
    tableResults: {
        width: 'inherit'
    },
    messageEmptyTable: {
        fontSize: '1.7rem',
        fontWeight: 'lighter',
    },
    tablePaper: {
        width: '100%',
    },
    tableContainer: {
        maxHeight: '90%'
    },
    tableRow: {
        cursor: "pointer"
    },
    tableCell: {
        width: '170px',
        color: 'white',
        background: '#122230',
        fontSize: '16px',
    },
    radio: {
        '&$checked': {
            color: '#4B8DF8'
        }
    },
    img: {
        width: '2.5rem',
        height: '2.5rem',
        marginRight: '0.5rem'
    },
    tableCellName: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'
    },
    radioColor: {
        color: 'white'
    },
    rootContainer: {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        marginTop: '0.5rem',
    },
    tabPanel: {
        flex: '1'
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
}));

export default useStyles;
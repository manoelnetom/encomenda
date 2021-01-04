import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    submitted:{
        backgroundColor:'#ff2e01',
        color:'white'
    },
    released:{
        backgroundColor:'#014aff',
        color:'white'
    },
    closed:{
        backgroundColor:'#36b207',
        color:'white'
    },
    canceled:{
        backgroundColor:'#c58737',
        color:'white'
    },
    inEditing:{
        backgroundColor:'#fbf406',
        color:'black'
    },
}));

export { useStyles};
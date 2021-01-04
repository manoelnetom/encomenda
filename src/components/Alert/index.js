import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import useStyles from './style';

export default function StyledAlert(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Alert classes={{root:classes.root}} severity={props.severity}>
        <AlertTitle>{props.title}</AlertTitle>
        {props.message}
      </Alert>
    </div>
  );
}

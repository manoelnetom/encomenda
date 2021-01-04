import React, {memo} from 'react';
import {
    Typography,
    Switch,
    Grid
} from "@material-ui/core";
import useStyles from '../styles';

/*
    Componente  serve para mostrar as perguntas e o tipo de dado.
*/

function Question(props) {
    const classes = useStyles();

    return (
        <Grid className={classes.rootGrid} item md={12} xs={12}>
            <Typography>{props.question}</Typography>
            {props.kind === 'bool' &&
                <Switch
                    focusVisibleClassName={classes.focusVisible}
                    disableRipple
                    classes={{
                        root: classes.rootSwitch,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked
                    }}
                    name={props.name}
                    checked={props.checked}
                    onChange={props.onChange}
                />
            }
        </Grid>
    );
}

export default memo(Question);
import React from 'react';
import { useStyles } from './styles';
import Chip from '@material-ui/core/Chip';

export default function (props) {
    const classes = useStyles();
    const colors = [
        { name: 'Em Edição', color: classes.inEditing },
        { name: 'Submetida', color: classes.submitted },
        { name: 'Liberada', color: classes.released },
        { name: 'Fechada', color: classes.closed },
        { name: 'Cancelada', color: classes.canceled }
    ]

    return (
        <>
            {colors.map((color, index) => {
                if (color.name === props.description)
                    return <Chip key={index} classes={{ root: color.color }} label={props.description} />
                return null
            })}
        </>
    );
}
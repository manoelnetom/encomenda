import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '../styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography';

export default function Expansible(props) {
    return (
        <>
            <Accordion square expanded={props.expanded} onChange={props.handleChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={props.controls} id={props.id}>
                    <Typography classes={{root: props.expanded ? props.rootTypografy: ""}}>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <p>
                        {props.text}
                    </p>
                </AccordionDetails>
            </Accordion>
        </>
    );
}
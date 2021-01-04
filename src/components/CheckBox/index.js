import React from 'react';
import {
    FormControl,
    FormLabel,
    FormGroup
} from '@material-ui/core';

export default function (props) {

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel focused={false} className={props.formLabel} component="legend">
                    {props.title}
                </FormLabel>
                <FormGroup>
                    {props.children}
                </FormGroup>
            </FormControl>
        </>
    );
}
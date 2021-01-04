import React from 'react';
import Box from '@material-ui/core/Box'

export default function TabPanel({
    children, value, index, box, ...rest
}) {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...rest}
        >
            {value === index && (
                <Box className={box}>
                    {children}
                </Box>
            )}
        </div>
    );

}
import React from 'react';
import {TailSpin} from 'react-loader-spinner';
import {Box} from '@mui/material';

function Loading (props) {

    return (
        <Box
            sx={{
                ml:2,
                display: props.props ? 'block' : 'none'
        }}
        >
            <TailSpin
                height = "50"
                width = "100"
                color = 'green'
            />
        </Box>
    );
}

export default Loading;
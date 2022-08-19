import React from 'react';
import {
    Box,
    Grid
} from '@mui/material';
import LogInOutBtn from "./LogInOutBtn";

function Logout(props) {

    // const loginStatus =loginStore.getState();
    const loginStatus =true;

    return (
            <Grid item xs={12} sm={8} md={5}>
                <Box sx={{
                    my: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>

                    <LogInOutBtn loginStatus = {loginStatus}/>

                </Box>
            </Grid>
    );
}




export default Logout;
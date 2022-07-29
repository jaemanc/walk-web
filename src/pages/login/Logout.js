import React, {useState, useEffect, useRef} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';

import LogInOutBtn from "./LogInOutBtn";

function Logout(props) {

    let isLogin = props.open;

    return (
        <Grid item xs={12} sm={8} md={5}>
            <Box sx={{
                my: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                {/*
                    버튼 자체를 컴포넌트 + 리액트 훅 처리 해야
                    훅도 쓰면서 버튼을 리턴하는 방식으로 쓰게 됨.
                */}
                <LogInOutBtn isLogin/>

            </Box>
        </Grid>
    );
}




export default Logout;
import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import NaverMap from "./NaverMap";
import Button from "@mui/material/Button";
import FindPath from "./FindPath";
import PostCourse from "./PostCourse";
import PostImage from "./PostImage";
import TMap from "./TMap";

const Main = () => {

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'hidden',
                justifyContent:'left',
                alignItems:'left',
                alignContent:'left',
            }}
        >
            <Toolbar />
            <Container maxWidth="" sx={{ mt: 4, mb: 4 }}>

                <Box sx={{
                    display:'flex',
                    justifyContent:'left',
                    alignItems:'left',
                    alignContent:'left',
                }}>
                    <NaverMap />
                </Box>

            </Container>
        </Box>
    );
}

export default Main;

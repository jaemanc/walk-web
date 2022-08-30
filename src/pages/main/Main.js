import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import NaverMap from "./NaverMap";

function Copyright(props) {
    return (
        <Box sx={{
            m : "2rem"
        }}>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

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
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={1} height="100%">

                    <Grid item xs = {12}>

                        <Paper id="mapPaper"
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 1,
                                width: 1,
                            }}
                        >
                            <NaverMap />
                        </Paper>

                    </Grid>

                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    );
}

export default Main;

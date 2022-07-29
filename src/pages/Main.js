import React, {useState, useEffect, useCallback} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import walkImg from "../assets/images/산책길8.jpg";
import LoginIcon from '@mui/icons-material/Login';
import PostLogin from "./login/PostLogin";
import {useForm} from "react-hook-form";

const Copyright = (props) => {
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
            jaemanc93@gmail.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
}

const theme = createTheme();

const Main = () => {

    const {register} = useForm();

    const [LoginData, setLoginData] = useState({
        // 초기 셋팅
        email:"",
        password:""
    });

    function handleSubmit (e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            email: data.get(`email`),
            password: data.get(`password`),
        });

        // promise로 기다려야한다.
        PostLogin(data).then( (flag) =>{

            console.log(flag);

            if (flag){
                console.log("로그인 성공!");
            } else {
                console.log("로그인 실패!!");
                setLoginData({
                    password: 'ERROR!',
                    email: '계정을 확인해주세요!'
                });
            }}
        ).catch(err=>{
            console.log(" server err... " , err);
        })
    };

    useEffect(() => {
        if (LoginData.email !== null && LoginData.password !== null) {
            console.log("effect : " , LoginData.password, LoginData.email);
        }
    },[LoginData]);

    // const onChange = useCallback( e => {
    //
    //     setLoginData({...LoginData}, e.target.value);
    //         console.log(e.target.value);
    //
    // },[]);

    return (
        <div>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs = {false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${walkImg})`,
                        backgroundRepeat: `no-repeat`,
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

                    <Box sx={{
                        my: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <LoginIcon/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                    </Box>
                    <Box
                        sx={{
                            my: 5,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                     <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}
                     >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="email"
                                name="email"
                                autoComplete="email"
                                value={LoginData.email || ''}
                                onChange={e => setLoginData({
                                    email: e.target.value,
                                    password: LoginData.password
                                }) }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={LoginData.password|| ''}
                                onChange={e => setLoginData({
                                    email: LoginData.email,
                                    password: e.target.value
                                }) }
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button onSubmit={handleSubmit}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 0, mb: 2 }}
                            >
                                GUEST
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
}




export default Main;
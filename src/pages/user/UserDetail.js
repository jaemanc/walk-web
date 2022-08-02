import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField, Typography
} from '@mui/material';
import LogInOutBtn from "../login/LogInOutBtn";
import defaultAxios from "axios";

const states = [
    {
        value: 'alabama',
        label: 'Alabama'
    },
    {
        value: 'new-york',
        label: 'New York'
    },
    {
        value: 'san-francisco',
        label: 'San Francisco'
    }
];

const UserDetail = (props) => {

    const [values, setValues] = useState({
        address: 'USA',
        email: 'demo@devias.io',
        name: 'Katarina',
        password: '',
        phone: '01099881122',
        state: 'Alabama',  // state가 애매하네 이거 .
        birthday: '19930717'
    });

    const userInfo = {
        avatar: '/static/images/avatars/avatar_6.png',
        city: 'Los Angeles',
        country: 'USA',
        jobTitle: 'Senior Developer',
        name: 'Katarina Smith',
        timezone: 'GTM-7'
    };

    useEffect(()=>{

        let id = sessionStorage.getItem("id");
        let email = sessionStorage.getItem("email");
        let jwt = sessionStorage.getItem("jwt");
        console.log(" id :: ", id.toString() , " email :: ",email, " jwt :: ", jwt);

        // 세션에 값이 없는 경우 :
        if ( id === null || email === null ) {
            // 게스트 or neet login...
            setValues({
                address: 'need login',
                email: 'need@login..!',
                name: 'Nid Login',
                password: '',
                phone: '00011112222',
                state: 'need Login',
                birthday: '19001231'
            });

        } else {
            // 로그인 한 사용자 : 세션 있음.
            // console.log(" 상세 정보 초기화.. session 값으로 조회..? ", {...values});
            // console.log(" jwt values :: " , jwt);
            // 사용자 정보 상세조회 요청.

            const jwtConfig = {headers: {Authorization: `Bearer ${jwt}`}};

            // defaultAxios.get(`walk/user?id=${id}`,
            defaultAxios.get(`walk/user/${id}`,
                {headers: {"Authorization" : `${jwt}`}})
                .then(response => {
                    console.log(response, " 헤더값 : ", response.headers.authrozation);
                    if (response.headers.authrozation !== null) {

                        setValues({
                            address: response.data.address ,
                            email: response.data.email ,
                            name: response.data.name ,
                            phone: response.data.phone ,
                            birthday: response.data.dateBirth
                        });

                    }
                }).catch(err => {
                    console.log("error!!", err);

                });
        }
    } ,[]);

    const putUserDetail = (userData) => {

        userData.preventDefault();

    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (

        <Box
            sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            mt: 2,
            mr: 2,
            pt: 8,
        }} >


            <Card {...props}
                  sx={{
                      width:"30%",
                      height:"50%"
                  }}
            >
                <CardContent>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar
                            src={userInfo.avatar}
                            sx={{
                                height: 80,
                                mb: 2,
                                width: 80
                            }}
                        />
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            {userInfo.name}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {`${userInfo.city} ${userInfo.country}`}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {userInfo.timezone}
                        </Typography>
                    </Box>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="text"
                    >
                        Upload picture
                    </Button>
                </CardActions>
            </Card>


            <form onSubmit={putUserDetail}
                autoComplete="off"
                noValidate
                {...props}
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify name"
                                    label="name"
                                    name="name"
                                    onChange={handleChange}
                                    required
                                    value={values.name || ''}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={values.email|| ''}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    type="number"
                                    value={values.phone|| ''}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="birthday"
                                    name="birthday"
                                    onChange={handleChange}
                                    required
                                    value={values.birthday|| ''}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}></Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Select State"
                                    name="state"
                                    onChange={handleChange}
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    value={values.state|| ''}
                                    variant="outlined"
                                >
                                    {states.map((option) => (
                                        <option
                                            key={option.value|| ''}
                                            value={option.value|| ''}
                                        >
                                            {option.label|| ''}
                                        </option>
                                    ))}
                                </TextField>
                                {/*<Button*/}
                                {/*    md={4}*/}
                                {/*    xs={12}*/}
                                {/*    color="primary"*/}
                                {/*    variant="contained"*/}
                                {/*>*/}
                                {/*    주소 찾기*/}
                                {/*</Button>*/}
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    onChange={handleChange}
                                    required
                                    value={values.address|| ''}
                                    variant="outlined"
                                />
                            </Grid>

                        </Grid>
                    </CardContent>
                    <Button
                        sx={{m:2}}
                        color="primary"
                        variant="contained"
                        type="submit"
                    >
                        Save details
                    </Button>
                </Card>
            </form>
        </Box>
    );
};

export default UserDetail;
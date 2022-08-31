import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from '@mui/material';

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

const UserDetail = (userInfo) => {

    const [userInfoValues, setUserInfoValues] = useState({
        address: 'USA',
        email: 'demo@devias.io',
        name: 'Katarina',
        password: '',
        phone: '01099881122',
        state: 'Alabama',  // state가 애매하네 이거 .
        birthday: '19930717'
    });

    useEffect(() => {

        setUserInfoValues(
            {
                address: userInfo.props.address,
                email: userInfo.props.email,
                name: userInfo.props.name,
                password: userInfo.props.password,
                phone: userInfo.props.phone,
                state: userInfo.props.state,
                birthday: userInfo.props.birthday,
            }
        );

    } ,[userInfo]);

    const putUserDetail = (userData) => {

        userData.preventDefault();

    }

    const handleChange = (event) => {
        setUserInfoValues({
            ...userInfoValues,
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

            <form onSubmit={putUserDetail}
                autoComplete="off"
                noValidate
                {...userInfo}
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
                                    value={userInfoValues.name || ''}
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
                                    value={userInfoValues.email|| ''}
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
                                    value={userInfoValues.phone|| ''}
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
                                    value={userInfoValues.birthday|| ''}
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
                                    value={userInfoValues.state || '익산'}
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
                                    value={userInfoValues.address|| ''}
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
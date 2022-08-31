import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {Avatar, Button, Card, CardActions, CardContent, Divider, Typography} from "@mui/material";

function UserInfo(props) {

    useEffect(()=>{
    },[props])


    return (
        <Box
            sx={{
                width: 0.3,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                mt: 2,
                pt: 8
            }}
        >

            <Card {...props}
                  sx={{
                      width:"80%",
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
                            src={props.props.avatar}
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
                            {props.props.name}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {`${props.props.city} ${props.props.country}`}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            variant="body2"
                        >
                            {props.props.timezone}
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
        </Box>
    );
}

export default UserInfo;
import React from 'react';
import Box from "@mui/material/Box";
import {Avatar, Button, Card, CardActions, CardContent, Divider, Typography} from "@mui/material";

const userInfo = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};

/*

DEtail로 합쳐져있으나 분리 할 예정.



*/

function UserInfo(props) {
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
        </Box>
    );
}

export default UserInfo;
import React from 'react';
import TopToolBar from "../home/TopToolBar";
import SideNavBar from "../home/SideNavBar";
import Box from "@mui/material/Box";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

const userInfo = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};

const User = (props) => {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (evt) => {
        setOpen(!open);
    }


    return (
        <div>
            {/* 상단 대시보드 App bar */}
            <TopToolBar toggleDrawer={toggleDrawer} open={open}/>

            {/* 사이드 nav bar*/}
            <SideNavBar toggleDrawer={toggleDrawer} open={open}/>

            <Card {...props}>
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
                                height: 64,
                                mb: 2,
                                width: 64
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
                        fullWidth
                        variant="text"
                    >
                        Upload picture
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default User;
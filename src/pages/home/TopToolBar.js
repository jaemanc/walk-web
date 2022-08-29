import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";

function TopToolBar( props ) {

    const drawerWidth = 240;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (props) => props.open !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    return (
        <div>
        <AppBar position="absolute" open={props.open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(props.open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dash board
                </Typography>

                <Typography >
                    {window.sessionStorage.getItem("email") !== null ? window.sessionStorage.getItem("email") : "Guest"}
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={1} color="secondary">

                        <Avatar />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default TopToolBar;
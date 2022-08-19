import React, {useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {mainListItems, secondaryListItems} from "./listItems";
import Box from '@mui/material/Box';
import Drawer from "@mui/material/Drawer";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Logout from "../login/Logout";



function SideNavBar( props  ) {

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (props) => props.open !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: 240,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
                height: '100%'
            },
        }),
    );

    return (
        <Box sx={{
            marginBottom:1
            ,position: "sticky"
            ,top:0
            ,height:"100%"

        }}>
            <Drawer height="100%" variant="permanent" open={props.open}  >
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={(evt ) => {
                        console.log('nav in clicke',props.open)
                        props.toggleDrawer(props.open)

                    }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {mainListItems}
                    <Divider sx={{ my: 1 }} />
                    {secondaryListItems}
                </List>

                <Box sx={{
                    mt:2
                }}>
                    <Logout open={props.open}/>
                </Box>

            </Drawer>
        </Box>
    );
}

export default SideNavBar;
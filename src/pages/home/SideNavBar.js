import React, {useEffect} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {mainListItems, secondaryListItems} from "./listItems";
import Box from '@mui/material/Box';
import Drawer from "@mui/material/Drawer";
import { sizing } from '@mui/system';
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

const drawerWidth = 240;


function SideNavBar( props  ) {

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (props) => props.open !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
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
            },
        }),
    );

    return (
            <Drawer variant="permanent" open={props.open} containerStyle={{height: 'calc(100% - 64px)' top: 64}} >
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
                    {/*<Divider sx={{ my: 1 }} />*/}
                    {/*{secondaryListItems}*/}
                </List>
            </Drawer>
    );
}

export default SideNavBar;
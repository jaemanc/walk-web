import React from 'react';
import TopToolBar from "../home/TopToolBar";
import SideNavBar from "../home/SideNavBar";
import UserDetail from "./UserDetail";
import UserInfo from "./UserInfo";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import UserDetailFile from "./UserDetailFile";
import UserDetailCourse from "./UserDetailCourse";


const User = (props) => {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (evt) => {
        setOpen(!open);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* 상단 대시보드 App bar */}
            <TopToolBar toggleDrawer={toggleDrawer} open={open}/>

            {/* 사이드 nav bar*/}
            <SideNavBar toggleDrawer={toggleDrawer} open={open}/>

            <Box>

                {/*<UserInfo/>*/}
                <UserDetail/>

                {/*  user Course 정보   */}
                <UserDetailCourse />

                {/*  user File 정보    */}
                <UserDetailFile />
            </Box>

        </Box>
    );
}

export default User;
import React from 'react';
import Header from "../common/Header";
import GNB from "../common/GNB";
import UserDetail from "./UserDetail";
import UserInfo from "./UserInfo";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import UserDetailFile from "./UserDetailFile";
import UserDetailCourse from "./UserDetailCourse";

const User = (props) => {

    return (
            <Box>
                {/*<UserInfo/>*/}
                <UserDetail/>

                {/*  user Course 정보   */}
                <UserDetailCourse />

                {/*  user File 정보    */}
                <UserDetailFile />
            </Box>

    );
}

export default User;
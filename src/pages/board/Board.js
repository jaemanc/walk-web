import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Header from "../common/Header";
import GNB from "../common/GNB";
import BoardList from "./BoardList";
import axios from "axios";


const Board = () =>  {

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (evt) => {
        setOpen(!open);
    }

    return (
        <Box sx={{
            mt:1
            , ml:1
            , mr:1
            , width : '80%'
        }}>
            {/*검색 툴바 */}

            {/* 리스트 목록 */}
            <BoardList/>
        </Box>
    );
}

export default Board;
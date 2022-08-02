import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TopToolBar from "../home/TopToolBar";
import SideNavBar from "../home/SideNavBar";
import BoardToolBar from "./BoardToolBar";
import BoardList from "./BoardList";
import {boards} from "./MockBoards";

const mdTheme = createTheme();

const Board = () =>  {

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (evt) => {
        setOpen(!open);
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{
                display: 'flex'
            }}>
                <CssBaseline />

                {/* 상단 대시보드 App bar */}
                <TopToolBar toggleDrawer={toggleDrawer} open={open}/>

                {/* 사이드 nav bar*/}
                <SideNavBar toggleDrawer={toggleDrawer} open={open}/>
                <Box sx={{
                    mt:1
                    , ml:1
                    , mr:1
                    , width : '80%'
                }}>
                    {/*검색 툴바 */}
                    <BoardToolBar />


                    {/* 리스트 목록 */}
                    <BoardList boards={boards}/>
                </Box>

            </Box>
        </ThemeProvider>
    );
}

export default Board;
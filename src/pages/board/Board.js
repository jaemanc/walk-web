import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import TopToolBar from "../home/TopToolBar";
import SideNavBar from "../home/SideNavBar";
import BoardToolBar from "./BoardToolBar";
import BoardList from "./BoardList";
import defaultAxios from "axios";

const mdTheme = createTheme();

const Board = () =>  {

    const [boards, setBoards] = useState([{
        boardId: 1,
        postId: 21,
        postTitle: '제목등록테스트7',
        postMsg: '내용등록테스트7',
        createdAt: '2022:08:02 21:30:03',
        createrId: 11,
        updated_at: null,
        deletedAt: null,
        isDeleted: 'N',
        user: null,
        board: null
    }]);

    // // boards 조회 해서 뿌려준다.
    useEffect(()=>{
        let id = sessionStorage.getItem("id");
        let email = sessionStorage.getItem("email");
        let jwt = sessionStorage.getItem("jwt");

        console.log(" id :: ", id.toString() , " email :: ",email, " jwt :: ", jwt);

        if (id === null || email === null) {
            console.log(' 세션이 만료됐습니다. 다시 로그인 해야합니다. ');
            window.alert("세션이 만료됐습니다. 다시 로그인 해야합니다. ")
        } else {

            // 기본 조회 10개 게시물 최신등록순으로
            defaultAxios.get(`walk/post/search`,
                {headers: {"Authorization" : `${jwt}`}})
                .then(response=>{
                    console.log(`return value :: `, response);
                    setBoards(
                        response.data
                    );
                }).catch(err => {
                    console.log("ERROR!! " , err);
                });
        }
    },[]);

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
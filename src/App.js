import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/home/Home"
import User from "./pages/user/User";
import Board from "./pages/board/Board";
import Post from "./pages/board/Posts";
import Interceptor from "./pages/common/Interceptor";
import Course from "./pages/course/Course";
import GNB from "./pages/common/GNB";
import Header from "./pages/common/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';

const App = () => {

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (evt) => {
        setOpen(!open);
    }

  return (
          <div>
            <BrowserRouter>
                <Interceptor/>
                <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Header toggleDrawer={toggleDrawer} open={open} />
                <GNB toggleDrawer={toggleDrawer} open={open}/>
                    <Routes>
                        <Route path="/" element={<Main />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                        <Route path="/user" element={<User />}></Route>
                        <Route path="/board" element={<Board />}></Route>
                        <Route path="/post/:postId" element={<Post />}></Route>
                        <Route path="/course" element={<Course />}></Route>
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                    {/*<Route path="*" element={<NotFound />}></Route>*/}
                    </Routes>
                </Box>
            </BrowserRouter>
          </div>
  )
}

export default App;
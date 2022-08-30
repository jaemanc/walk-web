import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";
import Board from "./pages/board/Board";
import Post from "./pages/board/Posts";
import Interceptor from "./pages/common/Interceptor";
import Course from "./pages/course/Course";
import GNB from "./pages/common/GNB";
import Header from "./pages/common/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Main from './pages/main/Main';

const App = () => {

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (evt) => {
        setOpen(!open);
    }

    let mainPage = false;

    if (window.location.pathname==='/') {
        mainPage = true;
    }

  return (
      <Box>
          <Interceptor/>
          <Box
              sx={{
                  visibility : mainPage ? 'none' : 'hidden'
              }}
          >
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Main />}/>
                  </Routes>
              </BrowserRouter>
          </Box>

          <Box
              sx={{
                  visibility : mainPage ? 'hidden' : 'none'
              }}
          >
              <BrowserRouter>
                    <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Header toggleDrawer={toggleDrawer} open={open} />
                    <GNB toggleDrawer={toggleDrawer} open={open}/>
                        <Routes>
                            <Route path="/main" element={<Main />}/>
                            <Route path="/user" element={<User />}/>
                            <Route path="/board" element={<Board />}/>
                            <Route path="/post/:postId" element={<Post />}/>
                            <Route path="/course" element={<Course />}/>
                        {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                        {/*<Route path="*" element={<NotFound />}></Route>*/}
                        </Routes>
                    </Box>
              </BrowserRouter>
          </Box>
      </Box>
  )
}

export default App;
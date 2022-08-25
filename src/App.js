import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/home/Home"
import User from "./pages/user/User";
import Board from "./pages/board/Board";
import Post from "./pages/board/Posts";
import Interceptor from "./pages/common/Interceptor";
import Course from "./pages/course/Course";


const App = () => {

  return (
          <div>
            <BrowserRouter>
                <Interceptor/>
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
            </BrowserRouter>
          </div>
  )
}

export default App;
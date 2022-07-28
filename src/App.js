import React, { Component } from 'react';
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Main from "./pages/Main";
import Home from "./pages/home/Home"
import User from "./pages/User/User";

const App = () => {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/user" element={<User />}></Route>
            {/*<Route path="/login/*" element={<Product />}></Route>*/}
            {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
            {/*<Route path="*" element={<NotFound />}></Route>*/}
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
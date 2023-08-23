import React from "react";
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";
import Main from "../../Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function AuthMain() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser></LoginUser>}></Route>
          <Route path="/login" element={<LoginUser></LoginUser>}></Route>
          <Route path="/signup" element={<RegisterUser></RegisterUser>}></Route>
          <Route path="/main" element={<Main></Main>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AuthMain;

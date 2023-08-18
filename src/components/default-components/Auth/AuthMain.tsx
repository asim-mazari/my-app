import React, { useState , useEffect } from "react";
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";
import Main from "../../Main";
import { useDispatch } from "react-redux";
function AuthMain() {
  const [registerUser, setRegisterUser] = useState("login");
  const [userToken, setuserToken] = useState("");
  return (
    <>
      {registerUser === "register" && (
        <RegisterUser setRegisterUser={setRegisterUser}></RegisterUser>
      )}

      {registerUser === "login" && (
        <LoginUser setRegisterUser={setRegisterUser} setuserToken={setuserToken}></LoginUser>
      )}
      {registerUser === "main" && <Main></Main>}
    </>
  );
}

export default AuthMain;

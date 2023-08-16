import React, { useState } from "react";
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";
import Main from "../../Main";

function AuthMain() {
  const [registerUser, setRegisterUser] = useState("login");

  return (
    <>
      {registerUser === "register" && (
        <RegisterUser setRegisterUser={setRegisterUser}></RegisterUser>
      )}

      {registerUser === "login" && (
        <LoginUser setRegisterUser={setRegisterUser}></LoginUser>
      )}

      {registerUser === "main" && <Main></Main>}
    </>
  );
}

export default AuthMain;

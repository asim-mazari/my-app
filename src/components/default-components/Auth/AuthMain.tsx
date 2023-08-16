import React, { useState } from "react";
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";
import Main from "../../Main";

function AuthMain() {

    const [Register_User, setRegister_User] = useState("login");

  return (
    <>
    {Register_User==="register" && (
      <RegisterUser setRegister_User={setRegister_User}></RegisterUser>
    )}

    {Register_User==="login" && (
      <LoginUser setRegister_User={setRegister_User}></LoginUser>
    )}
   
    {Register_User==="main" && (
      <Main></Main>
    )}
  </>
  )
}

export default AuthMain
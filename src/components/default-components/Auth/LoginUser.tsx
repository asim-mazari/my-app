import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../../Store/authSlice';

interface LoginUsers {
  setRegisterUser: any;
}

function LoginUser({ setRegisterUser }: LoginUsers) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [passwordError, setPasswordError] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "password") {
      setPasswordError("");
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setRegisterUser("main");
      } else {
        // Login failed, handle the error.
        setPasswordError("Inavlid Credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  function SwitchToRegister() {
    setRegisterUser("register");
  }
  const [showPassword, setShowPassword] = React.useState(false);
  const clickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20%" }}>
          <Typography variant="h5">Sign In</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={clickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={passwordError !== ""}
              helperText={passwordError ? passwordError : ""}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%", marginTop: "20px" }}
            >
              Sign In
            </Button>
          </form>
          <Link
            component="button"
            variant="body2"
            onClick={SwitchToRegister}
            sx={{ marginTop: "20px",textDecoration:'none' }}
          >
            Not Registered? Create Account.
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginUser;

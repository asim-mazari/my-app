import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Store/authSlice";
import { useNavigate } from "react-router-dom";

function LoginUser() {
  const navigate = useNavigate(); // Initialize useNavigate
  const authData = useSelector((state: any) => state.auth);
  const { userId } = authData.auth || {};
  if (userId !== undefined) {
    navigate("/main");
  }

  const [formData, setFormData] = useState({
    Email: "",
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
      const response = await dispatch(loginUser(formData) as any);
      const { type, payload } = response;
      if (response) {
        if (payload.userId !== null) {
          navigate("/main");
        }
        if (type == "auth/login/rejected") {
          setPasswordError("Invalid Credentials");
        }
      }
    } catch (error) {
      // Handle the error here
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setPasswordError("Invalid email or password");
      } else {
        setPasswordError("An error occurred");
      }
    }
  };

  function SwitchToRegister() {
    navigate("/signup");
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
              name="Email"
              value={formData.Email}
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
            sx={{ marginTop: "20px", textDecoration: "none" }}
          >
            Not Registered? Create Account.
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginUser;

import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { registerUser } from "../../../Store/registerSlice";
import { useDispatch } from "react-redux";
interface RegisterUsers {
  setRegisterUser: any;
}
const initialFormData = {
  FirstName: "",
  Lastname: "",
  Email: "",
  password: "",
  dob: "",
  Address: "",
  ConfirmPassword: "",
};
function RegisterUser({ setRegisterUser }: RegisterUsers) {
  const [formData, setFormData] = useState({
    FirstName: "",
    Lastname: "",
    Email: "",
    password: "",
    dob: "",
    Address: "",
    ConfirmPassword: "",
  });
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const inputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "Email") {
      setEmailError("");
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitUserData = async (event: any) => {
    event.preventDefault();
    if (formData.password !== formData.ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await dispatch(registerUser(formData) as any);
      if (response) {
        const { type, payload } = response;
        if(type=="auth/register/fulfilled")
        {
          setFormData(initialFormData);
        }
        else{
          setEmailError("Email Already Exist")
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle the error here, if needed
    }
  };
  function SwitchTologin() {
    setRegisterUser("login");
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const clickShowPassword = () => setShowPassword((show) => !show);

  const [confirmPassword, setConfirmPassword] = React.useState(false);

  const confirmShowPassword = () => setConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5">Sign Up</Typography>
          <form onSubmit={submitUserData}>
            <Grid display="flex" justifyContent="space-between">
              <TextField
                label="First Name"
                variant="outlined"
                name="FirstName"
                required
                value={formData.FirstName}
                onChange={inputChange}
                margin="normal"
                sx={{ width: "48%" }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="Lastname"
                required
                value={formData.Lastname}
                onChange={inputChange}
                margin="normal"
                sx={{ width: "48%" }}
              />
            </Grid>

            <TextField
              label="Email"
              variant="outlined"
              name="Email"
              required
              value={formData.Email}
              onChange={inputChange}
              fullWidth
              margin="normal"
              error={emailError !== ""}
              helperText={emailError ? emailError : ""}
            />
            <TextField
              label="Address"
              variant="outlined"
              name="Address"
              required
              value={formData.Address}
              onChange={inputChange}
              fullWidth
              margin="normal"
            />
            <Typography sx={{ marginTop: "20px" }}>Date Of Birth</Typography>
            <TextField
              type="date"
              variant="outlined"
              name="dob"
              required
              value={formData.dob}
              onChange={inputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              required
              value={formData.password}
              onChange={inputChange}
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
            />
            <TextField
              label="Confirm Password"
              type={confirmPassword ? "text" : "password"}
              variant="outlined"
              name="ConfirmPassword"
              required
              value={formData.ConfirmPassword}
              onChange={inputChange}
              fullWidth
              margin="normal"
              error={formData.password !== formData.ConfirmPassword}
              helperText={
                formData.password !== formData.ConfirmPassword
                  ? "Passwords do not match"
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={confirmShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%", marginTop: "20px" }}
            >
              Sign Up
            </Button>
          </form>
          <Link
            component="button"
            variant="body2"
            onClick={SwitchTologin}
            sx={{ marginTop: "20px", textDecoration: "none" }}
          >
            Already registered? Click here to log in.
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default RegisterUser;

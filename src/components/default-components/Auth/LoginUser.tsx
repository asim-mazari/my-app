import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";

interface LoginUsers {
  setRegister_User: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginUser({ setRegister_User }: LoginUsers) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
        // Login successful, you can display a success message or perform desired actions.
        alert("Login successful");
      } else {
        // Login failed, handle the error.
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  function SwitchToRegister() {
    setRegister_User(true);
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
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
              type="password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
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

          <Typography onClick={SwitchToRegister} sx={{ marginTop: "20px" }}>
            Not Registered? Create Account.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginUser;

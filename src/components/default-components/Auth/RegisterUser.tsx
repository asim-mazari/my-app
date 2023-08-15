import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";

interface RegisterUsers {
  setRegister_User: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialFormData = {
  FirstName: "",
  Lastname: "",
  Email: "",
  password: "",
  dob: "",
  Address: "",
};
function RegisterUser({ setRegister_User }: RegisterUsers) {
  const [formData, setFormData] = useState({
    FirstName: "",
    Lastname: "",
    Email: "",
    password: "",
    dob: "",
    Address: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registration successful, you can display a success message or redirect the user.
        alert("User registerd");
        setFormData(initialFormData);
      } else {
        // Registration failed, handle the error.
        alert("Registeration Failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  function SwitchTologin() {
    setRegister_User(false);
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5">Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <Grid display="flex" justifyContent="space-between">
              <TextField
                label="First Name"
                variant="outlined"
                name="FirstName"
                required
                value={formData.FirstName}
                onChange={handleInputChange}
                margin="normal"
                sx={{ width: "48%" }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="Lastname"
                required
                value={formData.Lastname}
                onChange={handleInputChange}
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
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              variant="outlined"
              name="Address"
              required
              value={formData.Address}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              required
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
              Sign Up
            </Button>
          </form>
          <Typography onClick={SwitchTologin} sx={{ marginTop: "20px" }}>
            Already registered? Click here to log in.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
export default RegisterUser;

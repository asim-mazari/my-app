import React from "react";
import { Box, Paper, Typography, TextField } from "@mui/material";

interface ContactBoxProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}
interface Field {
  id: number;
  label: string;
  fullName: string;
  mobile: string;
  email: string;
  error?: boolean; // Add the error property
}
function ContactBox({ fields, setFields }: ContactBoxProps) {
  return (
    <Box sx={{ marginLeft: "26%" }}>
      {fields.map((field) => (
        <Paper
          elevation={3}
          sx={{ width: "460px", padding: "20px", marginBottom: "20px" }}
          key={field.id}
        >
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            {field.label}
          </Typography>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            value={field.fullName}
            error={field.error} // Add error prop
            onChange={(e) => {
              const updatedFields = fields.map((f) => {
                if (f.id === field.id) {
                  return { ...f, fullName: e.target.value, error: false }; // Reset error when typing
                }
                return f;
              });
              setFields(updatedFields);
            }}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Mobile"
            variant="outlined"
            required
            fullWidth
            value={field.mobile}
            error={field.error} // Add error prop
            onChange={(e) => {
              const updatedFields = fields.map((f) => {
                if (f.id === field.id) {
                  return { ...f, mobile: e.target.value, error: false }; // Reset error when typing
                }
                return f;
              });
              setFields(updatedFields);
            }}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            value={field.email}
            error={field.error} // Add error prop
            onChange={(e) => {
              const updatedFields = fields.map((f) => {
                if (f.id === field.id) {
                  return { ...f, email: e.target.value, error: false }; // Reset error when typing
                }
                return f;
              });
              setFields(updatedFields);
            }}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              const updatedFields = fields.map((f) => {
                if (f.id === field.id) {
                  return { ...f, address: e.target.value };
                }
                return f;
              });
              setFields(updatedFields);
            }}
            sx={{ marginBottom: "20px" }}
          />
        </Paper>
      ))}
    </Box>
  );
}
export default ContactBox;

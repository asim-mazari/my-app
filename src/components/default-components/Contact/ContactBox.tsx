import React from "react";
import { Box, Paper, Typography, TextField } from "@mui/material";
import Field from "./Field";

interface ContactBoxProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

function ContactBox({ fields, setFields }: ContactBoxProps) {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: Field
  ) => {
    const { name, value } = e.target;
    const updatedFields = fields.map((f) => {
      if (f.id === field.id) {
        return {
          ...f,
          [name]: value,
        };
      }
      return f;
    });
    setFields(updatedFields);
  };

  const validateFields = () => {
    const updatedFields = fields.map((field) => {
      const { fullName, mobile, email } = field;
      const isFullNameEmpty = fullName.trim() === "";
      const isMobileEmpty = mobile.trim() === "";
      const isEmailEmpty = email.trim() === "";

      return {
        ...field,
        error: isFullNameEmpty || isMobileEmpty || isEmailEmpty,
      };
    });
    setFields(updatedFields);
  };

  return (
    <Box sx={{ marginLeft: "26%" }} component="form">
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
            error={field.error && field.fullName.trim() === ""}
            helperText={
              field.error && field.fullName.trim() === ""
                ? "Full Name is required"
                : ""
            }
            name="fullName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange(e, field)
            }
            sx={{ marginBottom: "20px" }}
            onBlur={validateFields} // Validate fields on blur
            onKeyUp={validateFields} // Validate fields on keyup
          />
          <TextField
            label="Mobile"
            variant="outlined"
            required
            fullWidth
            value={field.mobile}
            error={field.error && field.mobile.trim() === ""}
            helperText={
              field.error && field.mobile.trim() === ""
                ? "Mobile is required"
                : ""
            }
            name="mobile"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange(e, field)
            }
            sx={{ marginBottom: "20px" }}
            onBlur={validateFields} // Validate fields on blur
            onKeyUp={validateFields} // Validate fields on keyup
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            value={field.email}
            error={field.error && field.email.trim() === ""}
            helperText={
              field.error && field.email.trim() === ""
                ? "Email is required"
                : ""
            }
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFieldChange(e, field)
            }
            sx={{ marginBottom: "20px" }}
            onBlur={validateFields} // Validate fields on blur
            onKeyUp={validateFields} // Validate fields on keyup
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
          />
        </Paper>
      ))}
    </Box>
  );
}

export default ContactBox;

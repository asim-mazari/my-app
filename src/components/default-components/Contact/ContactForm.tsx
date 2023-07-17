import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ContactBox from "./ContactBox";

interface Field {
  id: number;
  label: string;
  fullName: string;
  mobile: string;
  email: string;
}

function ContactForm() {
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      label: "primary",
      fullName: "",
      mobile: "",
      email: "",
    },
  ]);

  const handleAddField = () => {
    const isFormValid = fields.every((field) => {
      return (
        field.fullName.trim() !== "" &&
        field.mobile.trim() !== "" &&
        field.email.trim() !== ""
      );
    });

    if (isFormValid) {
      const newField: Field = {
        id: fields.length + 1,
        label: "Additional info",
        fullName: "",
        mobile: "",
        email: "",
      };
      setFields([...fields, newField]);
    } else {
      const updatedFields = fields.map((field) => {
        if (
          field.fullName.trim() === "" ||
          field.mobile.trim() === "" ||
          field.email.trim() === ""
        ) {
          return { ...field, error: true };
        }
        return field;
      });
      setFields(updatedFields);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h5">Personal Info</Typography>
      </Box>
      <ContactBox fields={fields} setFields={setFields} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <Button variant="outlined" onClick={handleAddField}>
          Add More
        </Button>
      </Box>
    </>
  );
}

export default ContactForm;

import React from 'react';
import Field from "./Field";
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface ContactBoxProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

function ContactData({ fields }: ContactBoxProps) {
  // Convert the 'fields' array into an object
  const dataObject = fields.map((field) => ({
    id: field.id,
    label: field.label,
    fullName: field.fullName,
    mobile: field.mobile,
    email: field.email,
    address: field.address,
    // Add more properties if needed
  }));

  return (
   <Box sx={{width:'60%'}}>
     <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Label</TableCell>
          <TableCell>Full Name</TableCell>
          <TableCell>Mobile</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Address</TableCell>
          {/* Add more table header cells for additional properties if needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataObject.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.id}</TableCell>
            <TableCell>{data.label}</TableCell>
            <TableCell>{data.fullName}</TableCell>
            <TableCell>{data.mobile}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.address}</TableCell>
            {/* Add more table cells for additional properties if needed */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
   </Box>
  );
}

export default ContactData;

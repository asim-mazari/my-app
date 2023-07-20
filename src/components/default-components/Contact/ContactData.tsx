import React, { useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

function ContactData() {
  const data = useSelector((state: any) => {
    return state.users;
  });

  // Local state to store the selected value from Autocomplete
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  // Filter the data array to remove duplicates based on a unique property (e.g., 'id')
  const filteredData = data.filter((item: any, index: number, self: any[]) => {
    return index === self.findIndex((obj) => obj.id === item.id);
  });

  // If Autocomplete has a selected value, filter the data based on the selected value
  const tableData = selectedValue
    ? filteredData.filter((item: any) => item.fullName === selectedValue)
    : filteredData;

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    // If the input is empty, reset the selectedValue to show all data in the table
    if (value === "") {
      setSelectedValue(null);
    }
  };

  return (
    <Box sx={{ width: "60%" }}>
      <Grid container display="flex" justifyContent="space-between">
        <FormControl sx={{width:'30%'}}>
          <InputLabel id="demo-simple-select-label" >Sorting</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value=""
            label="Age"
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="label">Label</MenuItem>
            <MenuItem value="fullName">Full Name</MenuItem>
          </Select>
        </FormControl>


        <Autocomplete
        sx={{width:'60%'}}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={data.map((option: any) => ({ label: option.fullName }))}
          getOptionLabel={(option: any) => option.label}
          onChange={(event, value) => setSelectedValue(value?.label || null)}
          onInputChange={handleInputChange} // Handle input change
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Grid>
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
          {tableData.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.label}</TableCell>
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.mobile}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.address}</TableCell>
              {/* Add more table cells for additional properties if needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default ContactData;

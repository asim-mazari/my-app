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
  IconButton,
  Paper,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../../Store/ContactClice";
import { editContact } from "../../../Store/ContactClice";
interface ContactDataProps {
  onEdit: (user: any) => void;
}

function ContactData({ onEdit }: ContactDataProps) {
  const data = useSelector((state: any) => {
    return state.users;
  });
  const dispatch = useDispatch();

  // Local state to store the selected value from Autocomplete and sorting option
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [sortingOption, setSortingOption] = useState<string>("id");

  // Filter the data array to remove duplicates based on a unique property (e.g., 'id')
  const filteredData = data.filter((item: any, index: number, self: any[]) => {
    return index === self.findIndex((obj) => obj.id === item.id);
  });

  // If Autocomplete has a selected value, filter the data based on the selected value
  const tableData = selectedValue
    ? filteredData.filter((item: any) => item.fullName === selectedValue)
    : filteredData;

  // Function to sort data based on the selected sorting option
  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      if (sortingOption === "label") {
        return a.label.localeCompare(b.label);
      } else if (sortingOption === "fullName") {
        return a.fullName.localeCompare(b.fullName);
      }
      // Default sorting by ID
      return a.id - b.id;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    // If the input is empty, reset the selectedValue to show all data in the table
    if (value === "") {
      setSelectedValue(null);
    }
  };

  // Function to handle the deletion of data
  const handleDelete = (id: number) => {
    // Dispatch the action to remove the user from the Redux store
    dispatch(deleteContact(id));
  };

  const handleEdit = (user: any) => {
    onEdit(user);
  };

  return (
    <Paper elevation={3} sx={{ padding: "10px", marginRight: "20px" }}>
      <Box sx={{ width: "60%" }}>
        <Grid container display="flex" justifyContent="space-between">
          <FormControl sx={{ width: "30%" }}>
            <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortingOption}
              label="Sorting"
              onChange={(event) =>
                setSortingOption(event.target.value as string)
              }
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="label">Label</MenuItem>
              <MenuItem value="fullName">Full Name</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            sx={{ width: "60%" }}
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
              <TableCell>Delete</TableCell> {/* Add delete button column */}
              <TableCell>Edit</TableCell> {/* Add delete button column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData(tableData).map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  {/* Add delete button */}
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="error"
                    aria-label="delete"
                  >
                    {/* Replace 'DeleteIcon' with your desired delete icon */}
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Add edit button */}
                  <IconButton
                    onClick={() => handleEdit(item)}
                    color="primary"
                    aria-label="edit"
                  >
                    {/* Replace 'EditIcon' with your desired edit icon */}
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

export default ContactData;

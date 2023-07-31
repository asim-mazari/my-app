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
  Button,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useSelector , useDispatch,} from "react-redux";
import { deleteCountry } from "../../../Store/CountryClice";



interface ManageCities {
    setManageCity: React.Dispatch<React.SetStateAction<boolean>>;
  }

// Sample data
const tableData = [
  {
    id: 1,
    label: "Label 1",
    fullName: "John Doe",
    mobile: "1234567890",
    email: "john.doe@example.com",
    address: "123 Main St",
    selectedCity: "City 1",
    country: "Country 1",
  },
  // Add more data objects as needed
];

function ManageCities({ setManageCity }: ManageCities) {
  const [sorting, setSorting] = useState("id"); // Add state for sorting selection
  // Replace 'countries' with the name of your slice in the Redux store

const data = useSelector((state: any) => {
    return state.countries;
  });


  console.log(data)
  const sortData = (data:any) => {
    // Replace this function with your actual sorting logic
    // For now, it returns the data as it is (no sorting)
    return data;
  };

  function addContact()
  {
    setManageCity(true);
  }
  let counter = 0;

  const dispatch = useDispatch(); // Add the useDispatch hook

  // Function to handle delete button click
  function handleDelete(id:any) {
    // Dispatch the deleteCountry action with the id to delete the country
    dispatch(deleteCountry(id));
  }

  function EditCountry()
  {
    setManageCity(true)
  }
  return (
    <Grid sx={{ width: "100%" }} display="flex" justifyContent="center">
      <Paper elevation={3} sx={{ padding: "10px", marginLeft: "20px", width: "100%" }}>
        <Typography variant="h5">Manage Countries</Typography>
        <Grid container display="flex">
          <FormControl sx={{ width: "20%" }}>
            <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sorting} // Add the value prop for the selected sorting option
              onChange={(e) => setSorting(e.target.value)} // Add onChange handler to update the sorting state
              label="Sorting"
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="label">Label</MenuItem>
              <MenuItem value="fullName">Full Name</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            sx={{ width: "30%", marginLeft: "20px", marginRight: "20px" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={[]} // Replace with your options for the autocomplete field
            getOptionLabel={(option: any) => option.label}
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

          <Button variant="outlined" onClick={addContact}>Add Info</Button>
        </Grid>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Delete</TableCell> {/* Add delete button column */}
              <TableCell>Edit</TableCell> {/* Add delete button column */}
            </TableRow>
          </TableHead>
          <TableBody>

          {data.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{++counter}</TableCell>
              <TableCell>
                {/* Add delete button */}
                <IconButton color="error" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  {/* Replace 'DeleteIcon' with your desired delete icon */}
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                {/* Add edit button */}
                <IconButton color="primary" aria-label="edit" onClick={EditCountry}>
                  {/* Replace 'EditIcon' with your desired edit icon */}
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}

export default ManageCities;
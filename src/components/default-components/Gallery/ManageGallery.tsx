import React, { useState, useEffect } from "react";

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
import { useSelector, useDispatch } from "react-redux";
import { deleteGallery } from "../../../Store/GallerySlice";
import cities from "cities.json"; // Import the cities list

interface ManageGallery {
  setManagegallery: React.Dispatch<React.SetStateAction<boolean>>;
  setGalleryIndex: React.Dispatch<React.SetStateAction<any>>;
}

function ManageGallery({ setManagegallery, setGalleryIndex }: ManageGallery) {
  const dispatch = useDispatch(); // Move this line here
  const [sorting, setSorting] = useState("id"); // Add state for sorting selection
  // Replace 'countries' with the name of your slice in the Redux store

  const GalleryData = useSelector((state: any) => {
    return state.Gallery;
  });
  function addContact() {
    setManagegallery(true);
    setGalleryIndex(null);
  }
  function handleDelete(id: any) {
    dispatch(deleteGallery(id));
  }
  const EditCountry = (id: number) => {
    setManagegallery(true);
    setGalleryIndex(id);
  };

  console.log(GalleryData);
  return (
    <Grid sx={{ width: "100%" }} display="flex" justifyContent="center">
      <Paper
        elevation={3}
        sx={{ padding: "10px", marginLeft: "20px", width: "100%" }}
      >
        <Typography variant="h5">Manage Gallery</Typography>
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

          <Button variant="outlined" onClick={addContact}>
            Add Gallery
          </Button>
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
            {GalleryData.map((item: any, index: number) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => EditCountry(index)}
                  >
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

export default ManageGallery;

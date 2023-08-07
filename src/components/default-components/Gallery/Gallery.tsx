import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  IconButton,
  Card,
  CardContent,
  Typography,
  ImageList,
  ImageListItem,
  styled,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { addGallery } from "../../../Store/GalleryClice";
import { useSelector, useDispatch } from "react-redux";

const HoverableCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end", // Align content to the bottom
  position: "relative",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    "& .deleteButton, & .titleTypography": {
      visibility: "visible",
    },
  },
}));

const CardContentWrapper = styled(CardContent)({
  position: "relative",
  marginTop: "-100px",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "#ffffff",
  visibility: "hidden",
});

const StyledInput = styled("input")({
  display: "none",
});

const UploadContainer = styled("label")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
});

const UploadText = styled(Typography)({
  marginLeft: "8px",
});

const DeleteButton = styled(IconButton)({
  position: "fixed",
  top: "8px",
  right: "8px",
  color: "yellow ",
  visibility: "hidden",
});
const TitleTypography = styled(Typography)(({ theme }) => ({
  textAlign: "center",
}));

const UniqueImageList = styled(ImageList)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "16px",
  marginTop: "16px",
});
const CheckboxWrapper = styled("div")({
  position: "absolute",
  top: "8px",
  left: "8px",
  zIndex: 1,
  visibility: "visible", // You can set this to "visible" or "initial"
});

const StyledCheckbox = styled(Checkbox)({
  zIndex: 2, // Ensure checkbox is above the overlay
});

// ... (other imports and styled components)
interface GalleryProps {
  setManagegallery: React.Dispatch<React.SetStateAction<boolean>>;
  setGalleryIndex: React.Dispatch<React.SetStateAction<any>>;
  GalleryIndex: any;
}

function Gallery({
  setManagegallery,
  setGalleryIndex,
  GalleryIndex,
}: GalleryProps) {
  const dispatch = useDispatch();

  const GalleryData = useSelector((state: any) => {
    return state.Gallery;
  });

  const [images, setImages] = useState<
    Array<{ id: string; title: string; path: string }>
  >([]);


  useEffect(() => {
    if (GalleryIndex !== null) {
      const extractedArrays = GalleryData[GalleryIndex];
      const flattenedImages = extractedArrays.flat();
      const newImages = flattenedImages.map((imageData: any, index: any) => ({
        id: imageData.id,
        title: imageData.title,
        path: imageData.path, // Assuming you have a "path" property in your data
      }));
      setImages(newImages);
    }
  }, [GalleryData, GalleryIndex]);

  

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (imageFiles.length !== files.length) {
        alert("Please select only image files.");
        return;
      }
      const newImages = imageFiles.map((file) => ({
        id: uuidv4(),
        title: file.name,
        path: URL.createObjectURL(file), // Store the URL path
      }));

      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  function CreateGallery() {
    if(GalleryIndex!==null)
    {

    }
    else
    {
      const imagePaths = images.map((image) => ({
        id: image.id,
        title: image.title,
        path: image.path,
      }));
      dispatch(addGallery(imagePaths));
      
    }
   
    setManagegallery(false);
  }
  const [selectAll, setSelectAll] = useState(false);

  // ...

  const SelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectAll(event.target.checked);
  };

  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  // ...

  const CheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setSelectedImageIds((prevSelectedIds) => [...prevSelectedIds, id]);
    } else {
      setSelectedImageIds((prevSelectedIds) =>
        prevSelectedIds.filter((imageId) => imageId !== id)
      );
    }
  };

  const DeleteSelected = () => {
    const remainingImages = images.filter(
      (image) => !selectedImageIds.includes(image.id)
    );
    setImages(remainingImages);
    setSelectedImageIds([]); // Clear selected IDs
    setSelectAll(false)
  };
  images.map((data)=>{
    console.log(data.path);
  })

  return (
    <Box p={3}>
      <Paper elevation={3}>
        <Box p={2} display="flex" justifyContent="center">
          <UploadContainer htmlFor="image-input">
            <StyledInput
              accept="image/*"
              id="image-input"
              type="file"
              multiple
              onChange={handleImageChange}
            />
            <IconButton component="span">
              <CloudUploadIcon fontSize="large" />
            </IconButton>
            <UploadText variant="body1" color="textSecondary">
              Click to upload images
            </UploadText>
          </UploadContainer>
        </Box>
      </Paper>

      <Typography variant="h4" sx={{ marginTop: "30px" }}>
        Captured Moments
      </Typography>
      <Grid display="flex" justifyContent="space-between">
        <FormControlLabel
          control={
            <Checkbox checked={selectAll} onChange={SelectAllChange} />
          }
          label="Select Images"
        />
        <Button
          variant="outlined"
          style={{ visibility: selectAll ? "visible" : "hidden" }}
          onClick={DeleteSelected}
        >
          Delete Selected
        </Button>
      </Grid>

      <UniqueImageList variant="masonry" cols={4} rowHeight={300}>
        {images.map((image, index) => (
          <ImageListItem
            key={image.id}
            cols={2}
            rows={1}
            style={{ marginBottom: 16, overflow: "hidden" }}
          >
            <HoverableCard>
              <div>
                <Box
                  component="img"
                  alt={image.title}
                  src={image.path}
                  sx={{ flex: "1 1 auto", objectFit: "cover" }}
                />
                <CheckboxWrapper>
                  <StyledCheckbox
                    style={{ visibility: selectAll || selectedImageIds.includes(image.id) ? "visible" : "hidden" }}
                    checked={selectedImageIds.includes(image.id)}
                    onChange={(event) => CheckboxChange(event, image.id)}
                  />
                </CheckboxWrapper>
                <CardContentWrapper className="titleTypography">
                  <TitleTypography>
                    {image.title.split("-").slice(0, 4).join(" ")}
                  </TitleTypography>
                  <DeleteButton
                    className="deleteButton"
                    onClick={() => handleDeleteImage(image.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </DeleteButton>
                </CardContentWrapper>
              </div>
            </HoverableCard>
          </ImageListItem>
        ))}
      </UniqueImageList>

      <Button variant="outlined" sx={{ width: "100%" }} onClick={CreateGallery}>
        Create Gallery
      </Button>
    </Box>
  );
}

export default Gallery;

import React, { useState } from "react";
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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from 'uuid';

const HoverableCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const CardContentWrapper = styled(CardContent)({
  padding: "16px",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "#ffffff",
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
  position: "absolute",
  top: "8px",
  right: "8px",
  color: "yellow"
});

const UniqueImageList = styled(ImageList)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "16px",
  marginTop: "16px",
});




// ... (other imports and styled components)

function Gallery() {
    const [images, setImages] = useState<
    Array<{ id: string; title: string; file: File }>
  >([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: uuidv4(), // Generate a unique ID
        title: file.name,
        file: file,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };
  
  const handleDeleteImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

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
  
        <UniqueImageList variant="masonry" cols={4} rowHeight={300}>
          {images.map((image, index) => (
            <ImageListItem
              key={image.id}
              cols={1}
              rows={1}
              style={{ marginBottom: 16, overflow: "hidden" }}
            >
              <HoverableCard>
                <Box
                  component="img"
                  alt={image.title}
                  src={URL.createObjectURL(new Blob([image.file]))}
                  sx={{ flex: "1 1 auto", objectFit: "cover" }}
                />
                <CardContentWrapper>
                  <Typography variant="subtitle1" color="inherit">
                    {image.title.split("-").slice(0, 4).join(" ")}
                  </Typography>
                  <DeleteButton
                    onClick={() => handleDeleteImage(image.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </DeleteButton>
                </CardContentWrapper>
              </HoverableCard>
            </ImageListItem>
          ))}
        </UniqueImageList>
      </Box>
    );
  }
  
  export default Gallery;
  
  



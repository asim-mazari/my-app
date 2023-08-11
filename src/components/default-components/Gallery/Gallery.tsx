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
import { addGallery, editGallery } from "../../../Store/GalleryClice";
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
  color: "yellow",
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

  useEffect(() => {
    if (GalleryIndex !== null) {
      const extractedArrays = GalleryData[GalleryIndex];
      const flattenedImages = extractedArrays.flat();
      setImages(flattenedImages); // Store the Blob data
    }
  }, [GalleryData, GalleryIndex]);
  const [images, setImages] = useState<
    Array<{ id: string; title: string; base64: string }>
  >([]);

  const ImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (imageFiles.length !== files.length) {
        alert("Please select only image files.");
        return;
      }
      const newImagesPromises = imageFiles.map((file) => {
        return new Promise<{ id: string; title: string; base64: string }>(
          (resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const base64Image = reader.result?.toString().split(",")[1] || "";
              resolve({
                id: uuidv4(),
                title: file.name,
                base64: base64Image,
              });
            };
            reader.onerror = (error) => {
              reject(error);
            };
          }
        );
      });

      try {
        const newImages = await Promise.all(newImagesPromises);
        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error("Error reading images:", error);
      }
    }
  };
  const DeleteImage = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    if (GalleryIndex !== null) {
      dispatch(editGallery({ index: GalleryIndex, gallery: updatedImages }));
    }
  };

  function CreateGallery() {
    if (GalleryIndex !== null) {
      dispatch(editGallery({ index: GalleryIndex, gallery: images }));
    } else {
      dispatch(addGallery(images));
    }
    setManagegallery(false);
  }
  const [selectAll, setSelectAll] = useState(false);
  const SelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
  };

  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

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
    setSelectAll(false);
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
              onChange={ImageChange}
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
          control={<Checkbox checked={selectAll} onChange={SelectAllChange} />}
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
                  src={`data:image/jpeg;base64,${image.base64}`}
                  sx={{ flex: "1 1 auto", objectFit: "cover" }}
                />
                <CheckboxWrapper>
                  <StyledCheckbox
                    style={{
                      visibility:
                        selectAll || selectedImageIds.includes(image.id)
                          ? "visible"
                          : "hidden",
                    }}
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
                    onClick={() => DeleteImage(image.id)}
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
        {GalleryIndex === null ? "Create Gallery" : "Update Gallery"}
      </Button>
    </Box>
  );
}

export default Gallery;

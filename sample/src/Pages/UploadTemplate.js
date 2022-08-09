import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button} from "@mui/material";
import "./UploadTemplate.css";

const UploadTemplate = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    useEffect(() => {
      if (selectedImage) {
        setImageUrl(URL.createObjectURL(selectedImage));
      }
    }, [selectedImage]);
 
  return (
    <div>
    <Box
    //position="fixed"
    top={0}
    left={0}
    height="100vh"
    width="100%"
    sx={{
      display: "flex",
        overflow:"auto",
        justifyContent:"center",
        flexWrap: 'wrap',
      backgroundColor: "primary.light",
      "& button": { m: 5 },
    }}
  >

    <div>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={e => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
    </div>

    <div>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: 'none' }}
        onChange={e => setSelectedImage(e.target.files[1])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
    </div>

    </Box>
    </div>
  );
};

export default UploadTemplate;
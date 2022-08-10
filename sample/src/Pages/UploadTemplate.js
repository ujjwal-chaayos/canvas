import React from "react";

import { useState, useEffect } from "react";

import {useNavigate, useParams} from 'react-router-dom'

import { Box, Button, Input, Typography } from "@mui/material";

import "./UploadTemplate.css";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
//import data from '../data/';

const UploadTemplate = () => {

  let navigate=useNavigate();
  let {screenId,tempId}=useParams();

  const [file, setFile] = useState([]);
  let dummy_data;

  async function read(file) {
    // Read the file as text
    //console.log(await file.text())
    // Read the file as ArrayBuffer to handle binary data
    //console.log(new Uint8Array(await file.arrayBuffer()));
    let finalData = new Uint8Array(await file.arrayBuffer());
    return finalData;
  }

  const handleUpload = async (event) => {
    let imgInfo = {
      imageId: "",
      imageInfo: "",
      imageType: "",
      imageContent: "",
      imageBlob: "",
    };
    imgInfo["imageBlob"] = URL.createObjectURL(event.target.files[0]);

    for (let myfile of event.target.files) {
      let comingdata = await read(myfile);
      imgInfo["imageContent"] = comingdata;
    }
    const files = event.target.files;

    imgInfo["imageInfo"] = files[0];
    imgInfo["imageType"] = files[0].name.split(".")[1];
    imgInfo["imageId"] = event.target.id;

    if (event.target.id === "template") {
      let temp = document.getElementById("template1");
      temp.setAttribute("src", URL.createObjectURL(event.target.files[0]));
      console.log(temp);
    }
    if (event.target.id === "background") {
      let temp = document.getElementById("background1");
      temp.setAttribute("src", URL.createObjectURL(event.target.files[0]));
      console.log(temp);
    }

    //console.log(URL.createObjectURL(event.target.files[0]))
    setFile([...file, [imgInfo]]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file.length === 2) {
      dummy_data = file; //condition to save data
      console.log(dummy_data);
      navigate(`/preview/${screenId}/${tempId}`)
    } else {
      alert("Insert both Images..");
    }
  };
  console.log(file);
  return (
    
    <Box

      top={0}
      left={0}
      height="100vh"
      width="100%"
      sx={{
        display: "flex",
    
        backgroundColor: "primary.light",

        "& button": { m: 5 },
      }}
    >
      <Box
        sx={{
          m: 2,
          border: 2,
          borderColor: "primary.main",
        }}
        style={{
          width: "100%",
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ color: "#303030", p: 5 }}
        >
          UPLOAD TEMPLATE & BACKGROUND IMAGE
        </Typography>
        <form
          style={{ justifyContent: "center", alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", p: 1, m: 1 }}>
            <div style={{ width: "50%" }}>
              <Button
              endIcon={<CloudUploadIcon/>}
                variant="contained"
                component="label"
                color="primary"
                alignItems="center"
                justifyContent="center"
                sx={{ display: "flex", p: 1, mx: 20 }}
              >
                {" "}
                Upload Template
                <input
                  type="file"
                  id="template"
                  name="file1"
                  onChange={(e) => handleUpload(e)}
                  hidden
                />
              </Button>
              <Box sx={{ display: "flex", p: 1, m: 1 }}>
                <img id="template1" width="100%" height="200px" />
              </Box>
            </div>
            <div style={{ width: "50%" }}>
              <Button
              endIcon={<CloudUploadIcon/>}
                variant="contained"
                component="label"
                color="primary"
                alignItems="center"
                justifyContent="center"
                sx={{ display: "flex", p: 1, mx: 20 }}
              >
                {" "}
                Upload Background
                <input
                  type="file"
                  id="background"
                  name="file2"
                  onChange={(e) => handleUpload(e)}
                  hidden
                />
              </Button>
              <Box sx={{ display: "flex", p: 1, m: 1 }}>
                <img id="background1" width="100%" height="200px" />
              </Box>
            </div>
          </Box>
          <Box sx={{ display: "flex", p: 1, m: 1, justifyContent: 'space-evenly' }}>
            <Button
              endIcon={<NavigateNextIcon/>}
              alignItems="center"
              justifyContent="center"
              variant="contained"
              type="submit"
            >
              {" "}
              NEXT{" "}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default UploadTemplate;

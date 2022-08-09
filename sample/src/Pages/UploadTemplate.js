import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Input } from "@mui/material";
import "./UploadTemplate.css";
import { blue } from "@mui/material/colors";
//import data from '../data/';

const UploadTemplate = () => {
  const [file, setFile] = useState([]);
  let dummy_data;

  async function read(file) {
    // Read the file as text
    //console.log(await file.text())
    // Read the file as ArrayBuffer to handle binary data

    console.log(new Uint8Array(await file.arrayBuffer()));
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
    let data = [];
    imgInfo["imageBlob"] = URL.createObjectURL(event.target.files[0]);

    for (let myfile of event.target.files) {
      let comingdata = await read(myfile);
      console.log(comingdata);
      imgInfo["imageContent"] = comingdata;
    }
    const files = event.target.files;
    console.log(typeof files[0]);
    imgInfo["imageInfo"] = files[0];

    imgInfo["imageType"] = files[0].name.split(".")[1];
    imgInfo["imageId"] = event.target.id;
    console.log(imgInfo);

    //console.log(URL.createObjectURL(event.target.files[0]))
    setFile([...file, [imgInfo]]);
  };
  console.log(file);

  // const removeSelectedImage = () => {
  //   setFile();
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file.length === 2) {
      dummy_data = file; //condition to save data
      console.log(dummy_data);
    } else {
      alert("Insert both Images..");
    }
  };
  return (
    <div>
      <Box
        top={0}
        left={0}
        height="100vh"
        width="100%"
        sx={{
          display: "block",
          justifyContent: "center",
          backgroundColor: "primary.light",
          "& button": { m: 5 },
        }}
      >
        <h1  sx={{
          justifyContent:"center"
      }}>UPLOAD TEMPLATE & BACKGROUND IMAGE</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="file"
            id="template"
            name="file1"
            onChange={(e) => handleUpload(e)}
          />

          {file[0] && (
            <div
              style={{
                marginTop: 50,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={file}
                style={{ maxWidth: "100%", maxHeight: 320 }}
                alt="Thumb"
              />
              <Button variant="contained">
                Remove This Image
              </Button>
            </div>
          )}

          <Input
            type="file"
            id="background"
            name="file2"
            onChange={(e) => handleUpload(e)}
          />

        {file[1] && (
            <div
              style={{
                marginTop: 50,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={ file}
                style={{ maxWidth: "100%", maxHeight: 320 }}
                alt="Thumb"
              />
              <Button variant="contained">
                Remove This Image
              </Button>
            </div>
          )}

          <Button variant="contained" type="submit">
            {" "}
            NEXT{" "}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default UploadTemplate;

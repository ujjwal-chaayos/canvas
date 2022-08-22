import React from "react";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Box, Button, Input, Typography } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import axios from 'axios';


//Create route for that function--
//import { mergeTemplateBackground } from "../Services/renderingServices";

//import data from '../data/';

const UploadTemplate = () => {
  let navigate = useNavigate();
  let { screenId, tempId } = useParams();
  let [resultImage, setResultImage] = useState("");
  let [orignalImg, setOriginalImg] = useState("");
  const [file, setFile] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
    localStorage.setItem("imageBlob", JSON.stringify(resultImage));
    localStorage.setItem("orignalImg", JSON.stringify(orignalImg));
  }, [coordinates]);
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

  const seePreview = async (e) => {
    if (resultImage !== "") {
      navigate(`/preview/${screenId}/${tempId}`);
    }
  };

  const handleSubmit = async (e) => {
    let response;
    e.preventDefault();
    console.log("i am running")
     if (file.length === 2) {
       dummy_data = file; //condition to save data
       console.log(file);
       let  formData = {
        "file1":file[0][0],
        "file2":file[1][0]
       }
       
      
      console.log(formData);
      let response = await axios.post('http://localhost:8000/uploadTemplate', formData);
        
     
    console.log(response);
    //   console.log(dummy_data);
    //   console.log(file);
    //   let { blob, blob2, sortedCoordinates } = await mergeTemplateBackground(
    //     file[0][0]["imageBlob"],
    //     file[1][0]["imageBlob"]
    //   );
    

       

    //   console.log(blob);

    //   let temp = document.getElementById("background1");

    //   let link = URL.createObjectURL(blob);
    //   let link2 = URL.createObjectURL(blob2);
    //   console.log(link, link2);
    //   setOriginalImg(link2);
    //   setResultImage(link);
    //   setCoordinates(sortedCoordinates);
    } else {
      alert("Insert both Images..");
    }
  };
  console.log("hello", resultImage);
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      height="100vh"
      width="100%"
      sx={{
        display: "flex",
        backgroundColor: "primary.light",
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
        {resultImage === "" ? (
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            align="center"
            sx={{ color: "#303030", p: 3 }}
          >
            UPLOAD TEMPLATE & BACKGROUND IMAGE
          </Typography>
        ) : (
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            align="center"
            sx={{ color: "#303030", p: 2 }}
          >
            PREVIEW OF BACKGROUND IMAGE
          </Typography>
        )}

        {resultImage === "" ? (
          <>
            <form
              style={{ justifyContent: "center", alignItems: "center" }}
              onSubmit={handleSubmit}
            >
              <Box sx={{ display: "flex", p: 1, m: 1 }}>
                <div style={{ width: "50%" }}>
                  <Button
                    endIcon={<CloudUploadIcon />}
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
                      type="file" //3,4,6,8,9
                      id="template"
                      name="file1"
                      onChange={(e) => handleUpload(e)}
                      hidden
                    />
                  </Button>
                  <Box sx={{ display: "flex", p: 1, m: 1 }}>
                    <img id="template1" width="504px" height="283px" />
                  </Box>
                </div>
                <div style={{ width: "50%" }}>
                  <Button
                    endIcon={<CloudUploadIcon />}
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
                      type="file" //504,283
                      id="background"
                      name="file2"
                      onChange={(e) => handleUpload(e)}
                      hidden
                    />
                  </Button>
                  <Box sx={{ display: "flex", p: 1, m: 1 }}>
                    <img id="background1" width="504px" height="283px" />
                  </Box>
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  p: 1,
                  m: 1,
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  endIcon={<NavigateNextIcon />}
                  alignItems="center"
                  justifyContent="center"
                  variant="contained"
                  type="submit"
                >
                  {" "}
                  SUBMIT{" "}
                </Button>
              </Box>
            </form>
          </>
        ) : (
          <Box
            style={{ marginLeft: "120px" }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                id="background1"
                src={resultImage}
                width="776px"
                height="460px"
              />
              <Button
                style={{
                  margin: "70px",
                  height: "50px",
                  justifyContent: "center",
                  marginTop: "180px",
                }}
                endIcon={<NavigateNextIcon />}
                alignItems="center"
                justifyContent="center"
                variant="contained"
                onClick={seePreview}
              >
                {" "}
                NEXT{" "}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UploadTemplate;

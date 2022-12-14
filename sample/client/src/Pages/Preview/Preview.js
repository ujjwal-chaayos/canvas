import React, { useEffect,useState } from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from 'axios';
import {useParams} from 'react-router-dom';

const Preview = ({ type, manage , allData}) => {

  let [loading,setLoading] = useState(true);
  let {screenId,tempId} = useParams();
  console.log(screenId,tempId);

  function downloadBlob(blob, name) {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    // Create a link element
    const link = document.createElement("a");
    // Set link's href to point to the Blob URL
    link.href = blob;
    link.download = name;
    // Append link to the body
    document.body.appendChild(link);
    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );
    // Remove link from body
    document.body.removeChild(link);
  }
  // Usage

  const proceed = async () => {
    if (type === "image") {
      console.log("image-n", type);
      let cafes=JSON.parse(localStorage.getItem("cafe_ids"));
      console.log(cafes);
      let response = await axios.post(
        "http://localhost:8000/getUnitMenu",
        cafes,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      manage("image-n");
    }
    if (type === "menu") {
     allData.append("screenId",screenId);
     allData.append("templateId",tempId);

      let response = await axios
      .post("http://localhost:8000/setAllItemMapping", allData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    let data = await response.data.value;
    console.log(data);

      console.log("menu-n", type);
      downloadBlob(JSON.parse(localStorage.getItem("finalMenu")), "myfile.png");
      manage("menu-n");
    }
  };
  const back = () => {
    if (type === "image") {
      console.log("image-p", type);
      manage("image-p");
    }
    if (type === "menu") {
      console.log("menu-p", type);
      manage("menu-p");
    }
  };
  return (
    <div>
      <p>Waiting for Response</p>
      <Box
        position="fixed"
        top={0}
        left={0}
        height="100%"
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "primary.light",
        }}
      >
        <div
          style={{
            display: "block",
            "align-items": "center",
            "justify-content": "center",
            width: "80%",
            margin: "1rem 0",
            "border-radius": "5px",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            align="center"
            sx={{ color: "#303030" }}
          >
            Preview of {`${type}`}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {type === "image" && (
              <img
                src={JSON.parse(localStorage.getItem("listImages"))[0]}
                id="preview-image"
                width="776px"
                height="436px"
              />
            )}
            {type === "menu" && (
              <img
                src={JSON.parse(localStorage.getItem("finalMenu"))}
                id="preview-image"
                width="776px"
                height="436px"
              />
            )}
          </Box>
          <Box sx={{ display: "flex", p: 1, m: 1 }}>
            <div style={{ width: "50%" }}>
              <Button
                variant="contained"
                component="label"
                color="primary"
                alignItems="center"
                justifyContent="center"
                startIcon={<NavigateBeforeIcon />}
                sx={{ display: "flex", p: 1, mx: 5 }}
                onClick={back}
              >
                Return Back
              </Button>
            </div>
            <div style={{ width: "50%" }}>
              <Button
                variant="contained"
                component="label"
                color="primary"
                alignItems="center"
                justifyContent="center"
                endIcon={<NavigateNextIcon />}
                sx={{ display: "flex", p: 1, mx: 5 }}
                onClick={proceed}
              >
                Proceed
              </Button>
            </div>
          </Box>
        </div>
      </Box>
    </div>
  );
};
export default Preview;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import { Typography } from "@mui/material";

import axios from "axios";
//import ldb from 'localdata';
 
//Create route for that function---
//import { drawItemText } from "../Services/renderingServices";

const ItemForm = ({ blockIds, proceed }) => {
  //console.log("here-item ", blockIds);
  let all_block_id = blockIds;
  let dummy_data = [
    { title_id: "t1", value: "CHAAT PAKORE", block_id: "" },
    { title_id: "t2", value: "SNACKS", block_id: "" },
    { title_id: "t3", value: "SANDWICHES", block_id: "" },
    { title_id: "t4", value: "DESSERTS", block_id: "" },
    { title_id: "t5", value: "MEALS", block_id: "" },
  ];
  //const [titles,setTitles]=useState(JSON.parse(localStorage.getItem("titles")));
  const [titles,setTitles]=useState(dummy_data);
  const [imgMapValue, setImgMapValue] = useState("");
  const [leftValues, setLeftValues] = useState(all_block_id);

 


  const handleFormChange = (event, index) => {
    let data = [...titles];

    // console.log(data);
    // console.log(data[index].block_id);

    data[index].block_id = event.target.value;
    setTitles(data);
    //console.log(data);
  };

  const removeSelectValue = (value) => {
    let data = leftValues;
    for (var i = 0; i < data.length; i++) {
      if (data[i] === value) {
        data.splice(i, 1);
      }
    }
   // console.log(data);
    setLeftValues(data);
    //data.remove(value);
  };

  const handleMappedValueChange = (event, index) => {
    //event.target.disabled = true;
    handleFormChange(event, index);
    removeSelectValue(event.target.value);
   // console.log(titles);
  };

 // console.log(blockIds);
  const save = async (e) => {
        // let data = await drawItemText(
    //   JSON.parse(localStorage.getItem("productImgBlob")),
    //   titles,
    //   JSON.parse(localStorage.getItem("coordinates"))
    // );
    // console.log(data);
    // let link = URL.createObjectURL(data["blob"]);
    e.preventDefault();
    let formData = new FormData();
    //let imagesList=[];
    // ldb.get("imageList", function(value)
    // {
    //   console.log(value);
    //   console.log(JSON.parse(value).length);
    //   for(var i=0;i<JSON.parse(value).length;i++)
    //   {
    //    formData.append("data:image/jpeg;base64," + JSON.parse(value[i]));
    //   }
    // })
  //console.log(imagesList);
    //formData.append(imagesList);
   // let data = [...titles];
    //formData.append(data);
    let imagesBlob = JSON.parse(localStorage.getItem("listImages"));
    console.log(imagesBlob);
    for(var i in imagesBlob){
      await fetch(imagesBlob[i])
      .then((res) => res.blob())
      .then((blob) => {
        console.log(blob.type);
        formData.append(
         "image"+i,
          new File(
            [
              blob,
              i+".png",
              {
                type: blob.type,
                lastModified: new Date().getTime(),
              },
            ],
            i+".png"
          )
        );
      });
    }
    console.log("origImg",JSON.parse(localStorage.getItem("orignalImg")));
    await fetch(JSON.parse(localStorage.getItem("orignalImg")))
      .then((res) => res.blob())
      .then((blob) => {
        console.log(blob.type);
        formData.append(
          "background",
          new File(
            [
              blob,
              "background.png",
              {
                type: blob.type,
                lastModified: new Date().getTime(),
              },
            ],
            "background.png"
          )
        );
      });
    
     formData.append('dummy_data',JSON.stringify([...titles]));
     console.log('dummy_data',[...titles]);
     formData.append("coordinates", localStorage.getItem("coordinates"));
     console.log(JSON.parse(localStorage.getItem("coordinates")));
    console.log(formData);
    let response = await axios.post(
      "http://localhost:8000/setItemMapping",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // localStorage.setItem("finalMenu", JSON.stringify(link));
    // proceed(blockIds);
  };

  return (
    <div>
      <Box
        top={0}
        left={0}
        height="100vh"
        width="100%"
        sx={{
          display: "flex",
          backgroundColor: "primary.dark",
          "& button": { m: 5 },
        }}
      >
        <Box width="60%" sx={{ 
          p: 9,
          overflow: "hidden",
          overflowY: "scroll",
         }}>
          <img
            src={JSON.parse(localStorage.getItem("backgroundWithContours"))}
            width="100%"
            height="90%"
          /><br />
          <img
            src={JSON.parse(localStorage.getItem("listImages"))[0]}
            width="100%"
            height="90%"
          />
        </Box>

        <Box
          top={0}
          left={0}
          height="100vh"
          width="30%"
          sx={{
            display: "flex",
            justifyContent: "center",

            backgroundColor: "primary.light",
            "& button": { m: 2 },
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <div>
            <Typography
              fontWeight="bold"
              variant="h5"
              align="center"
              sx={{ color: "#303030", p: 3 }}
            >
              ADD HEADING TO THE BLOCKS
            </Typography>
            <form>
              {titles.map((title, index) => {
               // console.log(title);
                return (
                  <>
                  <Box
                    sx={{
                      display: "flex",
                      p: 1,
                      m: 1,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Typography align="center" sx={{ color: "#303030", p: 3 }}>
                      Choose Block for {`${title["value"]}`}
                      <Select
                        disabled={title["block_id"] !== ""}
                        value={imgMapValue}
                        onChange={(event) =>
                          handleMappedValueChange(event, index)
                        }
                      >
                        {leftValues.map((option, index) => (
                          <MenuItem value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                      <Typography
                        variant="caption"
                        align="center"
                        sx={{ color: "#303030", p: 3 }}
                      >
                        You chose {title.block_id}
                      </Typography>
                    </Typography>
                    </Box>
                  </>
                );
              })}
              <Box
                sx={{
                  display: "flex",
                  p: 1,
                  m: 1,
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  alignItems="center"
                  justifyContent="center"
                  style={{ borderRadius: 5 }}
                  variant="contained"
                  onClick={save}
                >
                  Next
                </Button>
              </Box>
            </form>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default ItemForm;

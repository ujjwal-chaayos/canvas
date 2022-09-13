import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import { Typography } from "@mui/material";

import axios from "axios";

const ItemForm = ({ blockIds, proceed }) => {
  let all_block_id = blockIds;
  const [titles, setTitles] = useState([]);

  const getData = async () => {
    let localData=JSON.parse(localStorage.getItem("cafe_ids"));
    let id=localData[0];
    const { data } = await axios.get("https://app.chaayos.com/app-cache/unit/overall/1000/CAFE/"+id);
    console.log(data['menuSequence']['category']);
    let category_data=[...data['menuSequence']['category']];

    let new_data=[];
    for(let i in category_data){
      let item_data={"title_id":"","value":"","block_id":""}
      item_data['title_id']='t'+(i+1);
      item_data['value']=category_data[i]['name'];
      if(category_data[i]['name'] !== 'Chaayos Select' && category_data[i]['name'] !== 'Trending Now' && category_data[i]['name'] !== 'Chaayos Special' && category_data[i]['name'] !== 'New'){
        new_data.push(item_data)
      }
    }
    
    setTitles(new_data);
  };

  useEffect(()=>{
    getData();
  },[]);

 
  const [imgMapValue, setImgMapValue] = useState("");
  const [leftValues, setLeftValues] = useState(all_block_id);

  const handleFormChange = (event, index) => {
    let data = [...titles];
    data[index].block_id = event.target.value;
    setTitles(data);
  };

  const removeSelectValue = (value) => {
    let data = leftValues;
    for (var i = 0; i < data.length; i++) {
      if (data[i] === value) {
        data.splice(i, 1);
      }
    }
    setLeftValues(data);
  };

  const handleMappedValueChange = (event, index) => {
    handleFormChange(event, index);
    removeSelectValue(event.target.value);
  };

  const save = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    let imagesBlob = JSON.parse(localStorage.getItem("listImages"));
    for (var i in imagesBlob) {
      await fetch(imagesBlob[i])
        .then((res) => res.blob())
        .then((blob) => {
          formData.append(
            "image" + i,
            new File(
              [
                blob,
                i + ".png",
                {
                  type: blob.type,
                  lastModified: new Date().getTime(),
                },
              ],
              i + ".png"
            )
          );
        });
    }
    await fetch(JSON.parse(localStorage.getItem("orignalImg")))
      .then((res) => res.blob())
      .then((blob) => {
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
    await fetch(JSON.parse(localStorage.getItem("imageBlob")))
      .then((res) => res.blob())
      .then((blob) => {
        formData.append(
          "template",
          new File(
            [
              blob,
              "template.png",
              {
                type: blob.type,
                lastModified: new Date().getTime(),
              },
            ],
            "template.png"
          )
        );
      });

    formData.append("dummy_data", JSON.stringify([...titles]));
    formData.append("coordinates", localStorage.getItem("coordinates"));
    formData.append("cafeIds",  localStorage.getItem("cafe_ids"));

    let response = await axios
      .post("http://localhost:8000/setItemMapping", formData, {
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
    let myRes = [];
    myRes.push(data);
    console.log(myRes);
    let listImages = [];
    for (var b64String in myRes) {
      await fetch("data:image/jpeg;base64," + myRes[b64String])
        .then((res) => res.blob())
        .then((blob) => {
          listImages.push(window.URL.createObjectURL(blob));
        });
    }
    localStorage.setItem("finalMenu", JSON.stringify(listImages));

    proceed(blockIds,formData);
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
        <Box
          width="60%"
          sx={{
            p: 9,
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <img
            src={JSON.parse(localStorage.getItem("backgroundWithContours"))}
            width="100%"
            height="90%"
          />
          <br />
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
                      <Typography
                        align="center"
                        sx={{ color: "#303030", p: 3 }}
                      >
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

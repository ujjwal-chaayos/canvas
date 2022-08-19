import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {drawItemText} from '../Services/renderingServices';

const ItemForm = ({blockIds,proceed}) => {

  console.log("here-item ",blockIds);
  let all_block_id = blockIds;
  let dummy_data= [
    { "title_id": "t1", "value": "Chaat Pakore" ,"block_id":""},
    { "title_id": "t2", "value": "Chai Unchai" ,"block_id":""},
    { "title_id": "t3", "value": "SANDWICHES" ,"block_id":""},
    { "title_id": "t4", "value": "DESSERTS" ,"block_id":""},
    { "title_id": "t5", "value": "MEALS" ,"block_id":""}
  ]; //dummy_data coming from db for with image_id

  const [titles,setTitles]=useState(dummy_data);
  const [imgMapValue, setImgMapValue] = useState("");
  const [leftValues, setLeftValues] = useState(all_block_id);




  const handleFormChange = (event, index) => {
    let data = [...titles];

    // console.log(data);
    // console.log(data[index].block_id);

    data[index].block_id = event.target.value;
    setTitles(data);
    console.log(data);
  };

  const removeSelectValue = (value) => {
    let data = leftValues;
    for (var i = 0; i < data.length; i++) {
      if (data[i] === value) {
        data.splice(i, 1);
      }
    }
    console.log(data);
    setLeftValues(data);
    //data.remove(value);
  };
  
  const handleMappedValueChange = (event, index) => {
    //event.target.disabled = true;
    handleFormChange(event, index);
    removeSelectValue(event.target.value);
    console.log(titles)
  };


  console.log(blockIds);
  const save = async (e) => {
    console.log(titles);
    
    let data=await drawItemText(JSON.parse(localStorage.getItem('productImgBlob')), titles, JSON.parse(localStorage.getItem("coordinates")));
    console.log(data);
    let link = URL.createObjectURL(data['blob']);

    localStorage.setItem("finalMenu", JSON.stringify(link));
    proceed(blockIds);
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
    width="60%" sx={{ p: 9 }}
  >
     <img src={JSON.parse(localStorage.getItem("imageBlob"))} width="100%" height="90%" />
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
        {
          titles.map((title,index)=>
            
            {
              console.log(title)
              return (
            <>
                  <Typography
                     align="center"
                     sx={{ color: "#303030", p: 3 }}
                  >
                    Choose Block for {`${title["value"]}`}
                    <Select
                    disabled={title['block_id']!==''}
                      value={imgMapValue}
                      onChange={(event) =>
                        handleMappedValueChange(event, index)
                      }
                    >
                      {leftValues.map((option, index) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </Typography>
            </>)
            }
          )
        }
        <Box sx={{ display: "flex", p: 1, m: 1, justifyContent: 'space-evenly' }}>
        <Button alignItems="center"
              justifyContent="center" style={{ borderRadius: 5}} variant="contained" onClick={save}>Next</Button>
              </Box>
              </form>
      </div>
      </Box>
      </Box>
    </div>
  )
}

export default ItemForm

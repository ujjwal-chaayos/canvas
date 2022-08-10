import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ItemForm = ({blockIds,proceed}) => {

  console.log("here-item ",blockIds);
  let all_block_id = blockIds;
  let dummy_data= [
    { "title_id": "t1", "value": "INDIAN CHAI" ,"block_id":""},
    { "title_id": "t2", "value": "SHAKES" ,"block_id":""},
    { "title_id": "t3", "value": "THANDI CHAI" ,"block_id":""},
    { "title_id": "t4", "value": "UNCHAI" ,"block_id":""},
    { "title_id": "t5", "value": "CHAI & CHILL" ,"block_id":""}
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
  const save = (e) => {
  
    proceed(blockIds);
  };

  return (
    <div>
      <h1>ItemForm</h1>
      <div>
        <form>
        <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ color: "#303030", p: 2 }}
              >
                Upload the images for selected blocks
              </Typography>
        </form>
        {
          titles.map((title,index)=>
            
            {
              console.log(title)
              return (
            <>
                  <Typography
                    variant="h6"
                    component="h2"
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
      </div>
      <button onClick={save}>Next</button>
    </div>
  )
}

export default ItemForm

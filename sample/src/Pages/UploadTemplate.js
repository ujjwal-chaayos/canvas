import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button} from "@mui/material";
import "./UploadTemplate.css";

const UploadTemplate = () => {
  
  const [file,setFile]=useState([]);


  async function read(file) {
    // Read the file as text
    //console.log(await file.text())
    // Read the file as ArrayBuffer to handle binary data
    console.log(new Uint8Array(await file.arrayBuffer()))
    let finalData=new Uint8Array(await file.arrayBuffer());
    return finalData

  }
 

  const handleSubmit=async (event)=>{
    let imgInfo={'imageId':'','imageInfo':'','imageType':'','imageContent':'','imageBlob':''};
    let data=[];
    imgInfo['imageBlob']=URL.createObjectURL(event.target.files[0]);
    for (let myfile of event.target.files) {
      let comingdata=await read(myfile);
        console.log(comingdata);
        imgInfo['imageContent']=comingdata;
    }
    const files=event.target.files;
    console.log(typeof(files[0]))
    imgInfo['imageInfo']=files[0];
  
    imgInfo['imageType']=files[0].name.split(".")[1];
    imgInfo['imageId']=event.target.id;
    console.log(imgInfo);
  //console.log(URL.createObjectURL(event.target.files[0]))
  setFile([...file,...data])
  }
  console.log(file);
 
  return (


    <div>
    <form >
      <input type="file" id="template"  name="file1" onChange={(e)=>handleSubmit(e)} />
      <input type="file" id="background"  name="file2" onChange={(e)=>handleSubmit(e)} />
      <button type="submit" className="btn btn-info"> Update File </button>
    </form>
    </div>
  );
};

export default UploadTemplate;
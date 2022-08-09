import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button} from "@mui/material";
import "./UploadTemplate.css";
//import data from '../data/';

const UploadTemplate = () => {
  
  const [file,setFile]=useState([]);
  let dummy_data;

  async function read(file) {
    // Read the file as text
    //console.log(await file.text())
    // Read the file as ArrayBuffer to handle binary data
    console.log(new Uint8Array(await file.arrayBuffer()))
    let finalData=new Uint8Array(await file.arrayBuffer());
    return finalData;

  }
 

  const handleUpload=async (event)=>{
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
  setFile([...file,[imgInfo]])
  }
  console.log(file);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(file.length===2){
      dummy_data=file;   //condition to save data
      console.log(dummy_data)
    }
    else{
      alert("Insert both Images..");
    }

    
  }
 
  return (


    <div>
    <form onSubmit={handleSubmit}>
      <input type="file" id="template"  name="file1" onChange={(e)=>handleUpload(e)} />
      <input type="file" id="background"  name="file2" onChange={(e)=>handleUpload(e)} />
      <button type="submit"> NEXT </button>
    </form>
    </div>
  );
};

export default UploadTemplate;
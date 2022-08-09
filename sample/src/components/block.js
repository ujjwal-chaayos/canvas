import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImageForm from "../Pages/ImageForm";
import ItemForm from "../Pages/ItemForm";
import Preview from "../Pages/Preview";

const Block = () => {
  let location = useLocation();
  let navigate = useNavigate();

  let all_block_id = [
    "Select",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];

  const [ids, setIds] = useState(all_block_id);
  const [show, setShow] = useState('image');   //"image","item","preview"
  const [type, setType] = useState('template');



  const manageBlockId = (left) => {
    console.log(left);
    setIds(left);
    setShow('preview');
  };

  const manageImagePreview = (value) =>{
    //logic for return back, proceed further
    console.log("hiiiii")
  }

  const project = () => {
    switch(show) {

      case "image":   return <ImageForm blockIds={ids} proceed={manageBlockId} />;
      case "item":   return <ItemForm blockIds={ids} />;
      case "preview": return <Preview type={type} manage={manageImagePreview} />;
    

      default:      return <h1>No project match</h1>
    }
  }

  return (
    <>
     
          {project()}
    </>
  );
};

export default Block;

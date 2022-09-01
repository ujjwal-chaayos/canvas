import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImageForm from "../Pages/6-SelectImage/ImageForm";
import ItemForm from "../Pages/7-SelectItem/ItemForm";
import Preview from "../Pages/Preview/Preview";
import FinalPage from "../Pages/ThankPage/Final";
const Block = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let all_block_id = [];
  for(var i=0;i<JSON.parse(localStorage.getItem("coordinates")).length;i++)
  {
     all_block_id[i]=(i+1).toString();
  }
  //console.log(all_block_id);
  const [ids, setIds] = useState(all_block_id);
  const [show, setShow] = useState('image');   //"image","item","preview"
  const [type, setType] = useState('image');
  const manageBlockId = (left) => {
    console.log(left);
    setIds(left);
    setShow('preview');
  };
  const manageItemId = (left) => {
    console.log(left);
    setIds(left);
    setType('menu');
    setShow('preview');
  };
  const manageImagePreview = (value) =>{
    //logic for return back, proceed further
    console.log("manageImagePreview",value)
    console.log("im checking ids for previos",ids);
    switch(value) {
      case "image-n": setShow('item'); break;
      case "image-p": setShow('image'); setIds(all_block_id); break;
      case "menu-n": setShow('save'); break;
      case "menu-p":setIds(ids); setType('item'); setShow('item');  break;
   
      default:      return <h1>No project match</h1>
    }
  }
  const project = () => {
    console.log("manageShow",show)
    switch(show) {
      case "image":   return <ImageForm blockIds={ids} proceed={manageBlockId} />;
      case "item":   return <ItemForm blockIds={ids} proceed={manageItemId} />;
      case "preview": return <Preview type={type} manage={manageImagePreview}/>;
      case "save": return <FinalPage />;
   
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
import React,{useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import ImageForm from '../Pages/ImageForm'
import ItemForm from '../Pages/ItemForm'

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
        "16"
      ];
      
      const manageBlockId=()=>{
  
      }
      


  return (
    <>
            <ImageForm blockIds={all_block_id} />
            {/* <ItemForm /> */}
    </>
  )
}

export default Block
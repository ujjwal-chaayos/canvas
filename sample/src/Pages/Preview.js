import React from 'react'
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input, Typography } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Preview = ({type,manage}) => {
    console.log("Block",type);
    const proceed=()=>{
        if(type==='image'){
            console.log("image-n",type)
            manage("image-n")
        }
        if(type==='menu'){
            console.log("menu-n",type)
            manage("menu-n")
        }
    }

    const back=()=>{
        if(type==='image'){
            console.log("image-p",type)
            manage("image-p")
        }
        if(type==='menu'){
            console.log("menu-p",type)
            manage("menu-p")
        }
    }

  return (
    <div>
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
        <div style={{"display": "block",
    "align-items": "center",
    "justify-content":  "center",
    "width": "80%",
    "margin": "1rem 0",
    "border-radius": "5px",
    "cursor": "pointer"}}>
        <Typography  variant="h5"
                component="h2"
                align="center"
                sx={{ color: "#303030" }}>Preview of {`${type}`}</Typography>
                <Box sx={{ display: "flex",justifyContent:"center", p: 1, m: 1 }}>
                <img id="preview-imgage" width="776px" height="436px" />
              </Box>
              <Box sx={{ display: "flex", p: 1, m: 1 }}>
              <div style={{ width: "50%" }}>
        <Button variant="contained"
                component="label"
                color="primary"
                alignItems="center"
                justifyContent="center"
                startIcon={<NavigateBeforeIcon/>}
                sx={{ display: "flex", p: 1, mx: 5 }} onClick={back}>Return Back</Button>
                </div>
                <div style={{ width: "50%" }}>
        <Button variant="contained"
                component="label"
                color="primary"
                alignItems="center"
                justifyContent="center"
                endIcon={<NavigateNextIcon/>}
                sx={{ display: "flex", p: 1, mx: 5}} onClick={proceed}>Proceed</Button>
                </div>
                </Box>
        </div>
      </Box>  
    </div>
  )
}

export default Preview
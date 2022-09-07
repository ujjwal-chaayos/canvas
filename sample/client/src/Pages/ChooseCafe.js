import React,{useEffect,useState} from "react";
import { useTheme } from "@mui/material/styles";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Box,
  Select,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
  Typography,
} from "@mui/material";






const ChooseCafe = () => {

  const [cafe, setCafe]=useState([]);

  useEffect(()=>{

    function checkCafe(cafe) {
       return cafe['category']==='CAFE';
    }

    function checkActive(cafe) {
      return cafe['status']==='ACTIVE';
    }

    function checkLive(cafe) {
      return cafe['live']===true;
    }

    let payload={
      "employeeId":parseInt(localStorage.getItem("userIdValue")),
      "onlyActive":true
    }
    let customConfig = {
      headers: {
      'Content-Type': 'application/json'
      }
  };
    axios.post('http://dev.kettle.chaayos.com:9595/master-service/rest/v1/user-management/user/units', payload, customConfig)
    //axios.get('https://3fcf3b97-9107-4c99-a0ff-48a114bfe535.mock.pstmn.io/data')
  .then(function (response) {
    console.log(response.data);
    let data= response.data;
    let cafes = data.filter(checkCafe);
    let active = cafes.filter(checkActive);
    let isLive = active.filter(checkLive);
    console.log(isLive);
    setCafe(isLive);
   
  })
  .catch(function (error) {
    console.log(error);
  });
  },[]);

  console.log(cafe)


  const selectCafe = (e,k) =>{
     let temp_cafe=cafe;

  }



  return (
    <Box position="fixed" width="100%" height="100%" sx={{backgroundColor: 'primary.light', overflow:"hidden",overflowY:"scroll"}} >
        <Box width="100%" sx={{ justifyContent: "center", backgroundColor: 'primary.light'}} >
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            align="center"
            sx={{ color: "#303030", p: 3 }}
          >
            SELECT CAFES
          </Typography>
        </Box>
        <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap', 
                justifyContent: 'space-evenly',   
                p: 1,
                m: 1,
                bgcolor: 'background.main',     
                height: 200,
                borderRadius: 1,
              }}
            >

            { cafe.length===0 ? ( <CircularProgress />) : (
            
            cafe.map((data,key) => (
              <Typography
              variant="h6"
              component="h3"
              
              align="center"
              sx={{ color: "#303030"}}
            >
        <Box key={data['id']} sx={{p:2,m:1,backgroundColor: 'primary.light',cursor: "pointer",borderRadius: 1,
        '&:hover': {
          backgroundColor: 'primary.main',
          color: 'white',
          opacity: [0.9, 0.8, 0.7],
        }, }} onClick={(e)=>selectCafe(e,data['id'])}> {data['name']} ({data['region']})
     
      </Box>
      </Typography>
        
      )))
    }
        </Box>
    </Box>
      
  

        
          
       
      
  
  );
};

export default ChooseCafe;

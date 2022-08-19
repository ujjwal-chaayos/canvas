import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Typography } from '@mui/material';
import "./ChooseTemplate.css";

import {useNavigate,useParams} from 'react-router-dom'
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
const ChooseTemplate = () => {

  let navigate=useNavigate();
  let {screen}=useParams();

  const handleTempId=(id)=>{
        navigate(`/upload-template/${screen}/${id}`);
  }


  return (
    <div>
      <Box
        //position="fixed"
        top={0}
        left={0}
        height="100vh"
        width="100%"
        sx={{
          display: "flex",
            overflow:"auto",
            justifyContent:"center",
            flexWrap: 'wrap',
          backgroundColor: "primary.light",
          "& button": { m: 5 },
        }}
      >
        <div class="help" >
        <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "27%", borderRadius: 10 , "margin-top":"0"}}
            variant="outlined"
            size="large"
            onClick={()=>handleTempId("t1")}
          >
           <Typography variant="h6" component="h2">
              TEMPLATE 1{" "}
              <Typography variant="h5" component="h2" sx={{ color: "#303030" }}>
                BREAKFAST
              </Typography>
            </Typography>
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "27%", borderRadius: 10, "margin-top":"0" }}
            variant="outlined"
            size="large"
            onClick={()=>handleTempId("t2")}
          >
            <Typography variant="h6" component="h2">
              TEMPLATE 2{" "}
              <Typography variant="h5" component="h2" sx={{ color: "#303030" }}>
                LUNCH
              </Typography>
            </Typography>
          </Button>
        <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "27%", borderRadius: 10, "margin-top":"0" }}
            variant="outlined"
            size="large"
            onClick={()=>handleTempId("t3")}
          >
             <Typography variant="h6" component="h2">
              TEMPLATE 3{" "}
              <Typography variant="h5" component="h2" sx={{ color: "#303030" }}>
                EVENING
              </Typography>
            </Typography>
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "27%", borderRadius: 10, "margin-top":"0" }}
            variant="outlined"
            size="large"
            onClick={()=>handleTempId("t4")}
          >
            <Typography variant="h6" component="h2">
              TEMPLATE 4{" "}
              <Typography variant="h5" component="h2" sx={{ color: "#303030" }}>
                DINNER
              </Typography>
            </Typography>
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "27%", borderRadius: 10 ,"margin-top":"0"}}
            variant="outlined"
            size="large"
            onClick={()=>handleTempId("t5")}
          >
            <Typography variant="h6" component="h2">
              TEMPLATE 5{" "}
              <Typography variant="h5" component="h2" sx={{ color: "#303030" }}>
                POST DINNER
              </Typography>
            </Typography>
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "27%", borderRadius: 10, "margin-top":"0" }}
            variant="outlined"
            size="large"
            onClick={()=>handleTempId("t6")}
          >
            <Typography variant="h6" component="h2">
              TEMPLATE 6{" "}
              <Typography variant="h5" component="h2" sx={{ color: "#303030" }}>
                OVERNIGHT
              </Typography>
            </Typography>
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default ChooseTemplate;
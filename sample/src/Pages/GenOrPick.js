import React from "react";
import Box from "@mui/material/Box";
import {  Button } from "@mui/material";
import { Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import "./GenOrPick.css";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

const GenOrPick = () => {

  const choose=()=>{

  }

  return (
    <div>
      <Box
     
        top={0}
        left={0}
        height="100vh"
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "primary.light",
          "& button": { m: 5 },
        }}
      >
        <div class="help">
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "50%", borderRadius: 10 }}
            variant="outlined"
            size="large"
            onClick={choose}
          >
            <Typography variant="h4" component="h2" sx={{ color: "white" }}>
              NEW
              <Typography variant="h3" component="h2" sx={{ color: "#303030" }}>
                TEMPLATE
              </Typography>
            </Typography>
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "50%", borderRadius: 10 }}
            variant="outlined"
            size="large"
          >
            <Typography variant="h4" component="h2" sx={{ color: "white" }}>
              OLD
              <Typography variant="h3" component="h2" sx={{ color: "#303030" }}>
                TEMPLATE
              </Typography>
            </Typography>
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default GenOrPick;
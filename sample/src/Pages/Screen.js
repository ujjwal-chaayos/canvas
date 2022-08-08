import React from "react";
import Box from "@mui/material/Box";
import { Button} from "@mui/material";
import { Typography } from '@mui/material';
import "./Screen.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
const Screen = () => {
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
        <div class="help">
        <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "40%", borderRadius: 10 }}
            variant="outlined"
            size="large"
          >
           <Typography variant="h6" component="h2">
              SCREEN 1{" "}
              <Typography variant="h3" component="h2" sx={{ color: "#303030" }}>
                MAIN
              </Typography>
            </Typography>
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "40%", borderRadius: 10 }}
            variant="outlined"
            size="large"
          >
            <Typography variant="h6" component="h2">
              SCREEN 2{" "}
              <Typography variant="h3" component="h2" sx={{ color: "#303030" }}>
                OFFERS
              </Typography>
            </Typography>
          </Button>
        <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "40%", borderRadius: 10 }}
            variant="outlined"
            size="large"
          >
             <Typography variant="h6" component="h2">
              SCREEN 3{" "}
              <Typography variant="h3" component="h2" sx={{ color: "#303030" }}>
                CHAI
              </Typography>
            </Typography>
          </Button>
          <Button
            sx={{ color: "white", backgroundColor: "primary.main" }}
            style={{ minWidth: "40%", minHeight: "40%", borderRadius: 10 }}
            variant="outlined"
            size="large"
          >
            <Typography variant="h6" component="h2">
              SCREEN 4{" "}
              <Typography variant="h3" component="h2" sx={{ color: "#303030" }}>
                MEAL
              </Typography>
            </Typography>
          </Button>

        </div>
      </Box>
    </div>
  );
};
export default Screen;
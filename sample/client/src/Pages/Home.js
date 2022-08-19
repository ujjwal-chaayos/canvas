import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Avatar, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

const Home = () => {

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
        <div class="help">
          <Button
            style={{ minWidth: "50%", minHeight: "5%", borderRadius: 10 }}
            size="large"
            variant="outlined"
            sx={{ color: "white", backgroundColor: "primary.main" }}
          >
            <Link
              to={`/screen`}
              style={{ "text-decoration": "none", color: "#FFF" }}
            >
              <Typography variant="h4" component="h2">
                WELCOME TO{" "}
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{ color: "#0f0f0f" }}
                >
                  CLIPPY
                </Typography>
              </Typography>
            </Link>
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Home;

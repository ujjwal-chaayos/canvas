import React, { useState } from "react";
import { navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Final = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  return (
    <Box
      top={0}
      left={0}
      height="100vh"
      width="100%"
      sx={{
        backgroundColor: "primary.light",
        "& button": { m: 5 },
      }}
    >
      <Typography
        fontWeight="bold"
        variant="h5"
        align="center"
        sx={{ color: "#303030", p: 30 }}
      >
        YOUR MENU HAS BEEN DOWNLOADED...!!!
      </Typography>
      <Button
        variant="contained"
        component="label"
        color="primary"
        alignItems="center"
        justifyContent="center"
        sx={{ display: "flex", p: 1, mx: 20 }}
        onClick={handleHome}
      >
        Back to Homepage
      </Button>
    </Box>
  );
};

export default Final;

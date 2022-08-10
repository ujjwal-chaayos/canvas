import React from 'react'
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import { Typography } from "@mui/material";

const ItemForm = ({blockIds,proceed}) => {
  console.log(blockIds);
  const save = (e) => {
  
    proceed(blockIds);
  };

  return (
    <div>
      <Box
      top={0}
      left={0}
      height="100vh"
      width="100%"
      sx={{
        display: "flex",
        border:2,
        backgroundColor: "primary.dark",
        "& button": { m: 5 },
      }}
    >
      <Box
        top={0}
        left={0}
        height="100vh"
        width="45%"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "55%",
          backgroundColor: "primary.light",
          "& button": { m: 2 },
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
      <Typography
                variant="h5"
                component="h2"
                align="center"
                sx={{ color: "#303030", p: 3 }}
              >
                Item Form
              </Typography>
      <Button alignItems="center"
              justifyContent="center"
              variant="contained"
              type="submit" onClick={save}>Next</Button>
      </Box>
      </Box>
    </div>
  )
}

export default ItemForm

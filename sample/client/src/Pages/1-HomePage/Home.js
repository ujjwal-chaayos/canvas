import React from "react";
import {
  Box,
  Select,
  OutlinedInput,
  InputLabel,
  TextField,
  MenuItem,
  FormControl,
  Chip,
  Typography,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Home.css";




const Home = () => {


  const login = (e) => {
      e.preventDefault();
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
        <div class="help">
          <Box
            sx={{
              border: 1,
              py: 5,
              px: 15,
              borderRadius: 3,
              borderColor: "primary.main",
            }}
          >
            <Typography variant="h4" component="h2">
              WELCOME TO{" "}
              <Typography variant="h2" component="h2" sx={{ color: "#0f0f0f" }}>
                CLIPPY
              </Typography>
            </Typography>
            <form oneSubmit={login}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div
                style={{
                  justifyContent: "center",
                  backgroundColor: "primary.light",
                  display: "grid",
                
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="User Id"
                  placeholder="User Id"
                />
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  sx={{py:1}}
                />
              
              <Button type="submit" variant="contained" size="large" >Login</Button>

           
              </div>
            </Box>

               
            </form>
 
          </Box>

          <Link
            to={`/screen`}
            style={{ "text-decoration": "none", color: "#FFF" }}
          ></Link>
        </div>
      </Box>
    </div>
  );
};

export default Home;

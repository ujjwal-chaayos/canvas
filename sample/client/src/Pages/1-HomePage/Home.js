import React ,{useState} from "react";
import axios from 'axios';
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
import {useNavigate} from 'react-router-dom';




const Home = () => {

  const [userId,setUserId]=useState('');
  const navigate= useNavigate();

  const login = (e) => {
      e.preventDefault();
      let payload=userId;
      axios.post('http://localhost:8000/auth', {
          userId:payload
      })
      .then(function (response) {
        if(response.data==='Pass'){
          navigate("/screen")
        }
        else{
          navigate("/")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getUserId=(e)=>{
    console.log(e.target.value);
    let value=e.target.value;
    setUserId(value);
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
                  value={userId}
                  onChange={(e)=>getUserId(e)}
                />
               
              
              <Button type="submit" variant="contained" size="large" onClick={(e)=>login(e)}>Login</Button>

           
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

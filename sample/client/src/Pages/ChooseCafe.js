import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Box,
  Select,
  Button,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
  Typography,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

const ChooseCafe = () => {

  
    let navigate = useNavigate();
    let { screenId, tempId } = useParams();
  
    const choose = () => {
      navigate(`/upload-template/${screenId}/${tempId}`);
    };

  const [cafe, setCafe] = useState([]);
  const [allSelect, setAllSelect] = useState(false);

  useEffect(() => {
    function checkCafe(cafe) {
      return cafe["category"] === "CAFE";
    }

    function checkActive(cafe) {
      return cafe["status"] === "ACTIVE";
    }

    function checkLive(cafe) {
      cafe["select"] = false;

      return cafe["live"] === true;
    }

    let payload = {
      employeeId: parseInt(localStorage.getItem("userIdValue")),
      onlyActive: true,
    };
    let customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "http://dev.kettle.chaayos.com:9595/master-service/rest/v1/user-management/user/units",
        payload,
        customConfig
      )
      //axios.get('https://3fcf3b97-9107-4c99-a0ff-48a114bfe535.mock.pstmn.io/data')
      .then(function(response) {
        //console.log(response.data);
        let data = response.data;
        let cafes = data.filter(checkCafe);
        let active = cafes.filter(checkActive);
        let isLive = active.filter(checkLive);
        console.log("i am running again and again");
        // console.log(isLive);
        setCafe(isLive);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  //console.log(cafe)
  const selectAll = () => {
   
    let temp_cafe = [...cafe];
    let value = allSelect;
    temp_cafe.forEach(function(item, index) {
      item["select"] = !value;
    });
    setAllSelect(!allSelect);
    setCafe(temp_cafe);
  };

  const selected_cafe=(cafe)=>{

    return cafe['select']===true;
  }



  const proceed = () => {
    let temp_cafe=[...cafe];
    let filtered_cafe=temp_cafe.filter(selected_cafe);
    let id_arr=[];
    filtered_cafe.forEach(function (item, index) {
        id_arr.push(item['id']);
    });
    localStorage.setItem("cafe_ids",JSON.stringify(id_arr));
    choose();
  }

  const selectCafe = (e, k) => {
    console.log(k);
    let temp_cafe = [...cafe];
    console.log(temp_cafe);
    let cafe_detail = temp_cafe.find((cafe) => cafe["id"] === k);
    let cafe_detail_index = temp_cafe.findIndex((cafe) => cafe["id"] === k);
    console.log(cafe_detail, cafe_detail_index);
    cafe_detail["select"] = !cafe_detail["select"];
    //console.log(cafe_detail);
    temp_cafe[cafe_detail_index] = cafe_detail;
    //console.log(temp_cafe)
    setCafe(temp_cafe);
  };

  return (
    <Box
      position="fixed"
      width="100%"
      height="100%"
      sx={{
        backgroundColor: "primary.light",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "primary.light",
        }}
      >
        <Box>
          <Button
            size="large"
            variant="contained"
            sx={{ m: 3 }}
            onClick={(e) => selectAll()}
          >
            Select All
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {" "}
          <Typography
            variant="h5"
            component="h3"
            fontWeight="bold"
            align="center"
            sx={{
              color: "#303030",
              p: 2,
              mx: 9,
              my: 2,
              backgroundColor: "primary.main",
              borderRadius: 1,
            }}
          >
            SELECT CAFES
          </Typography>
        </Box>
        <Box>
          <Button size="large" variant="contained" sx={{ m: 3 }} onClick={()=>proceed()}>
            Procced
          </Button>
        </Box>
      </Box>
      
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          p: 1,
          m: 1,
          bgcolor: "background.main",
          height: 200,
          borderRadius: 1,
        }}
      >
        {cafe.length === 0 ? (
          <CircularProgress />
        ) : (
          cafe.map((data, key) => (
            <Typography
              variant="body1"
              component="h3"
              align="center"
              sx={{ color: "#303030" }}
            >
              <Box
                style={{
                  backgroundColor: `${
                    data["select"] === true ? "#E9B44C" : "#E4D6A7"
                  }`,
                }}
                key={data["id"]}
                sx={{
                  p: 1.5,
                  m: 0.5,
                  cursor: "pointer",
                  borderRadius: 1,
                  border: 1,
                  "&:hover": {
                    backgroundColor: "primary.main",

                    opacity: [0.9, 0.8, 0.7],
                  },
                }}
                onClick={(e) => selectCafe(e, data["id"])}
              >
                {" "}
                {data["name"]} ({data["region"]})
              </Box>
            </Typography>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ChooseCafe;

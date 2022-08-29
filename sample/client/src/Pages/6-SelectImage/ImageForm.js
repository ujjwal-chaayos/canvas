import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";

//Create Route for that function---
//import { drawProductImage } from "../Services/renderingServices";

const ImageForm = ({ blockIds, proceed }) => {
  console.log("here-image ", blockIds);
  let all_block_id = blockIds;

  const [qty, setQty] = useState("");
  const [imgMapValue, setImgMapValue] = useState("");
  const [saveQty, setSaveQty] = useState(false);

  const [isDisabled, setDisabled] = useState(false);
  const [bottomForm, setBottomForm] = useState(true);

  const [leftValues, setLeftValues] = useState(all_block_id);

  const [coordinate, setCoordinate] = useState([]);
  const [backgroundBlob, setBackgroundBlob] = useState("");

  useEffect(() => {
    console.log("i am in");
    const coordinate = JSON.parse(localStorage.getItem("coordinates"));
    const background = JSON.parse(localStorage.getItem("orignalImg"));

    if (coordinate && background) {
      setCoordinate(coordinate);
      setBackgroundBlob(background);
    }
  }, []);

  //TODO: save the coming product image in local storage

  let img_id = ["001", "002", "003", "004", "005", "006", "007", "008", "009"]; //dummy_data coming from db for with image_id
  let comingQty = coordinate;
  let options = [...blockIds]; //quantity of images

  const [formFields, setFormFields] = useState([]);

  const hideQtyInput = (value) => {
    setSaveQty(value);
    if (value === true) {
      setDisabled(true);
      addFields(qty);
    }
    if (value === false) {
      setDisabled(false);
    }
  };

  const handleQuantityChange = (event) => {
    setQty(event.target.value);
  };

  const handleFormChange = (event, index) => {
    let data = [...formFields];

    // console.log(data);
    // console.log(data[index].block_id);

    data[index].block_id = event.target.value;
    setFormFields(data);
    console.log(data);
  };

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const removeSelectValue = (value) => {
    let data = leftValues;
    for (var i = 0; i < data.length; i++) {
      if (data[i] === value) {
        data.splice(i, 1);
      }
    }
    console.log(data);
    setLeftValues(data);
    //data.remove(value);
  };

  const handleMappedValueChange = (event, index) => {
    // event.target.disabled = true;
    handleFormChange(event, index);
    removeSelectValue(event.target.value);
    setImgMapValue(event.target.value);
  };

  const next = () => {
    let count = 0;
    for (let i = 0; i < formFields.length; i++) {
      if (formFields[i].block_id !== "") {
        count += 1;
      }
    }
    //console.log(count,qty);

    if (count === parseInt(qty)) {
      setBottomForm(false);
      console.log(formFields);
    } else {
      alert("Fill all values...");
    }
  };

  const addFields = (quantity) => {
    let newArr = [];
    for (let i = 0; i < quantity; i++) {
      newArr.push({
        img_id: img_id[i],
        block_id: "",
      });
    }
    console.log(newArr);
    // localStorage.setItem("formFields",newArr);
    // console.log(localStorage.getItem("formFields"));
    setFormFields(newArr);
  };

  const save = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    //console.log(formFields);
    for (var i = 0; i < formFields.length; i++) {
      for (var j = 0; j < formFields[i]["image_info"].length; j++)
        formData.append(
          formFields[i]["block_id"] + "_" + j,
          formFields[i]["image_info"][j]
        );
    }
    formData.append("coordinates", JSON.stringify(coordinate));
    console.log(coordinate);
    await fetch(backgroundBlob)
      .then((res) => res.blob())
      .then((blob) => {
        console.log(blob.type);
        formData.append(
          "background",
          new File(
            [
              blob,
              "background.png",
              {
                type: blob.type,
                lastModified: new Date().getTime(),
              },
            ],
            "background.png"
          )
        );
      });

    let response = await axios.post(
      "http://localhost:8000/uploadProducts",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    let listImages=[];
    for(var b64String in response.data){
      await fetch("data:image/jpeg;base64," + response.data[b64String])
      .then((res) => res.blob())
      .then((blob) => {
        listImages.push(window.URL.createObjectURL(blob));
        // setResultImage(window.URL.createObjectURL(blob));
       //console.log(JSON.parse(localStorage.getItem("ImageWithProducts")));
      });

    }

    console.log("fetching menu");
    await  fetch("https://app.chaayos.com/app-cache/unit/overall/1000/CHAAYOS/10000")
    .then(async (res) =>{
      let sample = await res.json();
      console.log(sample);
      let menu = sample;
      let arr=[];
    for(var i in menu.menuSequence.category){
      arr.push({
        "title_id": "t"+(i+1), "value": menu.menuSequence.category[i].name  ,"block_id":""
      })
    }
    localStorage.setItem("titles",JSON.stringify(arr));
    localStorage.setItem("menu",JSON.stringify(menu));
    });
    console.log(listImages);
    localStorage.setItem("listImages",JSON.stringify(listImages));
  //  await fetch("data:image/jpeg;base64," + response.data["ImageWithProducts"])
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       localStorage.setItem("ImageWithProducts",JSON.stringify(window.URL.createObjectURL(blob))
  //       );
  //       // setResultImage(window.URL.createObjectURL(blob));
  //      console.log(JSON.parse(localStorage.getItem("ImageWithProducts")));
  //     });

    // let comingData = await drawProductImage(
    //   JSON.parse(localStorage.getItem("orignalImg")),
    //   formFields,
    //   coordinate
    // );
    // let link = URL.createObjectURL(comingData["blob"]);
    // //console.log(link);
    // console.log(typeof link);
    // console.log(formFields);
    // localStorage.setItem("productImgBlob", JSON.stringify(link));
    proceed(leftValues);
  };

  const removeFields = () => {
    let data = [];
    setFormFields(data);
  };

  async function read(file) {
    // Read the file as text
    //console.log(await file.text())
    // Read the file as ArrayBuffer to handle binary data
    //console.log(new Uint8Array(await file.arrayBuffer()));
    let finalData = new Uint8Array(await file.arrayBuffer());
    return finalData;
  }

  const handleUpload = async (event, value) => {
    let coming_block_id = event.target.name;
    let saved_block_id = value["block_id"];
    // let coming_block_id = event.target.name;
    //let saved_block_id = value["block_id"];

    // const files = event.target.files;
    let formdata = [];
    for (let i = 0; i < event.target.files.length; i++) {
      formdata.push(event.target.files[i]);
    }
    console.log(formdata);
    formFields[event.target.id]["image_info"] = formdata;
    setFormFields(formFields);
    console.log(formFields);
  };

  return (
    <Box
      top={0}
      left={0}
      sx={{
        display: "flex",

        backgroundColor: "primary.dark",
        "& button": { m: 5 },
        height: "100vh",
        width: "auto",
      }}
    >
      <Box
        top={0}
        width="40%"
        sx={{
          display: "flex",
          justifyContent: "center",

          backgroundColor: "primary.light",
          "& button": { m: 2 },
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {bottomForm ? (
          <div className="mapping" style={{ "text-align": "center" }}>
            <form style={{ justifyContent: "center", alignItems: "center" }}>
              <Typography
                fontWeight="bold"
                variant="h5"
                align="center"
                sx={{ color: "#303030", p: 3 }}
              >
                ENTER IMAGE QUANTITY
              </Typography>
              <Select
                alignItems="center"
                justifyContent="center"
                sx={{ display: "flex", p: 1, mx: 20 }}
                value={qty}
                onChange={(event) => handleQuantityChange(event)}
                disabled={saveQty}
              >
                {options.map((option, index) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select>
              <Box
                sx={{
                  display: "flex",
                  p: 1,
                  m: 1,
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => hideQtyInput(true)}
                  disabled={isDisabled}
                >
                  Submit Quantity
                </Button>
                <Button variant="contained" onClick={() => hideQtyInput(false)}>
                  Edit Quantity
                </Button>
              </Box>

              {formFields.map((form, index) => {
                console.log(form["block_id"] !== "");
                return (
                  <Box
                    sx={{
                      display: "flex",
                      p: 1,
                      m: 1,
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div key={index}>
                      <Typography
                        align="center"
                        sx={{ color: "#303030", p: 3 }}
                      >
                        Select Block for Image{form.img_id.slice(2)}
                      </Typography>

                      <Select
                        id={"select" + index}
                        disabled={form["block_id"] !== ""}
                        // disabled={form}
                        onChange={(event) =>
                          handleMappedValueChange(event, index)
                        }
                      >
                        {leftValues.map((option, index) => (
                          <MenuItem id={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>

                      <Typography
                        variant="caption"
                        align="center"
                        sx={{ color: "#303030", p: 3 }}
                      >
                        You chose {form.block_id}
                      </Typography>
                    </div>
                  </Box>
                );
              })}
            </form>
            <Box display="flex" justifyContent="space-around">
              <Button
                alignItems="center"
                justifyContent="center"
                variant="contained"
                onClick={removeFields}
              >
                Clear Data
              </Button>

              <Button
                alignItems="center"
                justifyContent="center"
                variant="contained"
                onClick={next}
              >
                NEXT
              </Button>
            </Box>
          </div>
        ) : (
          <div className="upload" style={{ width: "100%" }}>
            <form>
              <Typography
                fontWeight="bold"
                variant="h5"
                align="center"
                sx={{ color: "#303030", p: 3 }}
              >
                UPLOAD IMAGES
              </Typography>
              {formFields.map((value, index) => (
                <>
                  <Typography
                    variant="body1"
                    component="h2"
                    align="center"
                    sx={{ color: "#303030", p: 3 }}
                  >
                    Choose image for block{` ${value["block_id"]}`}
                  </Typography>
                  <Button
                    endIcon={<CloudUploadIcon />}
                    variant="contained"
                    component="label"
                    color="primary"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ display: "flex", mx: 20 }}
                  >
                    <label for={index}>UPLOAD</label>
                    <input
                      id={index}
                      type="file"
                      multiple
                      //hidden
                      name={`${value["block_id"]}`}
                      onChange={(e) => handleUpload(e, value)}
                    />
                  </Button>
                  <Box>
                    <img id={"img" + index} />
                  </Box>
                </>
              ))}
            </form>
            <br />

            <Button
              endIcon={<NavigateNextIcon />}
              alignItems="center"
              justifyContent="center"
              variant="contained"
              type="submit"
              onClick={save}
            >
              Save
            </Button>
          </div>
        )}
      </Box>
      <Box width="60%" sx={{ p: 9 }}>
        <img
          src={localStorage.getItem("returnedImgWithContours")}
          width="100%"
          height="90%"
        />
      </Box>
    </Box>
  );
};

export default ImageForm;

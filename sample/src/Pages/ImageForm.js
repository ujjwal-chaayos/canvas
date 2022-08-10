import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, MenuItem, Select, Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ImageForm = ({ blockIds, proceed }) => {
  console.log("here-image ", blockIds);
  let all_block_id = blockIds;

  const [qty, setQty] = useState("");
  const [imgMapValue, setImgMapValue] = useState("");
  const [saveQty, setSaveQty] = useState(false);

  const [isDisabled, setDisabled] = useState(false);
  const [bottomForm, setBottomForm] = useState(true);

  const [leftValues, setLeftValues] = useState(all_block_id);

  const [items, setItems] = useState([]);

useEffect(() => {
  const items = JSON.parse(localStorage.getItem('coordinates'));
  if (items) {
   setItems(items);
  }
}, []);

  let img_id = ["001", "002", "003", "004", "005", "006"]; //dummy_data coming from db for with image_id
  let comingQty = items;
  let options = [...comingQty.keys()]; //quantity of images

  console.log(options);

  

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
    //console.log(newArr);

    setFormFields(newArr);
  };

  const save = (e) => {
    e.preventDefault();
    console.log(formFields);
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
    let imgInfo = {
      imageId: "",
      imageInfo: "",
      imageType: "",
      imageContent: "",
      imageBlob: "",
    };
    imgInfo["imageBlob"] = URL.createObjectURL(event.target.files[0]);
    for (let myfile of event.target.files) {
      let comingdata = await read(myfile);
      imgInfo["imageContent"] = comingdata;
    }
    const files = event.target.files;

    imgInfo["imageInfo"] = files[0];
    imgInfo["imageType"] = files[0].name.split(".")[1];
    imgInfo["imageId"] = event.target.id;
    formFields[event.target.id]["image_info"] = imgInfo;
    setFormFields(formFields);
    // console.log(coming_block_id,saved_block_id,imgInfo,formFields)
  };

  //console.log(formFields);

  return (
    <Box
      top={0}
      left={0}
      height="100vh"
      width="100%"
      sx={{
        display: "flex",
        border: 2,
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
        {bottomForm ? (
          <div className="mapping">
            <form style={{ justifyContent: "center", alignItems: "center" }}>
              <Typography
                fontStyle="italic"
                variant="h5"
                component="h2"
                align="center"
                sx={{ color: "#303030", p: 3 }}
              >
                ENTER THE QUANTITY OF IMAGE BLOCKS
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
                      <Input
                        name="img_id"
                        placeholder="Image_ID"
                        value={form.img_id}
                      />
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
                      <Input
                        name="block_id"
                        placeholder="Enter Block Number"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.block_id}
                      />
                    </div>
                  </Box>
                );
              })}
            </form>
            <Box
              sx={{
                display: "flex",
                p: 1,
                m: 1,
                justifyContent: "space-evenly",
              }}
            >
              <Button
                alignItems="center"
                justifyContent="center"
                variant="contained"
                onClick={removeFields}
              >
                Clear Data
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                p: 1,
                m: 1,
                justifyContent: "space-evenly",
              }}
            >
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
          <div className="upload">
            <form>
              <Typography
                fontStyle="italic"
                variant="h5"
                component="h2"
                align="center"
                sx={{ color: "#303030", p: 2 }}
              >
                UPLOAD IMAGES FOR SELECTED BLOCKS
              </Typography>
              {formFields.map((value, index) => (
                <>
                  <Typography
                    variant="h6"
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
                    sx={{ display: "flex", p: 1, mx: 40}}
                  >
                    <input
                      id={index}
                      type="file"
                      //hidden
                      name={`${value["block_id"]}`}
                      onChange={(e) => handleUpload(e, value)}
                    />
                  </Button>
                </>
              ))}
            </form>
            <br />
            <Box
              sx={{
                display: "flex",
                p: 1,
                m: 1,
                justifyContent: "space-evenly",
              }}
            >
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
            </Box>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ImageForm;

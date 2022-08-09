import React, { useState, useEffect } from "react";
import { Button,Select,Input } from "@mui/material";
import { Typography } from "@mui/material";
import "./ImageForm.css";

const ImageForm = () => {
  let all_block_id = [
    "Select",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
  ];
  const [qty, setQty] = useState("");
  const [imgMapValue, setImgMapValue] = useState("");
  const [saveQty, setSaveQty] = useState(false);

  const [isDisabled, setDisabled] = useState(false);
  const [bottomForm, setBottomForm] = useState(true);

  const [leftValues, setLeftValues] = useState(all_block_id);

  let block_ids = ["1", "2", "3", "4", "5", "6"]; // dummy_data
  let img_id = ["001", "002", "003", "004", "005", "006"]; //dummy_data
  let options = ["0", "1", "2", "3", "4", "5", "6"];

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
    console.log(data[index].block_id);
    data[index].block_id = event.target.value;
    setFormFields(data);
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
    event.target.disabled = true;
    handleFormChange(event, index);
    removeSelectValue(event.target.value);
  };

  const next = () => {
    setBottomForm(false);
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

    setFormFields(newArr);
  };

  const save = (e) => {
    e.preventDefault();
  };

  const removeFields = () => {
    let data = [];
    setFormFields(data);
  };

  return (
    <div class="flex-container">

    <div class="flex-child">

      </div>
      {bottomForm ? (
        <div class="flex-child">
          <form>
            <Select
            labelId="demo-select-small"
            id="demo-select-small"
              value={qty}
              onChange={(event) => handleQuantityChange(event)}
              disabled={saveQty}
            >
              {options.map((option, index) => (
                <option value={option}>{option}</option>
              ))}
            </Select>

            <Button variant="contained" onClick={() => hideQtyInput(true)} disabled={isDisabled}>
              Submit Quantity
            </Button>
            <Button variant="contained" onClick={() => hideQtyInput(false)}>Edit Quantity</Button>
            {formFields.map((form, index) => {
              console.log(form);
              return (
                <div key={index}>
                  <Input
                    name="img_id"
                    placeholder="Image_ID"
                    value={form.img_id}
                  />
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={imgMapValue}
                    onChange={(event) => handleMappedValueChange(event, index)}
                  >
                    {leftValues.map((option, index) => (
                      <option value={option}>{option}</option>
                    ))}
                  </Select>

                  <Input
                    name="block_id"
                    placeholder="Enter Block Number"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.block_id}
                  />
                </div>
              );
            })}
          </form>

          <button onClick={removeFields}>Clear Data</button>
          <br />
          <button onClick={next}>NEXT</button>
        </div>
      ) : (
        <div className="upload">
          <button onClick={removeFields}>Clear Data</button>
          <br />
          <button onClick={save}>SAVE</button>
        </div>
      )}
    </div>
  );
};

export default ImageForm;

import React, { useState, useEffect } from "react";

const ImageForm = ({blockIds,proceed}) => {

  console.log("here",blockIds);
  let all_block_id = blockIds;

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
    event.target.disabled = true;
    handleFormChange(event, index);
    removeSelectValue(event.target.value);
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
    <div>
      {bottomForm ? (
        <div className="mapping">
          <form>
            <select
              value={qty}
              onChange={(event) => handleQuantityChange(event)}
              disabled={saveQty}
            >
              {options.map((option, index) => (
                <option value={option}>{option}</option>
              ))}
            </select>

            <button onClick={() => hideQtyInput(true)} disabled={isDisabled}>
              Submit Quantity
            </button>
            <button onClick={() => hideQtyInput(false)}>Edit Quantity</button>
            {formFields.map((form, index) => {
              //console.log(form);
              return (
                <div key={index}>
                  <input
                    name="img_id"
                    placeholder="Image_ID"
                    value={form.img_id}
                  />
                  <select
                    value={imgMapValue}
                    onChange={(event) => handleMappedValueChange(event, index)}
                  >
                    {leftValues.map((option, index) => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>

                  <input
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
          <form>
            {formFields.map((value, index) => (
              <>
                <p>Choose image for block{` ${value["block_id"]}`}</p>
                <input
                  id={index}
                  type="file"
                  name={`${value["block_id"]}`}
                  onChange={(e) => handleUpload(e, value)}
                />
              </>
            ))}
          </form>

          <br />
          <button onClick={save}>SAVE</button>
        </div>
      )}
    </div>
  );
};

export default ImageForm;

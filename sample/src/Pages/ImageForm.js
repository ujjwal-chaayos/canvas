import React, { useState } from "react";

const ImageForm = () => {
  const [qty, setQty] = useState("");
  const [saveQty, setSaveQty] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [bottomForm, setBottomForm] = useState(true);

  let img_id = ["001", "002", "003", "004", "005", "006"];
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
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
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

  const save = (e)=>{
    e.preventDefault();
  }

  const removeFields = () => {
    let data = [];
    setFormFields(data);
  };
 

  return (
    <div>{
            bottomForm ?
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
                  console.log(form);
                  return (
                    <div key={index}>
                      <input
                        name="name"
                        placeholder="Name"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.img_id}
                      />
                      <input
                        name="age"
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
    
            :
    
        <div className="upload">
                
                
      
            <button onClick={removeFields}>Clear Data</button>
            <br />
            <button onClick={save}>SAVE</button>
          </div>
        }

    </div>

  );
};

export default ImageForm;

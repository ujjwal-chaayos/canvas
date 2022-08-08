import React,{useState,useEffect} from 'react'

const ImageForm = () => {
    const [qty,setQty]=useState("");
    const [saveQty,setSaveQty]=useState(false);

    useEffect(() => {
      
    console.log("i got ",qty);


    }, [qty])
    

    const [formFields, setFormFields] = useState([
        { img_id: '001', block_id: '' },{ img_id: '002', block_id: '' },{ img_id: '003', block_id: '' },{ img_id: '004', block_id: '' },{ img_id: '005', block_id: '' },{ img_id: '006', block_id: '' }
      ])

      const hideQtyInput=(value)=>{
        setSaveQty(value);
      }

      const handleQuantityChange=(event)=>{
        setQty(event.target.value);
        
      }
    
      const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
      }
    
      const submit = (e) => {
        e.preventDefault();
        console.log(formFields)
      }
    
      const addFields = () => {
        let object = {
          name: '',
          age: ''
        }
    
        setFormFields([...formFields, object])
      }
    
      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
      }
      
    
      return (
        <div className="App">
          <form onSubmit={submit}>
          <input
                    name='qty'
                    placeholder='Enter Image Quantity'
                    onChange={event => handleQuantityChange(event)}
                    value={qty}
                    readOnly={saveQty}
                  />
                  <button onClick={()=>hideQtyInput(true)}>Submit Quantity</button>
                  <button onClick={()=>hideQtyInput(false)}>Edit Quantity</button>
            {formFields.map((form, index) => {
              return (
                <div key={index}>
                  <input
                    name='name'
                    placeholder='Name'
                    onChange={event => handleFormChange(event, index)}
                    value={form.name}
                  />
                  <input
                    name='age'
                    placeholder='Age'
                    onChange={event => handleFormChange(event, index)}
                    value={form.age}
                  />
                  <button onClick={() => removeFields(index)}>Remove</button>
                </div>
              )
            })}
          </form>
          <button onClick={addFields}>Add More..</button>
          <br />
          <button onClick={submit}>Submit</button>
        </div>
      );
}

export default ImageForm
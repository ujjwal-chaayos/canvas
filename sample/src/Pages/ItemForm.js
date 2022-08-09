import React from 'react'

const ItemForm = ({blockIds,proceed}) => {
  console.log(blockIds);
  const save = (e) => {
  
    proceed(blockIds);
  };

  return (
    <div>
      <h1>ItemForm</h1>
      <button onClick={save}>Next</button>
    </div>
  )
}

export default ItemForm

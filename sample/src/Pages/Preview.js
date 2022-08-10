import React from 'react'

const Preview = ({type,manage}) => {
    console.log("Block",type);
    const proceed=()=>{
        if(type==='image'){
            console.log("image-n",type)
            manage("image-n")
        }
        if(type==='menu'){
            console.log("menu-n",type)
            manage("menu-n")
        }
    }

    const back=()=>{
        if(type==='image'){
            console.log("image-p",type)
            manage("image-p")
        }
        if(type==='menu'){
            console.log("menu-p",type)
            manage("menu-p")
        }
    }

  return (
    <div>
        <h1>Preview of {`${type}`}</h1>
        <button onClick={proceed}>Proceed for menu</button>
        <button onClick={back}>Return back</button>
    </div>
  )
}

export default Preview
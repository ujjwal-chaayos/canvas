import React from 'react'
import {Routes,Route} from 'react-router-dom'
import GenOrPick from './Pages/GenOrPick'
import Home from './Pages/Home'


const AllRoutes = () => {
    return (
      <Routes>
          {/* <Route path="/" element={<Home/>}/> */}
          <Route path="/" element={<GenOrPick/>}/>
      </Routes>
    )
  }
  
  export default AllRoutes
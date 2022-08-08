import React from 'react'
import {Routes,Route} from 'react-router-dom'
import GenOrPick from './Pages/GenOrPick'
import Screen from './Pages/Screen'
import Home from './Pages/Home'
import ImageForm from './Pages/ImageForm'


const AllRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/screen" element={<Screen/>}/>
          <Route path="/pick/:screenId" element={<GenOrPick/>}/>
          <Route path="/image/:screenId/:tempId" element={<ImageForm/>}/>
      </Routes>
    )
  }
  
  export default AllRoutes
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import GenOrPick from './Pages/GenOrPick'
import Screen from './Pages/Screen'
import Home from './Pages/Home'

import ChooseTemplate from './Pages/ChooseTemplate'
import UploadTemplate from './Pages/UploadTemplate'
import ImageForm from './Pages/ImageForm'



const AllRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/screen" element={<Screen/>}/>
          <Route path="/pick" element={<GenOrPick/>}/>
          <Route path="/select-template" element={<ChooseTemplate/>}/>
          <Route path="/upload-template" element={<UploadTemplate/>}/>
          <Route path="/image/:screenId/:tempId" element={<ImageForm/>}/>
      </Routes>
    )
  }
  
  export default AllRoutes
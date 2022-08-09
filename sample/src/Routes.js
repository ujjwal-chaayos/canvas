import React from 'react'
import {Routes,Route} from 'react-router-dom'
import GenOrPick from './Pages/GenOrPick'
import Screen from './Pages/Screen'
import Home from './Pages/Home'
import Test from './components/Test'

import ChooseTemplate from './Pages/ChooseTemplate'
import UploadTemplate from './Pages/UploadTemplate'
import ImageForm from './Pages/ImageForm'



const AllRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/screen" element={<Screen/>}/>
          <Route path="/pick/:screen" element={<GenOrPick/>}/>
          <Route path="/select-template/:screen" element={<ChooseTemplate/>}/>
          <Route path="/upload-template/:screenId/:tempId" element={<UploadTemplate/>}/>
          <Route path="/image/:screenId/:tempId" element={<ImageForm/>}/>
          <Route path="/testing" element={<Test/>}/>

      </Routes>
    )
  }
  
  export default AllRoutes
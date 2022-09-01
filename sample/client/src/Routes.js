import React from 'react'
import {Routes,Route} from 'react-router-dom'
import GenOrPick from './Pages/GenOrPick'
import Screen from './Pages/Screen'
import Home from './Pages/Home'
import Test from './components/Test'

import ChooseTemplate from './Pages/ChooseTemplate'
import UploadTemplate from './Pages/UploadTemplate'
import ImageForm from './Pages/ImageForm'
import ItemForm from './Pages/ItemForm'

import Final from './Pages/Final'

import Block from './components/block'
import ChooseCafe from './Pages/ChooseCafe'
import Loading from './Pages/Preview/Loading'




const AllRoutes = () => {
    return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/screen" element={<Screen/>}/>
          <Route path="/pick/:screen" element={<GenOrPick/>}/>
          <Route path="/select-cafe" element={<ChooseCafe/>}/>
          <Route path="/select-template/:screen" element={<ChooseTemplate/>}/>

          <Route path="/upload-template/:screenId/:tempId" element={<UploadTemplate/>}/>
          
          <Route path="/preview/:screenId/:tempId" element={<Block/>}/>
          
          <Route path="/image/:screenId/:tempId" element={<ImageForm/>}/>
          <Route path="/item/:screenId/:tempId" element={<ItemForm/>}/>
        

          
          <Route path="/testing" element={<Final/>}/>


      </Routes>
    )
  }
  
  export default AllRoutes
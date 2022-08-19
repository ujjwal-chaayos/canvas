import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../Pages/1-HomePage/Home";
import Screen from "../Pages/2-ScreenPage/Screen";
import GenOrPick from "../Pages/3-PickTemplate/GenOrPick";

import ChooseTemplate from "../Pages/4-TemplatePage/ChooseTemplate";
import UploadTemplate from "../Pages/5-UploadTemplate/UploadTemplate";
// import ImageForm from "./Pages/ImageForm";
// import ItemForm from "./Pages/ItemForm";

import Final from "../Pages/ThankPage/Final";

import Block from "../components/block";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/screen" element={<Screen />} />
      <Route path="/pick/:screen" element={<GenOrPick />} />
      <Route path="/select-template/:screen" element={<ChooseTemplate />} />
      <Route
        path="/upload-template/:screenId/:tempId"
        element={<UploadTemplate />}
      />

      <Route path="/preview/:screenId/:tempId" element={<Block />} />

      {/* <Route path="/image/:screenId/:tempId" element={<ImageForm/>}/>
          <Route path="/item/:screenId/:tempId" element={<ItemForm/>}/> */}
    </Routes>
  );
};

export default AllRoutes;

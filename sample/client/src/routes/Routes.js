import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../Pages/1-HomePage/Home";
import Screen from "../Pages/2-ScreenPage/Screen";
import ChooseCafe from "../Pages/ChooseCafe"
import GenOrPick from "../Pages/3-PickTemplate/GenOrPick";

import ChooseTemplate from "../Pages/4-TemplatePage/ChooseTemplate";
import UploadTemplate from "../Pages/5-UploadTemplate/UploadTemplate";


import Final from "../Pages/ThankPage/Final";

import Block from "../components/block";

import { useState, useEffect } from "react";

const AllRoutes = () => {

  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("userId")
  );

  useEffect(()=>{
    console.log(localStorage.getItem("userId"))
    setAuthenticated(localStorage.getItem("userId"));
  },[]);
  console.log("i am called")
  return (
    <Routes>
      <Route path="/" element={  <Home />  } />
      
      {authenticated === "Pass" ? (
        <Route path="/screen" element={<Screen />} />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
      {authenticated === "Pass" ? (
        <Route path="/chooseCafe/:screenId/:tempId" element={<ChooseCafe />} />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
      {authenticated === "Pass" ? (
        <Route path="/pick/:screen" element={<GenOrPick />} />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
      {authenticated === "Pass" ? (
        <Route path="/select-template/:screen" element={<ChooseTemplate />} />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
      {authenticated === "Pass" ? (
        <Route
          path="/upload-template/:screenId/:tempId"
          element={<UploadTemplate />}
        />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
      {authenticated === "Pass" ? (
        <Route path="/preview/:screenId/:tempId" element={<Block />} />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
        <Route path="/chooseCafe" element={<ChooseCafe />} />

    </Routes>
  );
};

export default AllRoutes;

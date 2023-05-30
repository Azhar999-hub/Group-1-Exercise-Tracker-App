import React from "react";

import { BrowserRouter, Route, Routes,} from "react-router-dom";

import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

import PageNotFound from "./Pagenotfound";
import ProtectedRoute from "./Protectedrouter";



const Approuter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard/*" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Approuter;

import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Details from './Details';
import Home from "./Home";
import Map from "./Map";


function App() {

  return (
    <Routes>
      <Route path="/details/:media/:id" element={<Details />}></Route>
      <Route path="/map" element={<Map />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  )
}

export default App

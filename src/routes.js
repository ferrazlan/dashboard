import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Cards" element={<Cards/>}/>
            </Routes>
        </BrowserRouter>
    )

}
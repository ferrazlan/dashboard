import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import NovoCard from "./pages/NovoCard";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/tarefas" element={<Cards/>}/>
                <Route path="/tarefa/novo/:cardId" element={<NovoCard/>}/>
            </Routes>
        </BrowserRouter>
    );

}
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Pages/LandingPage";
import ToDoPage from "../Pages/ToDoPage";


function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<ToDoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;
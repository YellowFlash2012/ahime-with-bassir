import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer} from "react-toastify";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";

import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
      <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;

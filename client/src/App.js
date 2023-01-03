import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer} from "react-toastify";


import NavbarComp from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";

import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";


function App() {
    return (
        <BrowserRouter>
            
        <NavbarComp/>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/product/:slug" element={<Product />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

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
import Shipping from "./pages/Shipping";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentMethod from "./pages/PaymentMethod";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Orders from "./pages/Orders";


function App() {
    return (
        <BrowserRouter>
            
        <NavbarComp/>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/product/:slug" element={<Product />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route path="/shipping" element={<Shipping />} />

                <Route path="/payment" element={<PaymentMethod />} />

                <Route path="/place-order" element={<PlaceOrder />} />

                <Route path="/order/:id" element={<Order />} />
                
                <Route path="/orders" element={<Orders />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer />
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

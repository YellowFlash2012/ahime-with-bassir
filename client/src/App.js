import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

// import NavbarComp from "./components/Navbar";
// import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
// import Product from "./pages/Product";

// import Footer from "./components/Footer";
// import Cart from "./pages/Cart";
// import Shipping from "./pages/Shipping";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import PaymentMethod from "./pages/PaymentMethod";
// import PlaceOrder from "./pages/PlaceOrder";
// import Order from "./pages/Order";
// import Orders from "./pages/Orders";
// import Profile from "./pages/Profile";
// import Search from "./pages/Search";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoutes from "./components/AdminRoutes";
import SellerRoutes from "./components/SellerRoutes";
// import Dashboard from "./pages/admin/Dashboard";
// import ProductsList from "./pages/admin/ProductsList";
// import UsersList from "./pages/admin/UsersList";
// import OrdersList from "./pages/admin/OrdersList";
// import ProductEdit from "./pages/admin/ProductEdit";
// import EditUser from "./pages/admin/EditUser";
import MoonLoader from "react-spinners/MoonLoader";

import "react-toastify/dist/ReactToastify.css";

const Map = lazy(() => import("./pages/Map"));
const NavbarComp = lazy(() => import("./components/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Product = lazy(() => import("./pages/Product"));
const Footer = lazy(() => import("./components/Footer"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const PaymentMethod = lazy(() => import("./pages/PaymentMethod"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Order = lazy(() => import("./pages/Order"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/Search"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProductsList = lazy(() => import("./pages/admin/ProductsList"));
const UsersList = lazy(() => import("./pages/admin/UsersList"));
const OrdersList = lazy(() => import("./pages/admin/OrdersList"));
const ProductEdit = lazy(() => import("./pages/admin/ProductEdit"));
const EditUser = lazy(() => import("./pages/admin/EditUser"));

function App() {
    return (
        <Suspense fallback={<MoonLoader />}>
            <BrowserRouter>
                <NavbarComp />
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/product/:slug" element={<Product />} />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoutes>
                                <Profile />
                            </ProtectedRoutes>
                        }
                    />

                    <Route path="/shipping" element={<Shipping />} />

                    <Route path="/payment" element={<PaymentMethod />} />

                    <Route path="/place-order" element={<PlaceOrder />} />

                    <Route
                        path="/order/:id"
                        element={
                            <ProtectedRoutes>
                                <Order />
                            </ProtectedRoutes>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoutes>
                                <Orders />
                            </ProtectedRoutes>
                        }
                    />

                    <Route
                        path="/map"
                        element={
                            <ProtectedRoutes>
                                <Map />
                            </ProtectedRoutes>
                        }
                    />

                    <Route path="/search" element={<Search />} />

                    <Route path="*" element={<NotFound />} />

                    {/* Admin routes */}

                    <Route
                        path="/admin/dashboard"
                        element={
                            <AdminRoutes>
                                <Dashboard />
                            </AdminRoutes>
                        }
                    />

                    <Route
                        path="/admin/products-list"
                        element={
                            <AdminRoutes>
                                <ProductsList />
                            </AdminRoutes>
                        }
                    />

                    <Route
                        path="/admin/product/:id"
                        element={
                            <AdminRoutes>
                                <ProductEdit />
                            </AdminRoutes>
                        }
                    />

                    <Route
                        path="/admin/users-list"
                        element={
                            <AdminRoutes>
                                <UsersList />
                            </AdminRoutes>
                        }
                    />

                    <Route
                        path="/admin/user/:id"
                        element={
                            <AdminRoutes>
                                <EditUser />
                            </AdminRoutes>
                        }
                    />

                    <Route
                        path="/admin/orders-list"
                        element={
                            <AdminRoutes>
                                <OrdersList />
                            </AdminRoutes>
                        }
                    />

                    {/* seller routes */}
                    <Route
                        path="/seller/products-list"
                        element={
                            <SellerRoutes>
                                <ProductsList />
                            </SellerRoutes>
                        }
                    />

                    <Route
                        path="/seller/orders-list"
                        element={
                            <SellerRoutes>
                                <OrdersList />
                            </SellerRoutes>
                        }
                    />
                </Routes>
                <ToastContainer />
                <Footer />
            </BrowserRouter>
        </Suspense>
    );
}

export default App;

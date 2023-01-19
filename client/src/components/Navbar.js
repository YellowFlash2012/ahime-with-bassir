import { useEffect, useState } from "react";
import {Navbar, Container, Nav, Badge, NavDropdown, Button, NavItem, NavLink} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";

import {LinkContainer} from "react-router-bootstrap"
import { Link } from "react-router-dom";
import { logout } from "../features/authSlice";
import { resetCart } from "../features/cartSlice";
import { getAllCategoriess } from "../features/productsSlice";
import SearchBox from "./SearchBox";


const NavbarComp = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    

    const { cartItems } = useSelector(store => store.cart);

    const { user } = useSelector(store => store.auth);
    const { categories } = useSelector((store) => store.products);

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(resetCart())
    }

    useEffect(() => {
        dispatch(getAllCategoriess())
    },[])

    return (
        <div
            className={
                sidebarOpen
                    ? "d-flex flex-column site-container active-container"
                    : "d-flex flex-column site-container"
            }
        >
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Button
                            variant="dark"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </Button>
                        <LinkContainer to="/">
                            <Navbar.Brand>Jessica Store</Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <SearchBox/>
                            <Nav className="me-auto w-100 justify-content-end">
                                <Link to="/cart" className="nav-link">
                                    Cart
                                    {cartItems.length > 0 && (
                                        <Badge pill bg="success">
                                            {cartItems.reduce(
                                                (a, b) => a + b.qty,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Link>

                                {user ? (
                                    <NavDropdown
                                        title={user.name}
                                        id="basic-nav-dropdown"
                                    >
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/orders">
                                            <NavDropdown.Item>
                                                Order History
                                            </NavDropdown.Item>
                                        </LinkContainer>

                                        <NavDropdown.Divider />
                                        <Link
                                            className="dropdown-item"
                                            to="#"
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </Link>
                                    </NavDropdown>
                                ) : (
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <div
                className={
                    sidebarOpen
                        ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
                        : "side-navbar d-flex justify-content-between flex-wrap flex-column"
                }
            >
                <Nav className="flex-column text-white w-100 p-2">
                    <NavItem><strong>Categories</strong></NavItem>

                    {categories.map(category => (
                        <NavItem key={category}>
                            <LinkContainer to={{pathname:"/search", hash:"#hash", search:`category=${category}`}} onClick={()=>setSidebarOpen(false)}>
                                <NavLink>{category}</NavLink>
                            </LinkContainer>
                        </NavItem>
                    ))}
                </Nav>
            </div>
        </div>
    );
};
export default NavbarComp;

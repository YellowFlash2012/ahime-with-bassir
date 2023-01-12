import {Navbar, Container, Nav, Badge, NavDropdown} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";

import {LinkContainer} from "react-router-bootstrap"
import { Link } from "react-router-dom";
import { logout } from "../features/authSlice";
import { resetCart } from "../features/cartSlice";


const NavbarComp = () => {
    const { cartItems } = useSelector(store => store.cart);

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(resetCart())
    }

    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Jessica Store</Navbar.Brand>
                        </LinkContainer>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        
                        <Navbar.Collapse id="basic-navbar-nav">


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
        </div>
    );
};
export default NavbarComp;

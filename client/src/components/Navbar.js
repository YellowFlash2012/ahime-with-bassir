import {Navbar, Container, Nav, Badge} from "react-bootstrap"
import { useSelector } from "react-redux";

import {LinkContainer} from "react-router-bootstrap"
import { Link } from "react-router-dom";


const NavbarComp = () => {
    const { cartItems } = useSelector(store => store.cart);

    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Jessica Store</Navbar.Brand>
                        </LinkContainer>

                        <Nav className="me-auto">
                            <Link to="/cart" className="nav-link">
                                Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg="success">
                                        {cartItems.reduce((a,b)=>a+b.qty,0)}
                                    </Badge>
                                )}
                            </Link>
                        </Nav>
                    </Container>
                </Navbar>
            
            </header>
        </div>
    );
};
export default NavbarComp;

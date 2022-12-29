import {Navbar, Container} from "react-bootstrap"

import {LinkContainer} from "react-router-bootstrap"


const NavbarComp = () => {
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>Jessica Store</Navbar.Brand>
                        </LinkContainer>
                    </Container>
                </Navbar>
            
            </header>
        </div>
    );
};
export default NavbarComp;

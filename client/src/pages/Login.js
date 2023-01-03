import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";

const Login = () => {
    const { search } = useLocation();

    const redirectInUrl = new URLSearchParams(search).get('redirect');

    const redirect = redirectInUrl ? redirectInUrl : "/";
    
    return <>
        <Container className="small-container">
            <Helmet>
                <title>Login</title>
            </Helmet>

            <h1 className="my-3">Login</h1>

            <Form>
                <FormGroup className="mb-3" controlId="email">
                    <FormLabel>Email</FormLabel>

                    <FormControl type="email" placeholder="Enter your email..." required />
                </FormGroup>
                
                <FormGroup className="mb-3" controlId="password">
                    <FormLabel>Password</FormLabel>

                    <FormControl type="password" placeholder="Enter your password..." required />
                </FormGroup>

                <div className="mb-3">
                    <Button>Login</Button>
                </div>
                
                <div className="mb-3">
                    New customer?{" "}
                    <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                </div>
            </Form>
    </Container>
    </>;
};
export default Login;

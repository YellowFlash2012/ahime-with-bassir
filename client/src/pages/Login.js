import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import MoonLoading from "../components/MoonLoading";
import { loginUser } from "../features/authSlice";

const Login = () => {
    const { user, loading, isError, error } = useSelector(store => store.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectInUrl = new URLSearchParams(search).get('redirect');

    const redirect = redirectInUrl ? redirectInUrl : "/";

    const loginHandler = async (e) => {
        e.preventDefault()

        // console.log(email,password);

        dispatch(loginUser({ email, password }))
        
        // console.log(isError);
        // console.log(user);
        if (!isError && !user.isAdmin) {
            navigate(redirect || "/");
        } 
    }

    useEffect(() => {
        if (user) {
            navigate(redirect)

            return;
        }
    },[navigate, redirect, user])

    return (
        <>
            <Container className="small-container">
                <Helmet>
                    <title>Login</title>
                </Helmet>

                <h1 className="my-3">Login</h1>

                <Form onSubmit={loginHandler}>
                    <FormGroup className="mb-3" controlId="email">
                        <FormLabel>Email</FormLabel>

                        <FormControl
                            type="email"
                            placeholder="Enter your email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="password">
                        <FormLabel>Password</FormLabel>

                        <FormControl
                            type="password"
                            placeholder="Enter your password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <div className="mb-3">
                        <Button type="submit" className="btn-standard">
                            {loading ? (<MoonLoading/>) : "Login"}
                        </Button>
                    </div>

                    <div className="mb-3">
                        New customer?{" "}
                        <Link to={`/signup?redirect=${redirect}`}>
                            Create your account
                        </Link>
                    </div>
                </Form>
            </Container>
        </>
    );
};
export default Login;

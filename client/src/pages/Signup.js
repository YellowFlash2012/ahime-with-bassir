import { useEffect, useState } from "react";
import {
    Button,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { loginUser, signupUser } from "../features/authSlice";

const Signup = () => {
    const { user, loading, isError, error } = useSelector(
        (store) => store.auth
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectInUrl = new URLSearchParams(search).get("redirect");

    const redirect = redirectInUrl ? redirectInUrl : "/";

    const signupHandler = async (e) => {
        e.preventDefault();

        // console.log(email, password);

        if (password !== cpassword) {
            toast.error("Password don't match!")
            return;
        }

        dispatch(signupUser({name, email, password }));

        console.log(isError);
        
        if (!isError) {
            dispatch(loginUser({email,password}))
            navigate(redirect || "/");
        }
    };

    useEffect(() => {
        if (user) {
            navigate(redirect);
        }
    }, [navigate, redirect, user]);

    return (
        <>
            <Container className="small-container">
                <Helmet>
                    <title>Sign up</title>
                </Helmet>

                <h1 className="my-3">Sign up</h1>

                <Form onSubmit={signupHandler}>
                    <FormGroup className="mb-3" controlId="name">
                        <FormLabel>Full Name</FormLabel>

                        <FormControl
                            type="text"
                            placeholder="Enter your full name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormGroup>

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
                    
                    <FormGroup className="mb-3" controlId="cpassword">
                        <FormLabel>Confirm Password</FormLabel>

                        <FormControl
                            type="password"
                            placeholder="Re-enter your password..."
                            value={cpassword}
                            onChange={(e) => setCPassword(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <div className="mb-3">
                        <Button type="submit">
                            {loading ? (<Loading/>) : "Sign Up"}
                        </Button>
                    </div>

                    <div className="mb-3">
                        Existing customer?{" "}
                        <Link to={`/login?redirect=${redirect}`}>
                            Log into your account
                        </Link>
                    </div>
                </Form>
            </Container>
        </>
    );
};
export default Signup;

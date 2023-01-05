import { useEffect, useState } from "react";
import { Button, Container, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../features/cartSlice";

const Shipping = () => {
    const { user } = useSelector(store => store.auth);
    const { shippingAddress } = useSelector((store) => store.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login?redirect=/shipping")
        }
    },[navigate, user])

    const [fullName, setFullName] = useState(user?.name || "");
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");
    

    const shippingHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingAddress())

        localStorage.setItem("shippingAddress", JSON.stringify({
            fullName, address, city, postalCode, country
        }))

        navigate("/payment")
    }
    
    return <Container>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>

        <CheckoutSteps step1 step2></CheckoutSteps>

        <h1 className="my-3">Shipping Address</h1>

        <Form onSubmit={shippingHandler}>
            <FormGroup className="mb-3" controlId="fullName">
                <FormLabel>Full name</FormLabel>

                <FormControl value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Enter your full name..." required></FormControl>
            </FormGroup>
            
            <FormGroup className="mb-3" controlId="address">
                <FormLabel>Address</FormLabel>

                <FormControl value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter your address..." required></FormControl>
            </FormGroup>
            
            <FormGroup className="mb-3" controlId="city">
                <FormLabel>City</FormLabel>

                <FormControl value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter your city...' required></FormControl>
            </FormGroup>
            
            <FormGroup className="mb-3" controlId="postalCode">
                <FormLabel>Postal Code</FormLabel>

                <FormControl value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} placeholder='Enter your postal code...' required></FormControl>
            </FormGroup>
            
            <FormGroup className="mb-3" controlId="country">
                <FormLabel>Country</FormLabel>

                <FormControl value={country} onChange={(e)=>setCountry(e.target.value)} placeholder='Enter your country...' required></FormControl>
            </FormGroup>

            <div className="mb-3">
                <Button variant="primary" type="submit">Continue</Button>
            </div>
        </Form>
    </Container>;
};
export default Shipping;

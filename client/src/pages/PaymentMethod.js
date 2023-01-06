import { useEffect, useState } from "react";
import { Button, Form, FormCheck } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../features/cartSlice";

const PaymentMethod = () => {
    
    const { shippingAddress, paymentMethod } = useSelector((store) => store.cart);
    
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "Paypal");
    console.log(shippingAddress);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shippingAddress.address) {
            
            navigate("/shipping");
        }
    }, [navigate, shippingAddress]);

    const paymentHandler = (e) => {
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethodName));

        localStorage.setItem("paymentMethod", paymentMethodName)

        navigate("/place-order")

    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>

            <div className="container small-container">
                <Helmet>
                    <title>Payment Method</title>
                </Helmet>

                <h1 className="my-3">Payment Method</h1>

                <Form onSubmit={paymentHandler}>
                    <div className="mb-3">
                        <FormCheck
                            type="radio"
                            id="paypal"
                            label="Paypal"
                            value="paypal"
                            checked={paymentMethodName === "Paypal"}
                            onChange={(e) =>
                                setPaymentMethodName(e.target.value)
                            }
                        ></FormCheck>
                    </div>

                    <div className="mb-3">
                        <FormCheck
                            type="radio"
                            id="stripe"
                            label="Stripe"
                            value="stripe"
                            checked={paymentMethodName === "Stripe"}
                            onChange={(e) =>
                                setPaymentMethodName(e.target.value)
                            }
                        ></FormCheck>
                    </div>

                    <div className="mb-3">
                        <Button type="submit">Continue</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default PaymentMethod;

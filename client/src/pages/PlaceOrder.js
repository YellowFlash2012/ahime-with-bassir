import { useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Loading from "../components/Loading";
import { resetCart } from "../features/cartSlice";
import { placeOrder } from "../features/ordersSlice";

const PlaceOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shippingAddress, paymentMethod, cartItems, loading, isError, error } = useSelector((store) => store.cart);

    const { order } = useSelector((store) => store.orders);

    // *calculating

    const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100;

    let itemsAmount = round2(cartItems.reduce((a, b) => a + b.qty * b.price, 0));

    let shippingAmount = itemsAmount > 100 ? round2(0) : round2(10);

    let taxAmount = round2(0.15 * itemsAmount);

    let totalAmount = itemsAmount + shippingAmount + taxAmount;

    const placeOrderHandler = () => { 
        dispatch(placeOrder({ orderItems: cartItems, shippingAddress, paymentMethod, itemsAmount, shippingAmount, taxAmount, totalAmount }));

        if (!isError) {
            dispatch(resetCart())
            
            navigate(`/order/${order._id}`)
        }


    }
    
    useEffect(() => {
        if (!paymentMethod) {
            navigate("/payment")
        }
    }, [navigate, paymentMethod])
    
    return (
        <Container>
            <CheckoutSteps step1 step2 step3 step4 />

            <Helmet>
                <title>Preview Order</title>
            </Helmet>

            <h1 className="my-3">Preview Order</h1>

            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>

                            <Card.Text>
                                <strong>Name:</strong>{" "}
                                {shippingAddress.fullName}
                                <br />
                                <strong>Address:</strong>{" "}
                                {shippingAddress.address},{" "}
                                {shippingAddress.city},{" "}
                                {shippingAddress.postalCode},{" "}
                                {shippingAddress.country}
                            </Card.Text>

                            <Link to="/shipping">Edit</Link>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>

                            <Card.Text>
                                <strong>Method:</strong> {paymentMethod}
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>

                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>

                            <ListGroup variant="flush">
                                {cartItems.map(item => (
                                    <ListGroupItem key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail" />{" "}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>

                                            <Col md={3}>{item.qty}</Col>

                                            <Col md={3}>{item.price}</Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                            <Link to="/cart">Edit</Link>
</Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>

                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col>Items</Col>

                                        <Col>${itemsAmount.toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                                
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping</Col>

                                        <Col>${shippingAmount.toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                                
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax</Col>

                                        <Col>${taxAmount.toFixed(2)}</Col>
                                    </Row>
                                </ListGroupItem>
                                
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                        <strong>Order Total</strong>
                                        </Col>

                                        <Col>
                                            <strong>
                                            ${totalAmount.toFixed(2)}

                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <div className="d-grid">
                                        <Button type="button" onClick={placeOrderHandler} disabled={cartItems.length === 0}>
                                            {loading ? <Loading/> : "Place Order"}
                                        </Button>
                                    </div>
                                </ListGroupItem>

                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default PlaceOrder;

import { Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";

const Cart = () => {
    const { cartItems } = useSelector(store => store.cart);

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>

            <h1>Shopping Cart</h1>

            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Oh no, your cart is empty!{" "}
                            <Link to="/">Go pick some products</Link>
                        </MessageBox>
                    ) : (
                        <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroupItem key={item._id}>
                                    <Row className="align-items-center">
                                        <Col md={4}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            />{" "}
                                            <Link to={`/product/${item.slug}`}>
                                                {item.name}
                                            </Link>
                                        </Col>

                                        <Col md={3}>
                                            <Button
                                                variant="light"
                                                disabled={item.qty === 1}
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </Button>{" "}
                                            <span>{item.qty}</span>{" "}
                                            <Button
                                                variant="light"
                                                disabled={
                                                    item.qty ===
                                                    item.countInStock
                                                }
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </Button>
                                        </Col>

                                        <Col md={3}>${item.price}</Col>

                                        <Col md={2}>
                                            <Button variant="light">
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    )}
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h3>
                                        Subtotal (
                                        {cartItems.reduce(
                                            (a, c) => a + c.qty,
                                            0
                                            )}{" "}{cartItems.reduce(
                                            (a, c) => a + c.qty,
                                            0
                                            ) <= 1 ? "item" : "items"}): $
                                            
                                        {cartItems.reduce(
                                            (a, c) => a + c.price*c.qty,
                                            0
                                        )}
                                    </h3>
                                </ListGroupItem>

                                <ListGroup>
                                    <div className="d-grid">
                                        <Button type="button" variant="primary" disabled={cartItems.length === 0}>Go To Checkout</Button>
                                    </div>
                                </ListGroup>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default Cart;

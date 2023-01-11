import { useEffect } from "react";
import { Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { getOrder } from "../features/ordersSlice";

const Order = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const { user } = useSelector(store => store.auth);

    const { order, loading, error } = useSelector(store => store.orders);

    
    useEffect(() => {
        if (!order._id || (order._id && order._id !== id)) {
            dispatch(getOrder(id));
        }
        
        if (!user) {
            navigate("/login")

            return;
        }

    },[dispatch, navigate, id, order._id, user])

    return (
        <div>
            {loading ? (
                <Loading />
            ) : error ? (
                <MessageBox varriant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Helmet>
                        <title>Order</title>
                    </Helmet>

                    <h1 className="my-3">Order {id}</h1>

                    <Row>
                        <Col md={8}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Shipping</Card.Title>

                                    <Card.Text>
                                        <strong>Name:</strong>{" "}
                                        {order.shippingAddress.fullName}
                                        <br />
                                        <strong>Address:</strong>{" "}
                                        {order.shippingAddress.address},{" "}
                                        {order.shippingAddress.city},{" "}
                                        {order.shippingAddress.postalCode},{" "}
                                        {order.shippingAddress.country}
                                    </Card.Text>

                                    {order.isDelivered ? (
                                        <MessageBox variant="success">
                                            Delivered at {order.deliveredAt}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">
                                            Not Delivered
                                        </MessageBox>
                                    )}
                                </Card.Body>
                            </Card>

                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Payment</Card.Title>

                                    <Card.Text>
                                        <strong>Method:</strong> {order.paymentMethod}
                                    </Card.Text>

                                    {order.isPaid ? (
                                        <MessageBox variant="success">
                                            Paid at {order.paidAt}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">
                                            Not Paid
                                        </MessageBox>
                                    )}
                                </Card.Body>
                            </Card>

                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Items</Card.Title>

                                    <ListGroup variant="flush">
                                        {order?.orderItems.map((item) => (
                                            <ListGroupItem key={item._id}>
                                                <Row className="align-items-center">
                                                    <Col md={6}>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="img-fluid rounded img-thumbnail"
                                                        />{" "}
                                                        <Link
                                                            to={`/product/${item.slug}`}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </Col>

                                                    <Col md={3}>{item.qty}</Col>

                                                    <Col md={3}>
                                                        {item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Order Summary</Card.Title>

                                    <ListGroup variant="flush">
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Items</Col>

                                                <Col>
                                                    $
                                                    {order?.itemsAmount.toFixed(
                                                        2
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>Shipping</Col>

                                                <Col>
                                                    $
                                                    {order?.shippingAmount.toFixed(
                                                        2
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>Tax</Col>

                                                <Col>
                                                    $
                                                    {order?.taxAmount.toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>Order Total</Col>

                                                <Col>
                                                    $
                                                    {order?.totalAmount.toFixed(
                                                        2
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
};
export default Order;

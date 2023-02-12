
import { useEffect } from "react";
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { deliverOrderByAdmin, deliverReset, getOrder, loadPaypalScript, orderPay, payReset } from "../features/ordersSlice";
import { toast } from "react-toastify";
import { getError } from "../utils";
import MoonLoading from "../components/MoonLoading";

const Order = () => {

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { id } = useParams();
    
    const { user } = useSelector(store => store.auth);
    
    const { order, clientId, loading, error, successPay, loadingPay, loadingDeliver, successDeliver } = useSelector(store => store.orders);
    
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const createOrder = (data, action) => {
        return action.order
            .create({
            purchase_units: [
                {
                    amount:{value:order.totalAmount}
                }
            ]
            })
            .then(orderID => {
            return orderID
        })
    }
    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function(details) {
            
        dispatch(orderPay(id, details))
            
        })
    }

    const onError = (err) => {
        toast.error(getError(err))
    }

    
    useEffect(() => {
        if (
            !order._id ||
            successPay ||
            successDeliver ||
            (order._id && order._id !== id)
        ) {
            dispatch(getOrder(id));

            if (successPay) {
                dispatch(payReset());
            }

            if (successDeliver) {
                dispatch(deliverReset());
            }
        } else {
            dispatch(loadPaypalScript());

            paypalDispatch({
                type: "resetOptions",
                value: {
                    "client-id": clientId,
                    currency: "USD",
                },
            });

            paypalDispatch({
                type: "setLoadingStatus",
                value: "pending",
            });
        }

    }, [dispatch, navigate, id, order._id, user, clientId, successPay, paypalDispatch, successDeliver])
    
    const deliverOrderHandler = () => {
        dispatch(deliverOrderByAdmin(id))
    }

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
                                        {order?.shippingAddress.fullName}
                                        <br />
                                        <strong>Address:</strong>{" "}
                                        {order?.shippingAddress.address},{" "}
                                        {order?.shippingAddress.city},{" "}
                                        {order?.shippingAddress.postalCode},{" "}
                                        {order?.shippingAddress.country},{" "}
                                        {order.shippingAddress.location && order
                                            .shippingAddress.location.lat && (
                                            <a
                                                target="_new"
                                                href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                                            >
                                                Show On Map
                                            </a>
                                        )}
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
                                        <strong>Method:</strong>{" "}
                                        {order?.paymentMethod}
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
                                                    {order?.taxAmount.toFixed(
                                                        2
                                                    )}
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

                                        {!order.isPaid && (
                                            <ListGroupItem>
                                                {isPending ? (
                                                    <Loading />
                                                ) : (
                                                    <div>
                                                        <PayPalButtons
                                                            createOrder={
                                                                createOrder
                                                            }
                                                            onApprove={
                                                                onApprove
                                                            }
                                                            onError={onError}
                                                        ></PayPalButtons>
                                                    </div>
                                                )}
                                                {loadingPay && <Loading />}
                                            </ListGroupItem>
                                        )}

                                        {user.isAdmin &&
                                            order.isPaid &&
                                            !order.isDelivered && (
                                                <ListGroupItem>
                                                    <div className="d-grid">
                                                        {loadingDeliver ? (
                                                            <MoonLoading />
                                                        ) : (
                                                            <Button
                                                                type="button"
                                                                onClick={
                                                                    deliverOrderHandler
                                                                }
                                                            >
                                                                Deliver Order
                                                            </Button>
                                                        )}
                                                    </div>
                                                </ListGroupItem>
                                            )}
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

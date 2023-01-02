import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";

import RiseLoader from "react-spinners/RiseLoader";

import { fetchSingleProduct } from "../features/productsSlice";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";

const Product = () => {
    const { slug } = useParams();

    const { product, loading, isError, error } = useSelector(
        (store) => store.products
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleProduct(slug));
    }, []);

    return loading ? (
        <div>
            <RiseLoader size={25} color="green" />
        </div>
    ) : isError ? (
        <div>{error}</div>
    ) : (
        <div className="mt-3">
            <Row>
                <Col md={6}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="img-large"
                    />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Helmet>
                                        <title>{product.name}</title>
                                    </Helmet>
                            <h1>{product.name}</h1>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            />
                        </ListGroupItem>

                        <ListGroupItem>Price: ${product.price}</ListGroupItem>

                        <ListGroupItem>
                            Description: <p>{product.description}</p>
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price:</Col>

                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Row>
                                        <Col>Status:</Col>

                                        <Col>
                                            {product.countInStock > 0 ? (
                                                <Badge bg="success">
                                                    In Stock
                                                </Badge>
                                            ) : (
                                                <Badge bg="danger">
                                                    Out of stock
                                                </Badge>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroupItem>

                                        {product.countInStock > 0 && <ListGroupItem>
                                            <div className="d-grid">
                                                <Button variant="primary">Add To Cart</Button>
                                        </div>
                                        </ListGroupItem>}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default Product;

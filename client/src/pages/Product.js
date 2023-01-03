import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
    Badge,
    Button,
    Card,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";

import RiseLoader from "react-spinners/RiseLoader";

import { fetchSingleProduct } from "../features/productsSlice";
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { addTocart } from "../features/cartSlice";
import axios from "axios";

const Product = () => {
    const { slug } = useParams();

    const { product, loading, isError, error } = useSelector(
        (store) => store.products
    );

    const { cartItems } = useSelector((store) => store.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(fetchSingleProduct(slug));
    }, []);
    
    const addToCartHandler = async () => {
        const existingPdt = cartItems.find(x => x._id === product._id);
        
        const qty = existingPdt ? existingPdt.qty + 1 : 1;
        
        const { data } = await axios.get(`/api/v1/products/${product._id}`);
        

        if (data.countInStock < qty) {
            window.alert(`Exceeded Max product quantity is ${data.countInStock}`);

            return;
        };
        dispatch(addTocart({ ...product, qty }))

        navigate("/cart")
    };

    return (
        <div className="product-container">
            {loading ? (
                <Loading />
            ) : isError ? (
                <MessageBox variant="danger">{error}</MessageBox>
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

                                <ListGroupItem>
                                    Price: ${product.price}
                                </ListGroupItem>

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
                                                    <strong>
                                                        ${product.price}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>

                                        <ListGroupItem>
                                            <Row>
                                                <Col>Status:</Col>

                                                <Col>
                                                    {product.countInStock >
                                                    0 ? (
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

                                        {product.countInStock > 0 && (
                                            <ListGroupItem>
                                                <div className="d-grid">
                                                    <Button variant="primary" onClick={addToCartHandler}>
                                                        Add To Cart
                                                    </Button>
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
export default Product;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    Badge,
    Button,
    Card,
    CardImg,
    Col,
    Container,
    FloatingLabel,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";

import axios from "axios";

import { Helmet } from "react-helmet-async";

import { addNewReview, fetchSingleProduct } from "../features/productsSlice";
import Rating from "../components/Rating";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { addToCart } from "../features/cartSlice";
import { toast } from "react-toastify";

const Product = () => {
    let reviewsRef = useRef();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [name, setName] = useState("");
    const [selectedImg, setSelectedImg] = useState("");

    const { slug } = useParams();

    const { product, loading, isError, error, newReview, loadingAddReview } = useSelector(
        (store) => store.products
    );

    const { cartItems } = useSelector((store) => store.cart);

    const { user } = useSelector((store) => store.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchSingleProduct(slug));
    }, [dispatch, slug]);

    const addToCartHandler = async () => {
        const existingPdt = cartItems.find((x) => x._id === product._id);

        const qty = existingPdt ? existingPdt.qty + 1 : 1;

        const { data } = await axios.get(`/api/v1/products/${product._id}`);

        if (data.countInStock < qty) {
            window.alert(
                `Exceeded max product quantity of ${data.countInStock}`
            );

            return;
        }
        dispatch(addToCart({ ...product, qty }));

        navigate("/cart");
    };

    const reviewHandler = (e) => {
        e.preventDefault()

        console.log(comment, rating);

        if (!comment || !rating) {
            toast.error("Please enter a comment and rating")
            return;
        }

        dispatch(addNewReview({id:product._id, name: user.name, comment, rating }))
        
        // product.reviews.unshift(newReview?.review)
        // product.numReviews = newReview?.numReviews;
        // product.rating = newReview?.rating;

        dispatch(fetchSingleProduct(slug))

    }

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
                                src={selectedImg || product.image}
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
                                            <Row xs={1} md={2} className="g-2">
                                                {
                                                    [product.image, ...product.images].map(x => (
                                                        <Col key={x}>
                                                            <Card>
                                                                <Button className="thumbnail"
                                                                    type="button"
                                                                    variant="light"
                                                                    onClick={() => setSelectedImg(x)}>
                                                                    <CardImg variant="top" src={x}/>
                                                                </Button>
                                                            </Card>
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
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
                                                    <Button
                                                        variant="primary"
                                                        onClick={
                                                            addToCartHandler
                                                        }
                                                    >
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

                    <div className="my-3">
                        <h2 ref={reviewsRef}>Reviews</h2>

                        <div className="mb-3">
                            {product.reviews?.length === 0 && (
                                <MessageBox>There are no reviews</MessageBox>
                            )}
                        </div>

                        <ListGroup>
                            {product.reviews?.map((r) => (
                                <ListGroupItem key={r._id}>
                                    <strong>{r.name}</strong>

                                    <Rating rating={r.rating}></Rating>

                                    <p>{r.createdAt.substring(0, 10)}</p>

                                    <p>{r.comment}</p>
                                </ListGroupItem>
                            ))}
                        </ListGroup>

                        <div className="my-3">
                            {user ? (
                                <form action="" onSubmit={reviewHandler}>
                                    <h2>Write a customer review</h2>

                                    <FormGroup
                                        className="mb-3"
                                        controlId="rating"
                                    >
                                        <FormLabel>Rating</FormLabel>

                                        <FormSelect
                                            aria-label="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">
                                                4 - Very Good
                                            </option>
                                            <option value="5">
                                                5 - Excellent
                                            </option>
                                        </FormSelect>
                                            </FormGroup>
                                            
                                            <FloatingLabel
                                            controlId="floatingTextarea"
                                                label="Comments"
                                                className="mb-3"
                                            >
                                                <FormControl
                                                    as="textarea"
                                                    placeholder="Leave a comment here..."
                                                    value={comment}
                                                    onChange={(e)=>setComment(e.target.value)}
                                                >
                                                    
</FormControl>
                                            </FloatingLabel>

                                            <div className="mb-3">
                                                <Button type="submit">Submit Review</Button>
                                            </div>
                                </form>
                            ) : (
                                <MessageBox>
                                    Please <Link to={`/login?redirect=/product/${product.slug}`}>login</Link> to
                                    write a review
                                </MessageBox>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Product;

import axios from "axios";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import Rating from "./Rating";

const ProductCard = ({ pdt }) => {
    const dispatch = useDispatch();
    const [outOfSTock, setOutOfStock] = useState(false);

    const { cartItems } = useSelector((store) => store.cart);

    const addToCartHandler = async (item) => {
        const existingPdt = cartItems.find((x) => x._id === pdt._id);

        const qty = existingPdt ? existingPdt.qty + 1 : 1;

        const { data } = await axios.get(`/api/v1/products/${item._id}`);

        if (data.countInStock < qty) {
            setOutOfStock(true)
            window.alert(
                `Exceeded max product quantity of ${data.countInStock}`
            );

            return;
        }
        dispatch(addToCart({ ...item, qty }));

        console.log(data.countInStock);
        console.log(pdt.countInStock);
    };


    return (
        <Card>
            <Link to={`/product/${pdt.slug}`}>
                <img className="card-img-top" src={pdt.image} alt={pdt.name} />
            </Link>

            <Card.Body>
                <Link to={`/product/${pdt.slug}`}>
                    <Card.Title>{pdt.name}</Card.Title>
                </Link>

                <Rating rating={pdt.rating} numReviews={pdt.numReviews} />

                <Card.Text>
                    <strong>${pdt.price}</strong>
                </Card.Text>

                {outOfSTock ? (
                    <Button variant="light" disabled>
                        {" "}
                        Out of stock
                    </Button>
                ) : (
                    <Button
                        className="btn-primary"
                        onClick={() => addToCartHandler(pdt)}
        
                    >
                        Add To Cart
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};
export default ProductCard;

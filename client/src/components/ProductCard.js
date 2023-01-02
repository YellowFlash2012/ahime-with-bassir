import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ pdt }) => {
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
                    <strong>
                    ${pdt.price}
                    </strong>

                </Card.Text>

                <Button className="btn-primary">Add To Cart</Button>

            </Card.Body>

            
        </Card>
    );
};
export default ProductCard;

import { useCallback, useEffect, useState } from "react";
import {
    Button,
    Container,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import MessageBox from "../../components/MessageBox";
import { fetchProductByIdByAdmin } from "../../features/productsSlice";

const ProductEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { product, loading, error } = useSelector((store) => store.products);

    const [name, setName] = useState(product?.name || "");
    const [slug, setSlug] = useState(product?.slug || "");
    const [price, setPrice] = useState(product?.price || "");
    const [image, setImage] = useState(product?.image || "");
    const [category, setCategory] = useState(product?.category || "");
    const [brand, setBrand] = useState(product?.brand || "");
    const [description, setDescription] = useState(product?.description || "");
    const [countInStock, setCountInStock] = useState(
        product?.countInStock || ""
    );

    console.log(name, brand, description);

    useEffect(() => {
        
        dispatch(fetchProductByIdByAdmin(id));
    }, [id, dispatch]);

    return (
        <Container className="small-container">
            <Helmet>
                <title>Edit Product ${id}</title>
            </Helmet>

            <h1>Edit Product {id}</h1>

            {loading ? (
                <Loading />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Form>
                    <FormGroup className="mb-3" controlId="name">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="slug">
                        <FormLabel>Slug</FormLabel>
                        <FormControl
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="price">
                        <FormLabel>Price</FormLabel>
                        <FormControl
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="image">
                        <FormLabel>Image</FormLabel>
                        <FormControl
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="category">
                        <FormLabel>Category</FormLabel>
                        <FormControl
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="brand">
                        <FormLabel>Brand</FormLabel>
                        <FormControl
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="description">
                        <FormLabel>Description</FormLabel>
                        <FormControl
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="countInStock">
                        <FormLabel>Count</FormLabel>
                        <FormControl
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <div className="mb-3">
                        <Button className="btn-standard me-5" type="submit">
                            Update
                        </Button>

                        <Button
                            className="btn-standard"
                            type="button"
                            variant="danger"
                            onClick={() => navigate("/admin/products-list")}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            )}
        </Container>
    );
};
export default ProductEdit;
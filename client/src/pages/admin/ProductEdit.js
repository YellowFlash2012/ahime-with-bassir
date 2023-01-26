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
import MoonLoading from "../../components/MoonLoading";
import { fetchProductByIdByAdmin, updateProductByAdmin, uploadImageByAdmin } from "../../features/productsSlice";

const ProductEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productToEdit, loading, error, loadingUpdate, loadingUpload, imageURL } =
        useSelector((store) => store.products);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [countInStock, setCountInStock] = useState(
        ""
    );

    const updateProductHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductByAdmin({ _id: id, name, slug, price, image, category, brand, description, countInStock }));
    }

    const uploadFileHandler = (e) => {
        const file = e.target.file[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file)

        dispatch(uploadImageByAdmin(bodyFormData))

        setImage(imageURL)
    }

    useEffect(() => {
        dispatch(fetchProductByIdByAdmin(id));
        setName(productToEdit?.name);
        setSlug(productToEdit?.slug);
        setPrice(productToEdit?.price);
        setImage(productToEdit?.image);
        setCategory(productToEdit?.category);
        setBrand(productToEdit?.brand);
        setDescription(productToEdit?.description);
        setCountInStock(productToEdit?.countInStock);
    }, [id, dispatch, productToEdit?.name]);

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
                <Form onSubmit={updateProductHandler}>
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
                            
                            <FormGroup className="mb-3" controlId="imageFile">
                                <FormLabel>Upload File</FormLabel>

                                {loadingUpload ? (<MoonLoading/>) : <FormControl type="file" onChange={uploadFileHandler}/>}
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
                            {loadingUpdate ? (<MoonLoading/>) : "Update"}
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

import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

import { useDispatch, useSelector } from "react-redux";



import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import ProductCard from "../components/ProductCard";

import { fetchProducts } from "../features/productsSlice";

const Home = () => {
    const { products, loading, isError, error } = useSelector(
        (store) => store.products
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <div>
            <main>
                <Container>
                    <Helmet>
                        <title>Jessica Store</title>
                    </Helmet>
                    <h1>Featured Products</h1>
                    <div className="products-container">
                        {loading ? (
                            <Loading />
                        ) : isError ? (
                            <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                            <Row>
                                {products.map((pdt) => (
                                    <Col sm={6} md={4} lg={3} className="mb-3">
                                        <ProductCard key={pdt.slug} pdt={pdt} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>
                </Container>
            </main>
        </div>
    );
};
export default Home;

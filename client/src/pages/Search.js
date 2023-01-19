import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { fetchSearchProducts } from "../features/productsSlice";
import Product from "./Product";

const prices = [
    {
        name: "$1 to $50",
        value:"1-50"
    },
    {
        name: "$51 to $200",
        value:"51-200"
    },
    {
        name: "$201 to $1000",
        value:"201-1000"
    },
]

export const ratings = [
    {
        name: "4* & up",
        rating:4
    },
    {
        name: "3* & up",
        rating:3
    },
    {
        name: "2* & up",
        rating:2
    },
    {
        name: "1* & up",
        rating:1
    },
]

const Search = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { categories, loading, error, countProducts, searchProducts, pages } = useSelector(
        (store) => store.products
    );

    const { search } = useLocation();

    const sp = new URLSearchParams(search); //* /search?category=shirts
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    useEffect(() => {
        dispatch(
            fetchSearchProducts( {category, query, price, rating, order, page})
        );
    }, [category, query, price, rating, order, page, dispatch]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const sortOrder = filter.order || order;

        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`
    }


    return (
        <Container>
            <Helmet>
                <title>Search Products</title>
            </Helmet>

            <Row>
                <Col md={3}>
                    <h3>Departments</h3>

                    <div>
                        <ul>
                            <li>
                                <Link
                                    className={
                                        "all" === category ? "text-bold" : ""
                                    }
                                    to={getFilterUrl({ category: "all" })}
                                >
                                    Any
                                </Link>
                            </li>

                            <li>
                                {categories.map((c) => (
                                    <span key={c}>
                                        <Link
                                            className={
                                                c === category
                                                    ? "text-bold"
                                                    : ""
                                            }
                                            to={getFilterUrl({ category: c })}
                                        >
                                            {c}
                                        </Link>
                                    </span>
                                ))}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link
                                    className={
                                        "all" === price ? "text-bold" : ""
                                    }
                                    to={getFilterUrl({ price: "all" })}
                                >
                                    Any
                                </Link>
                            </li>

                            <li>
                                {prices.map((p) => (
                                    <span key={p.value}>
                                        <Link
                                            className={
                                                p.value === price
                                                    ? "text-bold"
                                                    : ""
                                            }
                                            to={getFilterUrl({
                                                price: p.value,
                                            })}
                                        >
                                            {p.name}
                                        </Link>
                                    </span>
                                ))}
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3>Avg. Customer Review</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.value}>
                                    <Link
                                        className={
                                            `${r.rating}` === `${rating}`
                                                ? "text-bold"
                                                : ""
                                        }
                                        to={getFilterUrl({ rating: r.rating })}
                                    >
                                        <Rating
                                            caption={" & up"}
                                            rating={r.rating}
                                        />
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <Link
                                    className={
                                        rating === "all" ? "text-bold" : ""
                                    }
                                    to={getFilterUrl({ rating: "all" })}
                                >
                                    <Rating caption={" & up"} rating={0} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Col>

                <Col md={9}>
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            <Row className="justify-content-between mb-3">
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0
                                            ? "No"
                                            : countProducts}{" "}
                                        Results
                                        {query !== "all" && " : " + query}
                                        {category !== "all" && " : " + category}
                                        {price !== "all" && " : Price " + price}
                                        {rating !== "all" &&
                                            " : Rating " + rating + " & up "}
                                        {query !== "all" ||
                                        category !== "all" ||
                                        rating !== "all" ||
                                        price !== "all" ? (
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    navigate("/search")
                                                }
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </Button>
                                        ) : null}
                                    </div>
                                </Col>

                                <Col className="text-end">
                                    Sort by{" "}
                                    <select
                                        value={order}
                                        onChange={(e) =>
                                            navigate(
                                                getFilterUrl({
                                                    order: e.target.value,
                                                })
                                            )
                                        }
                                    >
                                        <option value="newest">
                                            Newest Arrivals
                                        </option>
                                        <option value="lowest">
                                            Price: Low to High
                                        </option>
                                        <option value="highest">
                                            Price: High to Low
                                        </option>
                                        <option value="toprated">
                                            Avg. Customer Reviews
                                        </option>
                                    </select>
                                </Col>
                                    </Row>
                                    
                                    {searchProducts.length === 0 && <MessageBox>No Product Found!</MessageBox>}

                                    <Row>
                                        {searchProducts.map(p => (
                                            <Col sm={6} lg={4} className="mb-3" key={p._id}>
                                                <Product product={p}/>
                                            </Col>
                                        ))}
                                    </Row>

                                    <div>
                                        {[...Array(pages).keys()].map(x => (
                                            <Link key={x + 1} className="mx-1" to={getFilterUrl({ page: x + 1 })}>
                                                <Button className={Number(page) === x + 1 ? "text-bold" : ""} variant="light">
                                                    {x+1}
                                                </Button>
                                            </Link>
                                        ))}
                                    </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
export default Search;

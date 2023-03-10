import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loading from "../../components/Loading";
import MessageBox from "../../components/MessageBox";
import MoonLoading from "../../components/MoonLoading";
import { createNewProductByAdmin, deleteProductByAdmin, getAllProductsByAdmin, resetDelete } from "../../features/productsSlice";

const ProductsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, loadingCreate,createError, error, products, pages, loadingDelete, successDelete } = useSelector(store => store.products);

    const { search, pathname } = useLocation();

    const sp = new URLSearchParams(search);

    const page = sp.get('page') || 1;

    const createProductHandler = async () => {
        if (window.confirm("You are about to create a new product, Continue?")) {
            dispatch(createNewProductByAdmin())
        }
    }

    const deleteProductHandler = (pdt) => {
        if (window.confirm("Are you sure you want to delete this products?")) {
            dispatch(deleteProductByAdmin(pdt))
            
        }
    }

    useEffect(() => {
        if (successDelete) {
            dispatch(resetDelete())
        } else {
            
            dispatch(
            getAllProductsByAdmin(page))
        }
    },[page, dispatch, successDelete])

    return <Container>
        <Row className="mt-3">
            <Col>
        <h1>Products</h1>
            
            </Col>
            
            <Col className="col text-end">
                <div>
                    {loadingCreate ? (<MoonLoading/>) : <Button className="btn-standard" type="button" onClick={createProductHandler}>Create Product</Button>}
                </div>
            </Col>
        </Row>

        {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (<>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map(pdt => (
                        <tr key={pdt._id}>
                            <td>{ pdt._id}</td>
                            <td>{ pdt.name}</td>
                            <td>{ pdt.price}</td>
                            <td>{ pdt.category}</td>
                            <td>{ pdt.brand}</td>
                            <td>
                                <Button className="me-2" variant="light" type="button" onClick={()=>navigate(`/admin/product/${pdt._id}`)}>Edit</Button>

                                {loadingDelete ? (<MoonLoading/>) : <Button type="button" variant="danger" onClick={()=>deleteProductHandler(pdt)}>Delete</Button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div>
                {[...Array(pages).keys()].map(x => (
                    <Link className={x + 1 === Number(page) ? "btn text-bold" : "btn"} key={x+1} to={`/admin/products-list?page=${x+1}`}>{x+1}</Link>
                ))}
            </div>
        </>)}
    </Container>;
};
export default ProductsList;

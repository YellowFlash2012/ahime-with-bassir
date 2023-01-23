import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import MessageBox from "../../components/MessageBox";
import { getAllProductsByAdmin } from "../../features/productsSlice";

const ProductsList = () => {
    const dispatch = useDispatch();

    const { loading, error, products, pages } = useSelector(store => store.products);

    const { search, pathname } = useLocation();

    const sp = new URLSearchParams(search);

    const page = sp.get('page') || 1;

    useEffect(() => {
        dispatch(
        getAllProductsByAdmin(page))
    },[page, dispatch])

    return <Container>
        <h1>Products</h1>

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
                            <td></td>
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

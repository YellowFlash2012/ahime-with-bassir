import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { getAllOrders } from "../features/ordersSlice";

const Orders = () => {
    const { loading, isError, error, orders } = useSelector(store => store.orders);

    const { user } = useSelector(store => store.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders())

        // if (!user) {
        //     navigate("/login")
        // }
    },[dispatch])

    return <Container>
        <Helmet>
            <title>Orders History</title>
        </Helmet>

        <h1>Orders History</h1>

        {loading ? <Loading /> : error ? <MessageBox variant="danger">{error}</MessageBox> : (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>{order.totalAmount.toFixed(2)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0,10) : "No"}</td>
                            
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>

                            <td>
                                <Button type="button" variant="light" onClick={()=>navigate(`/order/${order._id}`)}>Details</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

    </Container>;
};
export default Orders;

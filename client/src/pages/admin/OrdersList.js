import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import MessageBox from "../../components/MessageBox";
import { getAllOrdersByAdmin } from "../../features/ordersSlice";

const OrdersLIst = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orders, loading, error } = useSelector(store => store.orders);

    useEffect(() => {
        dispatch(getAllOrdersByAdmin())
    },[])

    return (
        <Container>
            <Helmet>
                <title>Orders</title>
            </Helmet>

            <h1>Orders</h1>

            {loading ? (
                <Loading />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    {order.user
                                        ? order.user.name
                                        : "DELETED USER"}
                                </td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td>
                                    {order.isPaid
                                        ? order.paidat.substring(0, 10)
                                        : "No"}
                                </td>
                                <td>
                                    {order.isDelivered
                                        ? order.deliveredat.substring(0, 10)
                                        : "No"}
                                </td>

                                <td>
                                    <Button type="button" variant="light" onClick={()=>navigate(`/order/${order._id}`)}>Details</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Container>
    );
};
export default OrdersLIst;

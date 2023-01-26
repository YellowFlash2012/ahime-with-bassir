import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import MessageBox from "../../components/MessageBox";
import MoonLoading from "../../components/MoonLoading";
import { deleteOrderByAdmin, deleteReset, getAllOrdersByAdmin } from "../../features/ordersSlice";

const OrdersLIst = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orders, loading, error, loadingDelete, successDelete } = useSelector(store => store.orders);

    useEffect(() => {
        
        if (successDelete) {
            dispatch(deleteReset())
        } else {
            
            dispatch(getAllOrdersByAdmin());
        }

    }, [successDelete]);
    
    const deleteOrderHandler = (order) => {
        if (window.confirm("Are you sure you want to do that?")) {
            dispatch(deleteOrderByAdmin(order))
        }
    }

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
                                    <Button className="me-2" type="button" variant="light" onClick={() => navigate(`/order/${order._id}`)}>Details</Button>
                                    
                                    {loadingDelete ? (<MoonLoading/>) : <Button variant="danger" type="button" onClick={()=>deleteOrderHandler(order)}>Delete</Button>}
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

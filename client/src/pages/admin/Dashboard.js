import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Chart } from "react-google-charts";

import Loading from "../../components/Loading";
import MessageBox from "../../components/MessageBox";
import { getAllSummaries } from "../../features/ordersSlice";

import MoonLoader from "react-spinners/MoonLoader";

const Dashboard = () => {
    const dispatch = useDispatch();

    
    
    const { user } = useSelector(store => store.auth);

    const { loading, error, summary } = useSelector(store => store.orders);

    console.log(summary.dailyOrders);
    
    useEffect(() => {
        dispatch(getAllSummaries())
    }, [dispatch])
    
    
    return (
        <>
        {loading ? (
            <Loading />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <>
                    <Container>
                        <h1>Dashboard</h1>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {summary.users && summary.users[0]
                                            ? summary.users[0].numUsers
                                            : 0}
                                    </Card.Title>

                                    <Card.Text>
                                        {summary.user &&
                                        summary.users[0].numUsers <= 1
                                            ? "User"
                                            : "Users"}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {summary.orders && summary.orders[0]
                                            ? summary.orders[0].numOrders
                                            : 0}
                                    </Card.Title>

                                    <Card.Text>
                                        {summary.orders &&
                                        summary.orders[0].numOrders <= 1
                                            ? "Order"
                                            : "Orders"}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        $
                                        {summary.orders && summary.orders[0]
                                            ? summary.orders[0].totalSales.toFixed(
                                                  2
                                              )
                                            : 0}
                                    </Card.Title>

                                    <Card.Text>Sales</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <div className="my-3">
                        <h2>Sales</h2>

                        {summary.dailyOrders &&
                        summary.dailyOrders.length === 0 ? (
                            <MessageBox>No Sales</MessageBox>
                        ) : (
                            <Chart
                                width="100%"
                                height="400px"
                                chartType="AreaChart"
                                loader={<MoonLoader color="red" />}
                                data={[
                                    ["Dates", "Sales"],
                                    summary.dailyOrders && summary.dailyOrders
                                    .map((x) => [x._id, x.sales]),
                                ]}
                            />
                        )}
                    </div>

                    <div className="my-3">
                        <h2>Categories</h2>

                        {summary.productCategories &&
                        summary.productCategories.length === 0 ? (
                            <MessageBox>No Category</MessageBox>
                        ) : (
                            <Chart
                                width="100%"
                                height="400px"
                                chartType="PieChart"
                                loader={<MoonLoader color="red" />}
                                data={[
                                    ["Category", "Products"],
                                    summary.productCategories &&summary.productCategories
                                    .map((x) => [x._id, x.count]),
                                ]}
                            />
                        )}
                        </div>
                        </Container>
                </>
            )}
            </>
    );
};
export default Dashboard;

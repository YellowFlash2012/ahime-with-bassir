import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import MessageBox from "../../components/MessageBox";
import { getAllUsersByAdmin } from "../../features/authSlice";

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { users, loading, error } = useSelector((store) => store.auth);

    useEffect(() => {
        dispatch(getAllUsersByAdmin())
    }, [])
    
    const deleteUserHandler=(user)=>{}

    return (
        <Container>
            <Helmet>
                <title>Users</title>
            </Helmet>

            <h1>Users</h1>

            {loading ? (
                <Loading />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>

                            <th>Is Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                                <td>
                                    <Button className="me-2" variant="light" type="button" onClick={() => navigate(`/admin/user/${user._id}`)}>Edit</Button>
                                    
                                    <Button variant="danger" type="button" onClick={deleteUserHandler(user)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Container>
    );
};
export default UsersList;

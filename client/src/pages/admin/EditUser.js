import { useEffect, useState } from "react";
import {
    Button,
    Container,
    Form,
    FormCheck,
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
import { getOneUserByAdmin, updateUserByAdmin } from "../../features/authSlice";

const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const { loading, loadingUpdate, error, updateError, userToEdit } = useSelector(
        (store) => store.auth
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        dispatch(getOneUserByAdmin(id))
        setName(userToEdit?.name)
        setEmail(userToEdit?.email)
        setIsAdmin(userToEdit?.isAdmin)
    }, [id, userToEdit?.name, dispatch]);

    const editUserHandler = (e) => {
        e.preventDefault();

        dispatch(updateUserByAdmin({_id:id,name, email,isAdmin}))
    };
    return (
        <Container className="small-container">
            <Helmet>
                <title>Edit User ${id}</title>
            </Helmet>

            <h1>Edit User ${id}</h1>

            {loading ? (
                <Loading />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Form onSubmit={editUserHandler}>
                    <FormGroup className="mb-3" controlId="name">
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mb-3" controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormCheck
                        className="mb-3"
                        type="checkbox"
                        id="isAdmin"
                        label="isAdmin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />

                    <div className="mb-3">
                        {loadingUpdate ? (
                            <MoonLoading />
                        ) : (
                            <Button type="submit">Update</Button>
                        )}
                    </div>
                </Form>
            )}
        </Container>
    );
};
export default EditUser;

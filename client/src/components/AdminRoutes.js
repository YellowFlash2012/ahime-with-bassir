import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({children}) => {
    const { user } = useSelector((store) => store.auth);

    return <>{user && user.isAdmin ? children : <Navigate to="/login" />}</>;
};
export default AdminRoutes;

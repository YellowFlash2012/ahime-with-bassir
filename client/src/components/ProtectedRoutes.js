import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const { user } = useSelector((store) => store.auth);

    return <>{user ? children : <Navigate to="/login" />}</>;
};
export default ProtectedRoutes;

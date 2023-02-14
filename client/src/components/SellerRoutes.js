import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerRoutes = ({ children }) => {
    const { user } = useSelector((store) => store.auth);

    return <>{user && user.isSeller ? children : <Navigate to="/login" />}</>;
};
export default SellerRoutes;

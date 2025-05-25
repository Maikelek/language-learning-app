import { Navigate } from "react-router-dom";
import { useUser } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }


    return children;
};

export default ProtectedRoute;
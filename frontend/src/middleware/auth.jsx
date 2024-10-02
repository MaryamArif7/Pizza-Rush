import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

// Authorization check (Token-based)
export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to={'/'} replace={true} />;
    }

    return children;
};

// Protecting routes (Username-based)
export const ProtectRoute = ({ children }) => {
    const { username } = useAuthStore(state => state.auth);  // Correctly using the hook

    if (!username) {
        return <Navigate to={'/'} replace={true} />;
    }

    return children;
};

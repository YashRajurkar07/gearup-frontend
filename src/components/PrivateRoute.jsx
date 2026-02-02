import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn, getUserRole } from '../store/AuthHandler';

const PrivateRoute = ({ allowedRoles }) => {
    
    // Check Login Status
    if (!isLoggedIn()) {
        return <Navigate to="/signin" replace />;
    }

    // Check Role
    const userRole = getUserRole();

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // User is logged in but authorized for this page
        // Redirect them to their appropriate home
        if (userRole === 'ROLE_ADMIN') return <Navigate to="/allowners" replace />;
        if (userRole === 'ROLE_OWNER') return <Navigate to="/owner/dashboard" replace />;
        return <Navigate to="/home" replace />;
    }

    // If Authorized, Render the page (Outlet)
    return <Outlet />;
};

export default PrivateRoute;
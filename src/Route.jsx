import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
      localStorage.clear();
      return null;
    }

    const role =
      decoded.role ||
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return { token, role };
  } catch {
    localStorage.clear();
    return null;
  }
};

const ProtectedRoute = ({ children, roles }) => {
  const user = getUserFromToken();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
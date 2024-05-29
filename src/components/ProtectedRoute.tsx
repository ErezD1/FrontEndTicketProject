import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (authContext?.isLoading) {
    return <div>Loading...</div>;
  }

  if (!authContext?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

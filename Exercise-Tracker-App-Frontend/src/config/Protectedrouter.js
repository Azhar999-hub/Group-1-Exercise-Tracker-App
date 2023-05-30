import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const loggedIn = window.localStorage.getItem("loggedIn");
  const location = useLocation();
  return loggedIn ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/Login" replace state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;

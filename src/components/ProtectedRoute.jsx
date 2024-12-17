import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { PageLoader } from "../components";

const ProtectedRoute = ({ children, isAuthenticated = true }) => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const protectedRoutesForAdmin = ["/cart", "/wishlist", "/order"];
    const isAccessingAdminRoute =
      protectedRoutesForAdmin.includes(location.pathname) &&
      user?.role === "admin";

    if (isAuthenticated && authStatus !== isAuthenticated) {
      return navigate("/sign-in");
    }

    if (
      (!isAuthenticated && authStatus !== isAuthenticated) ||
      isAccessingAdminRoute
    ) {
      return navigate("/");
    }

    setLoader(false);
  }, [authStatus, isAuthenticated, navigate, location.pathname, user]);

  return loader ? <PageLoader /> : <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
};

export default ProtectedRoute;

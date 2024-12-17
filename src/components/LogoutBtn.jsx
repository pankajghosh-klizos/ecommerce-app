import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../store/auth.slice.js";
import { useState } from "react";
import Loader from "./Loader/Loader.jsx";
import toast from "react-hot-toast";
import localforage from "localforage";
import axios from "axios";
import config from "../config/config.js";
import Button from "./Button.jsx";

const LogoutBtn = ({ className = "", children = "Log out" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");

      const { data } = await axios.get(
        `${config.backendUrl}/cyber/user/logout`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (data.success) {
        await localforage.removeItem("authToken");
        toast.success(data.message || "Logged out successfully");
        dispatch(logout());
        navigate("/sign-in");
      } else {
        throw new Error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during logout"
      );
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      className={`btn rounded-2 ${className}`}
      onClick={logoutHandler}
      disabled={loading}
      data-bs-dismiss="modal"
    >
      {children} {loading && <Loader data-bs-theme="dark" />}
    </Button>
  );
};

// PropTypes for type checking of component props
LogoutBtn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default LogoutBtn;

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Root = () => {
  const { items } = useSelector((state) => state.orderDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart");
    }
  }, []);

  return <Outlet />;
};

export default Root;

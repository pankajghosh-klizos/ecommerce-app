import { useEffect } from "react";
import { PageLoader } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import localforage from "localforage";
import axios from "axios";
import config from "../../config/config";

const PaymentVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extract query parameters
  const success = queryParams.get("success");
  const orderId = queryParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const res = await axios.post(
        `${config.backendUrl}/cyber/payment/orders/verifyStripeOrder`,
        { success, orderId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data);
        navigate("/order/success");
      } else {
        toast.error(res.data.message || "Failed to place order.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return <PageLoader />;
};

export default PaymentVerify;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, PageLoader } from "../../components";
import toast from "react-hot-toast";
import config from "../../config/config";
import localforage from "localforage";
import { motion } from "framer-motion";

const AllOrders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getAllOrder = async () => {
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const res = await axios.get(
        `${config.backendUrl}/cyber/payment/orders/userOrders`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOrders(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllOrder();
  }, []);

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return loading ? (
    <PageLoader />
  ) : (
    <motion.section
      className="mt-5 py-5"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Container>
        <motion.div
          className="d-flex align-items-center justify-content-between gap-2 mb-4"
          variants={cardVariants}
        >
          <h1 className="fs-3 fw-semibold m-0">
            All Orders{" "}
            <span className="fs-5 opacity-75 bg-secondary-subtle px-2 rounded-1 ms-2">
              {orders.length}
            </span>
          </h1>
        </motion.div>

        {orders.length > 0 ? (
          orders.map((order) => (
            <motion.div
              key={order._id}
              className="card mb-3"
              variants={cardVariants}
            >
              <div className="card-body">
                <div className="d-md-flex align-items-center justify-content-between gap-4 mb-3">
                  <p className="card-title text-black-50 m-0">
                    <span className="me-1 text-black">OrderId:</span>#
                    {order._id}
                  </p>

                  <p className="card-title text-black-50 m-0">
                    {order.deliveryDate}
                  </p>
                </div>

                <div className="d-md-flex gap-4">
                  <div className="mb-3 mb-md-0 order-md-2 w-100">
                    <p className="card-text text-black-50 m-0">
                      <span className="me-1 text-black">Total Amount:</span>₹{" "}
                      {Number(order.amount).toLocaleString()}
                    </p>

                    <p className="card-text text-black-50 m-0">
                      <span className="me-1 text-black">Order Status:</span>
                      <span
                        className={`${
                          order.orderStatus === "Delivered"
                            ? "text-success"
                            : order.orderStatus === "Processing"
                            ? "text-warning"
                            : "text-danger"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </p>

                    <p className="card-text text-black-50 m-0">
                      <span className="me-1 text-black">Payment Status:</span>
                      <span
                        className={`${
                          order.paymentStatus === "Paid"
                            ? "text-success"
                            : order.paymentStatus === "Pending"
                            ? "text-warning"
                            : "text-danger"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </p>

                    <p className="card-text text-black-50 m-0">
                      <span className="me-1 text-black">Shipping Method:</span>
                      {order.shippingMethod}
                    </p>

                    <p className="card-text text-black-50 m-0">
                      <span className="me-1 text-black">Order Date:</span>
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <ul
                    className="list-unstyled d-flex flex-column gap-2 overflow-auto order-md-1 w-100 m-0"
                    style={{ maxHeight: "8rem" }}
                  >
                    {order.items.map((item) => (
                      <li key={item?.productId}>
                        <div className="d-flex bg-light rounded-3 p-2">
                          <div
                            className="p-2"
                            style={{ height: "100px", width: "100px" }}
                          >
                            <img
                              src={item?.product_image}
                              alt={item?.product_title || "Product image"}
                              className="banner"
                              height="100%"
                            />
                          </div>

                          <div className="d-grid d-lg-flex align-items-lg-center flex-grow-1">
                            <div className="me-2 flex-grow-1">
                              <Link
                                to={`/products/product/${item.productId}`}
                                className="m-0 lh-sm fw-semibold text-black text-decoration-none"
                              >
                                {item?.product_title || "Product Title"}
                              </Link>

                              <p className="m-0 fw-light small text-muted">
                                Quantity: {item?.quantity || 1}
                              </p>

                              <p className="m-0 fw-semibold text-end d-flex align-items-center gap-1">
                                ₹{" "}
                                <span>
                                  {Number(
                                    item?.product_price || 0
                                  ).toLocaleString("en-IN")}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p className="text-center" variants={cardVariants}>
            No orders found.
          </motion.p>
        )}
      </Container>
    </motion.section>
  );
};

export default AllOrders;

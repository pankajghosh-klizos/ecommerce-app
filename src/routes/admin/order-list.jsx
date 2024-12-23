import { Link, useNavigate } from "react-router-dom";
import localforage from "localforage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../../config/config";
import { OrderStatusForm, PageLoader } from "../../components";
import { motion } from "motion/react";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(null);

  const getAllOrder = async () => {
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const res = await axios.get(
        `${config.backendUrl}/cyber/payment/orders/orderLists`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllOrder();
  }, []);

  return !orders ? (
    <PageLoader />
  ) : (
    <motion.section
      className="ps-2 ps-md-3 pt-2 pt-md-4 W-100"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
      }}
    >
      <h1 className="fs-3 fw-semibold mb-3">
        All Orders{" "}
        <span className="fs-5 opacity-75 bg-secondary-subtle px-2 rounded-1 ms-2">
          {orders.length}
        </span>
      </h1>

      <ul className="list-unstyled m-0 W-100">
        {orders.length > 0 ? (
          orders.map((order) => (
            <motion.li
              key={order._id}
              className="mb-2 mb-md-3"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className="border p-3 rounded-3">
                <div className="d-md-flex justify-content-between mb-2">
                  <p className="d-md-flex gap-2 m-0">
                    <span className="d-block text-black-50 fw-bold mb-1 mb-md-0">
                      OrderId:{" "}
                    </span>
                    #{order._id}
                  </p>

                  <p className="m-0">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </p>
                </div>

                <p className="fw-bold text-black-50 mb-1">Customer Details</p>

                <div className="mb-3 px-2">
                  <p className="mb-0">{order?.userId?.fullname}</p>
                  <p className="mb-0">+91 {order?.userId?.phone}</p>

                  <p className="mb-0">
                    {order?.address?.street}, {order?.address?.city},
                    {order?.address?.landMark}
                  </p>

                  <p className="m-0">
                    {order?.address?.state}, {order?.address?.country},{" "}
                    {order?.address?.zipCode}
                  </p>
                </div>

                <p className="fw-bold text-black-50 mb-1">Order Details</p>

                <p className="mb-3 px-2">
                  ₹{" "}
                  <span>
                    {Number(order?.amount || 0).toLocaleString("en-IN")}
                  </span>
                </p>

                <div className="d-md-flex gap-md-3">
                  <ul
                    className="list-unstyled d-flex flex-column gap-2 overflow-auto w-100 mb-3 md-md-0"
                    style={{ maxHeight: "8.5rem" }}
                  >
                    {order.items.map((item) => (
                      <li key={item?.productId}>
                        <div className="d-flex bg-light rounded-3 p-2 border align-items-center gap-2">
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

                  <OrderStatusForm
                    orderId={order._id}
                    initialPaymentStatus={order.paymentStatus}
                    initialOrderStatus={order.orderStatus}
                    onSuccess={getAllOrder}
                  />
                </div>
              </div>
            </motion.li>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </ul>
    </motion.section>
  );
};

export default OrderList;

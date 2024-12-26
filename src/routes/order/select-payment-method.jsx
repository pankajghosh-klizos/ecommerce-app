import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Icons } from "../../constants/icons";
import { Button, Container, Loader } from "../../components";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cartProducts.slice";
import axios from "axios";
import config from "../../config/config";
import localforage from "localforage";
import toast from "react-hot-toast";

const SelectPaymentMethod = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { address, amount, items, shippingMethod, deliveryDate } = useSelector(
    (state) => state.orderDetails
  );

  const totalPrice = shippingMethod === "method1" ? amount + 100 : amount + 150;

  let shippingDescription;
  if (shippingMethod === "method1") {
    shippingDescription = "Free Delivery";
  } else if (shippingMethod === "method2") {
    shippingDescription = "Quick Delivery";
  } else {
    shippingDescription = "Scheduled Delivery";
  }

  const [loading, setLoading] = useState(false);

  const paymentModes = [
    {
      id: "mode1",
      label: "Cash on Delivery",
    },
    {
      id: "mode2",
      label: "Online Payment",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentMode: paymentModes[0].id,
    },
  });

  const selectedPaymentMode = watch("paymentMode");

  const onSubmit = async (data) => {
    // Check payment mode
    if (data.paymentMode === "mode1") {
      handleOrderPlacement("placeOrderCod", () => {
        dispatch(clearCart());
        navigate("/order/success");
      });
    } else if (data.paymentMode === "mode2") {
      handleOrderPlacement("placeOrderStripe", (data) => {
        window.location.href = data.session_url;
      });
    }
  };

  const handleOrderPlacement = async (endpoint, successCallback) => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }
      const res = await axios.post(
        `${config.backendUrl}/cyber/payment/orders/${endpoint}`,
        {
          address,
          amount: totalPrice,
          items,
          deliveryDate,
          shippingMethod: shippingDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        successCallback(res.data);
      } else {
        toast.error(res.data.message || "Failed to place order.");
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
  });

  return (
    <motion.section
      className="mt-3 py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Container>
        <div className="d-flex justify-content-md-between gap-5 py-5">
          <div className="d-none d-md-flex align-items-center gap-2 text-black opacity-25">
            <img src={Icons.LocationIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 1</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Address</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 text-black opacity-25">
            <img src={Icons.ShippingIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 2</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Shipping</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 text-black">
            <img src={Icons.PaymentIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 3</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Payment</p>
            </div>
          </div>
        </div>

        <motion.div
          className="d-flex gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            className="d-none d-md-block border rounded-3 p-4 w-100"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-black mb-4">Summary</h2>

            <ul
              className="list-unstyled d-flex flex-column gap-2 overflow-auto mb-4"
              style={{ maxHeight: "26rem" }}
            >
              {items.map((item) => (
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
                        <p className="m-0 lh-sm fw-bold">
                          {item?.product_title || "Product Title"}
                        </p>

                        <p className="m-0 fw-light small text-muted">
                          Quantity: {item?.quantity || 1}
                        </p>
                      </div>

                      <p className="m-0 px-1 px-lg-3 fw-semibold text-end d-flex align-items-center gap-1">
                        ₹{" "}
                        <span>
                          {Number(item?.product_price || 0).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mb-4">
              <p className="fw-semibold text-black-50 mb-2">Address</p>
              <p className="mb-2">
                {address?.street}, {address?.city}, {address?.landMark}
              </p>
              <p className="mb-1">
                {address?.state}, {address?.country}, {address?.zipCode}
              </p>
              <p className="mb-0">{user?.phone}</p>
            </div>

            <div className="mb-3">
              <p className="fw-semibold text-black-50 mb-1">Shipment method</p>
              <p className="fs-5 m-0">{shippingDescription}</p>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-2">
              <p className="fs-5 m-0">Subtotal</p>
              <p className="fs-5 m-0">₹ {amount.toLocaleString("en-IN")}</p>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <p className="fs-5 text-black-50 m-0">Tax</p>
              <p className="fs-5 m-0">₹ 50</p>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <p className="fs-5 text-black-50 m-0">Handling Charge</p>
              <p className="fs-5 m-0">₹ 50</p>
            </div>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="fs-5 text-black-50 m-0">Shipping Charge</p>
              <p className="fs-5 m-0">
                {shippingMethod === "method1" ? "Free" : "₹ 50"}
              </p>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <p className="fs-5">Total</p>
              <p className="fs-5">₹ {totalPrice.toLocaleString("en-IN")}</p>
            </div>
          </motion.div>

          <motion.div
            className="py-5 py-md-0 pt-0 w-100"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <h2 className="text-black mb-4 fw-semibold">Payment</h2>

            <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
              <ul className="list-unstyled mb-4">
                {paymentModes.map((mode) => (
                  <li
                    className={`border border-2 bg-light border-light rounded-3 d-flex gap-2 gap-md-3 p-3 p-md-4 mb-3 ${
                      selectedPaymentMode === mode.id ? "border-dark" : ""
                    }`}
                    key={mode.id}
                  >
                    <div className="pt-1">
                      <input
                        type="radio"
                        value={mode.id}
                        {...register("paymentMode", {
                          required: "Please select a payment method",
                        })}
                        style={{ height: "20px", width: "20px" }}
                      />
                    </div>

                    <div className="w-100 d-md-flex gap-4">
                      <p className="fs-5 m-0 fw-semibold">{mode.label}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {errors.paymentMode && (
                <p className="text-danger">{errors.paymentMode.message}</p>
              )}

              <div className="d-flex gap-3 float-md-end mt-5">
                <Button
                  className="btn-outline-dark rounded-2 py-3 px-5 w-100"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>

                <Button
                  className="btn-dark rounded-2 py-3 px-5 w-100"
                  type="submit"
                >
                  Order {loading && <Loader data-bs-theme="light" />}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default SelectPaymentMethod;

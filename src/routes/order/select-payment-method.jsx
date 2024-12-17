import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icons } from "../../constants/icons";
import { Button, Container, Input, Loader } from "../../components";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../config/config";
import localforage from "localforage";
import toast from "react-hot-toast";

const SelectPaymentMethod = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { address, amount, items, shippingMethod } = useSelector(
    (state) => state.orderDetails
  );
  const totalPrice =
    shippingMethod === "method1" ? amount + 50 : amount + 50 + 50;
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
    console.log(data);
    if (data.paymentMode === "mode1") {
      console.log({ address, amount: totalPrice, items });

      setLoading(true);
      try {
        const token = await localforage.getItem("authToken");
        if (!token) {
          toast.error("Please login again to continue.");
          return navigate("/login");
        }

        const res = await axios.post(
          `${config.backendUrl}/cyber/payment/orders/placeOrderCod`,
          { address, amount: totalPrice, items },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success("Order placed successfully.");
          console.log(res.data);
        } else {
          toast.error(res.data.message || "Failed to place order.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

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

            <div className="mb-4">
              <p className="fw-semibold text-black-50 mb-2">Shipment method</p>
              <p className="fs-5 m-0">
                {shippingMethod === "method1" ? "Free" : "₹ 50"}
              </p>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <p className="fs-5">Subtotal</p>
              <p className="fs-5">₹ {amount.toLocaleString("en-IN")}</p>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <p className="fs-5 text-black-50">Estimated Tax</p>
              <p className="fs-5">₹ 50</p>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <p className="fs-5 text-black-50">
                Estimated Shipping & Handling
              </p>
              <p className="fs-5">
                {shippingMethod === "method1" ? "₹ 50" : "₹ 50 + 50"}
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

              {selectedPaymentMode === "mode2" && (
                <div>
                  <div
                    className="position-relative mb-4"
                    style={{ maxWidth: "30rem" }}
                  >
                    <img
                      src={Icons.CreditCardIcon}
                      alt="card"
                      className="w-100"
                    />

                    <div className="content position-absolute top-50 w-100 px-4">
                      {/* set card number here */}
                      <p className="text-white fs-1 mb-2">
                        0000 0000 0000 0000
                      </p>
                      {/* set card holder name here */}
                      <p className="text-white-50 m-0 fs-5 fw-semibold">
                        Cardholder
                      </p>
                    </div>
                  </div>

                  <Input
                    type="text"
                    placeholder="Enter the cardholder's name"
                    containerClassName="mb-4"
                    errorMessage={errors?.cardholderName?.message}
                    {...register("cardholderName", {
                      required: "Cardholder name is required",
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message:
                          "Cardholder name must contain only letters and spaces",
                      },
                    })}
                  />

                  <Input
                    type="text"
                    placeholder="Enter your card number"
                    containerClassName="mb-4"
                    errorMessage={errors?.cardNumber?.message}
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: {
                        value: /^\d{16}$/,
                        message: "Card number must be 16 digits",
                      },
                    })}
                  />

                  <div className="d-flex gap-2">
                    <Input
                      type="text"
                      placeholder="Exp. Date"
                      containerClassName="mb-4 w-100"
                      errorMessage={errors?.expDate?.message}
                      {...register("expDate", {
                        required: "Expiration date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Expiration date must be in MM/YY format",
                        },
                      })}
                    />

                    <Input
                      type="password"
                      placeholder="CVV"
                      containerClassName="mb-4 w-100"
                      errorMessage={errors?.cvv?.message}
                      {...register("cvv", {
                        required: "CVV is required",
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: "CVV must be 3 or 4 digits",
                        },
                      })}
                    />
                  </div>
                </div>
              )}

              {errors.paymentMode && (
                <p className="text-danger">{errors.paymentMode.message}</p>
              )}

              <div className="d-flex gap-3 float-md-end mt-5">
                <Button className="btn-outline-dark rounded-2 py-3 px-5 w-100">
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

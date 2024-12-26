import { motion } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, OfferProductsSection } from "../components";
import { Icons } from "../constants/icons.js";
import { useEffect } from "react";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartProducts.slice.js";
import toast from "react-hot-toast";
import config from "../config/config.js";
import axios from "axios";
import localforage from "localforage";
import { Link, useNavigate } from "react-router-dom";
import { setAmount, setOrderItems } from "../store/orderDetails.slice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartProducts } = useSelector((state) => state.cartProducts);
  const { user } = useSelector((state) => state.auth);

  const taxCharge = 50;
  const shippingCharge = 50;

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // calculate subtoal
  const calculateSubtotal = () =>
    cartProducts.reduce(
      (total, item) =>
        total + (Number(item?.quantity * item?.product_price) || 0),
      0
    );

  // calculate total
  const calculateTotal = () => calculateSubtotal() + taxCharge + shippingCharge;

  // remove cart item
  const removeItemFromCart = async (productId) => {
    dispatch(removeFromCart(productId));

    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return;
      }
      await axios.delete(
        `${config.backendUrl}/cyber/user/cart/removeFromCart/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred while removing the product."
      );
      console.error(error);
    }
  };

  // increase quantity
  const increaseCartItemsQuantity = async (productId) => {
    const product = cartProducts.find((item) => item.productId === productId);

    if (product.quantity >= product.product_stock) {
      toast.error("Product is out of stock.");
      return;
    }

    dispatch(increaseQuantity(productId));

    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return;
      }

      const item = cartProducts.filter(
        (product) => product.productId === productId
      );

      await axios.put(
        `${config.backendUrl}/cyber/user/cart/updateCartItemQuantity/${item[0].cartItemId}`,
        { quantity: item[0].quantity + 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred while increasing the product quantity."
      );
      console.error(error);
    }
  };

  // descreas quantity
  const decreaseCartItemsQuantity = async (productId) => {
    if (
      cartProducts.find((item) => item.productId === productId).quantity <= 1
    ) {
      removeItemFromCart(productId);
      return;
    }

    dispatch(decreaseQuantity(productId));

    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return;
      }

      const item = cartProducts.filter(
        (product) => product.productId === productId
      );

      await axios.put(
        `${config.backendUrl}/cyber/user/cart/updateCartItemQuantity/${item[0].cartItemId}`,
        { quantity: item[0].quantity - 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred while decreasing the product quantity."
      );
      console.error(error);
    }
  };

  // checkout cart products
  const checkoutCartProducts = () => {
    dispatch(setOrderItems(cartProducts));
    dispatch(setAmount(calculateSubtotal()));

    if (!user.address.length > 0) {
      return toast.error("Please add an address to continue.");
    }

    if (!user.email) {
      return toast.error("Please add an email to continue.");
    }

    navigate("/order/select-address");
  };

  return (
    <>
      <section className="py-5 mt-4">
        <Container>
          <div className="d-md-flex gap-3">
            <div className="w-100 py-4">
              <p className="fs-4 fw-semibold mb-3">Shopping Cart</p>

              {cartProducts.length ? (
                <motion.ul
                  className="list-unstyled d-flex flex-column gap-2 overflow-auto overflow-x-hidden mb-0"
                  style={{ maxHeight: "26rem" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {cartProducts.map((item, index) => (
                    <motion.li
                      key={item?.productId}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                    >
                      <div className="d-flex border border-light-subtle rounded-3 p-2 me-2">
                        {/* Product Image */}
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

                        {/* Product Details */}
                        <div className="d-grid d-lg-flex align-items-lg-center w-100">
                          <div className="me-2">
                            <Link
                              to={`/products/product/${item?.productId}`}
                              className="m-0 lh-1 fw-bold text-black text-decoration-none"
                            >
                              {item?.product_title || "Product Title"}
                            </Link>
                            <p className="m-0 fw-light mb-2 small text-muted">
                              #{item?.cartItemId || "N/A"}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="d-flex align-items-center gap-1">
                            <Button
                              className="fs-4 fw-light p-0 px-2 border-0"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                decreaseCartItemsQuantity(item?.productId)
                              }
                            >
                              -
                            </Button>
                            <p className="m-0 border px-3 py-1 rounded">
                              {item?.quantity || 1}
                            </p>
                            <Button
                              className="fs-4 fw-light p-0 px-2 border-0"
                              aria-label="Increase quantity"
                              disabled={item?.quantity >= item?.product_stock}
                              onClick={() =>
                                increaseCartItemsQuantity(item.productId)
                              }
                            >
                              +
                            </Button>
                          </div>

                          {/* Product Price */}
                          <p className="m-0 px-1 px-lg-3 fw-semibold text-end d-flex align-items-center gap-1">
                            ₹{" "}
                            <span>
                              {Number(item?.product_price || 0).toLocaleString(
                                "en-IN"
                              )}
                            </span>
                          </p>
                        </div>

                        {/* Remove Button */}
                        <div className="mb-auto">
                          <Button
                            className="p-0"
                            aria-label="Remove item"
                            onClick={() => removeItemFromCart(item?.productId)}
                          >
                            <img
                              src={Icons?.Close || "/path/to/fallback-icon.jpg"}
                              alt="Remove item"
                            />
                          </Button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <p className="text-black-50 fs-5 text-center my-md-4">
                  No items in cart
                </p>
              )}
            </div>

            {/* Order Summary */}
            {cartProducts.length > 0 && (
              <motion.div
                className="w-100 py-4 pb-5 px-2 px-md-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p className="fs-4 fw-semibold mb-3">Order Summary</p>

                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="fs-5 m-0">Subtotal</p>
                  <p className="fs-5 m-0">
                    ₹ {calculateSubtotal().toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <p className="fs-5 text-black-50 m-0">Estimated Tax</p>
                  <p className="fs-5 m-0">₹ {taxCharge}</p>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-3">
                  <p className="fs-5 text-black-50 m-0">
                    Estimated Handling Charge
                  </p>
                  <p className="fs-5 m-0">₹ {shippingCharge}</p>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-5">
                  <p className="fs-5">Total</p>
                  <p className="fs-5">
                    ₹ {calculateTotal().toLocaleString("en-IN")}
                  </p>
                </div>

                <Button
                  className="btn-lg btn-dark w-100"
                  onClick={checkoutCartProducts}
                >
                  Checkout
                </Button>
              </motion.div>
            )}
          </div>
        </Container>
      </section>

      <OfferProductsSection />
    </>
  );
};

export default Cart;

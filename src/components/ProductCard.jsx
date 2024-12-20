import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icons } from "../constants/icons.js";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import localforage from "localforage";
import axios from "axios";
import config from "../config/config.js";
import {
  addToWishlist,
  removeFromWishlist,
} from "../store/wishlistProducts.slice.js";
import { setCartProducts } from "../store/cartProducts.slice.js";
import { motion } from "motion/react";
import Loader from "./Loader/Loader.jsx";

const ProductCard = ({ id, title, banner, price }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { wishlistProducts } = useSelector((state) => state.wishlistProducts);
  const { cartProducts } = useSelector((state) => state.cartProducts);
  const [loading, setLoading] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const isInWishlist = (productId) => {
    return wishlistProducts.some((item) => item.id === productId);
  };

  const isInCart = (productId) => {
    return cartProducts.some((item) => item.productId === productId);
  };

  const removeProductFromWishlist = async () => {
    dispatch(removeFromWishlist(id));
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        return toast.error("Please login again to continue.");
      }
      await axios.delete(
        `${config.backendUrl}/cyber/user/wishlist/removeFromWishlist/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred."
      );
      console.error(error);
    }
  };

  const addProductInWishlist = async () => {
    dispatch(
      addToWishlist({
        id,
        title,
        images: banner,
        basePrice: price,
        isWishlist: true,
      })
    );
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        return toast.error("Please login again to continue.");
      }
      await axios.post(
        `${config.backendUrl}/cyber/user/wishlist/addToWishlist`,
        { productId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred while adding to the wishlist."
      );
      console.error(error);
    }
  };

  const addProductInCart = async (productId, quantity = 1) => {
    setLoading(true);

    const product = products.find((product) => product._id === productId);

    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        return toast.error("Please login again to continue.");
      }

      const res = await axios.post(
        `${config.backendUrl}/cyber/user/cart/addToCart`,
        {
          productId,
          quantity,
          product_price:
            product.product_basePrice +
            product?.variants[0]?.product_additional_price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setCartProducts(res.data.cart));
      } else {
        setOutOfStock(true);
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03 },
  };

  return (
    <motion.div
      className="card border-light-subtle bg-light mx-auto"
      style={{ width: "15rem" }}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.4 }}
    >
      {user?.role !== "admin" && (
        <div className="d-flex justify-content-end align-items-center">
          {!isInWishlist(id) ? (
            <Button className="p-2 border-0" onClick={addProductInWishlist}>
              <img src={Icons?.Heart} alt="wishlist" height="22px" />
            </Button>
          ) : (
            <Button
              className="p-2 border-0"
              onClick={removeProductFromWishlist}
            >
              <img src={Icons?.FillHeart} alt="wishlist" height="22px" />
            </Button>
          )}
        </div>
      )}

      <div className="mx-3 my-0 py-3 rounded-1 overflow-hidden d-flex justify-content-center">
        <img src={banner} alt="Product" height="180px" />
      </div>

      <div className="card-body">
        <Link
          to={`/products/product/${id}`}
          className="card-title text-decoration-none fs-5 truncate-1-lines fw-semibold mb-0 lh-sm text-center"
        >
          {title}
        </Link>

        <p className="card-text fw-semibold d-flex align-items-center justify-content-center gap-3">
          ₹ {price.toLocaleString("en-IN")}
        </p>

        <Link
          to={`/products/product/${id}`}
          className="btn btn-outline-dark rounded-1 w-100 mb-2"
        >
          View More
        </Link>

        {user?.role !== "admin" && (
          <>
            {!isInCart(id) ? (
              <Button
                className="btn-dark rounded-1 w-100"
                disabled={outOfStock || loading}
                onClick={() => addProductInCart(id)}
              >
                {outOfStock ? "Out of stock" : "Add to Cart"}{" "}
                {loading && <Loader data-bs-theme="dark" />}
              </Button>
            ) : (
              <Link to={`/cart`} className="btn btn-secondary rounded-1 w-100">
                Go to cart
              </Link>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;

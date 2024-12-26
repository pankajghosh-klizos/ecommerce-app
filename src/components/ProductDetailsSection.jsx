import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Loader } from "../components";
import { Icons } from "../constants/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { setCartProducts } from "../store/cartProducts.slice.js";
import { addToWishlist } from "../store/wishlistProducts.slice.js";
import localforage from "localforage";
import axios from "axios";
import config from "../config/config.js";

const ProductDetailsSection = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.productDetails);
  const { products } = useSelector((state) => state.products);
  const { cartProducts } = useSelector((state) => state.cartProducts);
  const { wishlistProducts } = useSelector((state) => state.wishlistProducts);
  const basePrice = productDetails?.product_basePrice || 0;
  const description =
    productDetails?.product_description || "No description available.";
  const title = productDetails?.product_title || "Product Name";
  const variants = productDetails?.variants || [];
  const [selectedVariant, setSelectedVariant] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const features = [
    {
      icon: Icons.Truck,
      title: "Free Delivery",
      subtitle: `${selectedVariant.product_delivery_time || "N/A"} day`,
      iconSize: "20px",
    },
    {
      icon: Icons.Home,
      title: "Stock Status",
      subtitle: selectedVariant.product_stock > 0 ? "In Stock" : "Out of Stock",
      iconSize: "22px",
    },
    {
      icon: Icons.Verify,
      title: "Guaranteed",
      subtitle: `${selectedVariant.product_guarantee || "N/A"} year`,
      iconSize: "24px",
    },
  ];

  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariant(variants[0]);
    }
  }, [variants]);

  const handleVariantChange = (variant) => setSelectedVariant(variant);

  // check product already in whislist or not
  const isInWishlist = (productId) => {
    return wishlistProducts.some((item) => item.id === productId);
  };

  // check product already in cart or not
  const isInCart = (productId) => {
    return cartProducts.some((item) => item.productId === productId);
  };

  // add item in cart
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

  // add item in wishlist
  const addProductInWishlist = async (id, title, banner, price) => {
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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.section
      className="mt-5 py-5"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Container>
        <div className="d-lg-flex">
          {/* Product Images */}

          <div className="d-lg-flex gap-3 w-100">
            {/* Main Image */}
            <motion.div
              className="order-2 mb-3 mb-md-0 w-100 d-flex justify-content-center align-items-center bg-body-tertiary rounded-2"
              variants={fadeInUp}
            >
              <img
                src={selectedVariant.product_images?.[imageIndex] || ""}
                alt="product-main"
                className="img-fluid"
              />
            </motion.div>

            {/* Thumbnails */}
            <ul className="list-unstyled m-0 d-flex d-md-block justify-content-center gap-2 mb-4 mb-md-0">
              {selectedVariant.product_images?.map((image, index) => (
                <motion.li
                  key={index}
                  className="p-2 bg-body-tertiary rounded-2 shadow-sm border border-2 border-light mb-2"
                  variants={fadeInUp}
                  style={{ width: "80px", height: "80px" }}
                >
                  <Button
                    className="p-0 border-0 w-100 h-100"
                    onClick={() => {
                      setImageIndex(index);
                    }}
                  >
                    <img
                      src={image}
                      alt={`thumbnail-${index}`}
                      className="img-fluid"
                    />
                  </Button>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Product Details */}
          <div className="w-100 px-lg-5">
            <motion.h2 className="h1 mb-3 fw-bold" variants={fadeInUp}>
              {title}
            </motion.h2>

            <motion.h3 className="mb-4" variants={fadeInUp}>
              <span className="me-3">
                ₹ {selectedVariant.totalVariantPrice?.toLocaleString("en-IN")}
              </span>
              <strike className="text-black-50 h4">
                ₹{" "}
                {(selectedVariant.totalVariantPrice + 5000)?.toLocaleString(
                  "en-IN"
                )}
              </strike>
            </motion.h3>

            {/* Select Color */}
            <motion.div className="d-flex gap-4 mb-3" variants={fadeInUp}>
              <p>Select color:</p>
              <div className="d-flex gap-2">
                {variants.map((variant) => (
                  <button
                    title={variant.product_color}
                    key={variant._id}
                    onClick={() => handleVariantChange(variant)}
                    className="btn rounded-circle colors p-0 border"
                    style={{
                      backgroundColor: variant.product_color,
                      scale:
                        selectedVariant._id === variant._id ? "1.1" : "0.9",
                    }}
                  ></button>
                ))}
              </div>
            </motion.div>

            {/* Select Storage */}
            <motion.div
              className="d-flex gap-2 flex-wrap mb-3"
              variants={fadeInUp}
            >
              {variants.map((variant) => (
                <Button
                  key={variant._id}
                  onClick={() => handleVariantChange(variant)}
                  className={`rounded-2 w-25 ${
                    selectedVariant._id === variant._id
                      ? "btn-dark"
                      : "btn-outline-dark"
                  }`}
                >
                  {variant.product_storage}
                </Button>
              ))}
            </motion.div>

            {/* Product Description */}
            <motion.p className="text-black-50 mb-4" variants={fadeInUp}>
              <span className="truncate-3-lines">{description}</span>
              <Link to="#" className="text-black d-inline">
                more
              </Link>
            </motion.p>

            {/* Add to Cart Buttons */}
            {user?.role !== "admin" && (
              <motion.div
                className="d-grid d-lg-flex align-items-center gap-2 mb-5"
                variants={fadeInUp}
              >
                {!isInWishlist(productDetails._id) ? (
                  <Button
                    className="btn-dark btn-lg rounded-1 py-2 px-5"
                    onClick={() =>
                      addProductInWishlist(
                        productDetails._id,
                        productDetails.product_title,
                        productDetails.variants[0].product_images[0],
                        productDetails.product_basePrice
                      )
                    }
                  >
                    Add to Wishlist
                  </Button>
                ) : (
                  <Link
                    to={`/wishlist`}
                    className="btn btn-dark btn-lg rounded-1 py-2 px-5"
                  >
                    Go to wishlist
                  </Link>
                )}

                {!isInCart(productDetails._id) ? (
                  <Button
                    className="btn-outline-dark btn-lg rounded-1 py-2 px-5"
                    disabled={selectedVariant.product_stock <= 0}
                    onClick={() => addProductInCart(productDetails._id)}
                  >
                    {outOfStock ? "Out of stock" : "Add to Cart"}{" "}
                    {loading && <Loader data-bs-theme="dark" />}
                  </Button>
                ) : (
                  <Link
                    to={`/cart`}
                    className="btn btn-outline-dark btn-lg rounded-1 py-2 px-5"
                  >
                    Go to cart
                  </Link>
                )}
              </motion.div>
            )}

            {/* Features */}
            {user?.role !== "admin" && (
              <motion.div
                className="d-flex flex-wrap gap-4 mb-4"
                variants={fadeInUp}
              >
                {features.map((feature, index) => (
                  <div key={index} className="d-flex align-items-center gap-3">
                    <div className="p-3 rounded-2 icon">
                      <img
                        src={feature.icon}
                        alt={`icon-${index}`}
                        height={feature.iconSize}
                      />
                    </div>
                    <p className="m-0">
                      <span className="d-block text-black-50">
                        {feature.title}
                      </span>
                      <span className="text-black">{feature.subtitle}</span>
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default ProductDetailsSection;

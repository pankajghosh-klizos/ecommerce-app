import { useSelector, useDispatch } from "react-redux";
import { Button, Container } from "../components";
import { Icons } from "../constants/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { addToCart } from "../store/cartProducts.slice.js";
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

  const features = [
    {
      icon: Icons.Truck,
      title: "Free Delivery",
      subtitle: `${selectedVariant.product_delivery_time || "N/A"} day`,
      iconSize: "20px",
    },
    {
      icon: Icons.Home,
      title: "In Stock",
      subtitle: `${selectedVariant.product_stock || 0} units`,
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
    const product = products.find((product) => product._id === productId);
    console.log(product);
    dispatch(
      addToCart({
        ...product,
        cartItemId: product._id,
        product_image: product?.variants[0]?.product_images[0],
        productId: product._id,
        product_price:
          (product.product_basePrice +
            product?.variants[0]?.product_additional_price) *
          quantity,
        quantity,
      })
    );
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        return toast.error("Please login again to continue.");
      }

      await axios.post(
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
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred."
      );
      console.error(error);
    }
  };

  // add item in wishlist
  const addProductInWishlist = async () => {
    dispatch(
      addToWishlist({
        id: productDetails._id,
        title: productDetails.product_title,
        images: productDetails.variants[0],
        basePrice: productDetails.product_basePrice,
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
        { productId: productDetails._id },
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
        <div className="d-lg-flex align-items-center">
          {/* Product Images */}
          <div className="w-100">
            <div className="d-lg-flex gap-3">
              {/* Main Image */}
              <motion.div className="p-4 order-2 mx-auto" variants={fadeInUp}>
                <img
                  src={selectedVariant.product_images?.[0] || ""}
                  alt="product-main"
                  className="w-100"
                />
              </motion.div>

              {/* Thumbnails */}
              <div className="d-flex justify-content-center justify-content-lg-start d-lg-block mt-lg-4 mb-4 order-1">
                {selectedVariant.product_images?.map((image, index) => (
                  <motion.div key={index} className="p-2" variants={fadeInUp}>
                    <Button className="p-0">
                      <img
                        src={image}
                        alt={`thumbnail-${index}`}
                        height="80px"
                      />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
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
                ₹ {basePrice.toLocaleString("en-IN")}
              </strike>
            </motion.h3>

            {/* Select Color */}
            <motion.div className="d-flex gap-4 mb-3" variants={fadeInUp}>
              <p>Select color:</p>
              <div className="d-flex gap-2">
                {variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantChange(variant)}
                    className="btn rounded-circle colors p-0 border"
                    style={{
                      backgroundColor: variant.product_color,
                      border:
                        selectedVariant._id === variant._id
                          ? "2px solid black"
                          : "none",
                    }}
                  ></button>
                ))}
              </div>
            </motion.div>

            {/* Select Storage */}
            <motion.div className="d-flex mb-3" variants={fadeInUp}>
              <div className="d-flex gap-2 w-100">
                {variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantChange(variant)}
                    className={`btn btn-outline-dark rounded-2 w-25 ${
                      selectedVariant._id === variant._id ? "" : "opacity-50"
                    }`}
                  >
                    {variant.product_storage}
                  </button>
                ))}
              </div>
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
                  <Button className="btn-dark btn-lg rounded-1 py-2 px-5">
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
                    onClick={() => addProductInCart(productDetails._id)}
                  >
                    Add to Cart
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

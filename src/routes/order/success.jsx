import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SuccessGif from "../../assets/success.gif";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartProducts.slice";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 },
    },
  };

  return (
    <motion.div
      className="min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Success GIF */}
      <motion.div className="mb-4" variants={fadeInUp}>
        <img src={SuccessGif} alt="success" />
      </motion.div>

      {/* Text and Button */}
      <motion.div className="text-center" variants={fadeInUp}>
        <p className="h1 display-1 mb-4">Thank you for your order.</p>
      </motion.div>

      <motion.div className="text-center" variants={fadeInUp}>
        <p className="fs-5 text-black-50 mb-4">
          Your order has been placed successfully.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <Link to="/" className="btn btn-dark fs-4 py-2 px-4">
          Continue Shopping
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default OrderSuccess;

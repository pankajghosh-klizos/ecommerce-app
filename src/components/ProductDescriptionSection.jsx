import { useSelector } from "react-redux";
import { Container } from "../components";
import { motion } from "motion/react";

const ProductDescriptionSection = () => {
  const { productDetails } = useSelector((state) => state.productDetails);
  const selectedVariant = productDetails?.variants?.[0];

  const screenDetails = [
    ["Screen Size", selectedVariant?.product_screentype || "N/A"],
    ["Battery Capacity", `${selectedVariant?.product_battery_capacity} mAh`],
    ["Main Camera", selectedVariant?.product_main_camera || "N/A"],
    ["Front Camera", selectedVariant?.product_front_camera || "N/A"],
  ];

  const cpuDetails = [
    ["Processor", selectedVariant?.product_cpu || "N/A"],
    ["Cores", selectedVariant?.product_cores || "N/A"],
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  return (
    <motion.section
      className="py-5 pt-0"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Container>
        <motion.h3 className="mb-3" variants={fadeInUp}>
          Details
        </motion.h3>
        <motion.p className="text-black-50 mb-4" variants={fadeInUp}>
          {productDetails?.product_description || "N/A"}
        </motion.p>

        <motion.h4 className="mb-3" variants={fadeInUp}>
          Screen
        </motion.h4>
        <motion.ul className="list-unstyled mb-5" variants={fadeInUp}>
          {screenDetails.map(([label, value], index) => (
            <motion.li
              key={index}
              className="d-flex justify-content-between border-bottom mb-3 gap-4"
              variants={fadeInUp}
            >
              <p>{label}</p>
              <p>{value}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.h4 className="mb-3" variants={fadeInUp}>
          CPU
        </motion.h4>
        <motion.ul className="list-unstyled" variants={fadeInUp}>
          {cpuDetails.map(([label, value], index) => (
            <motion.li
              key={index}
              className="d-flex justify-content-between border-bottom mb-3 gap-4"
              variants={fadeInUp}
            >
              <p>{label}</p>
              <p>{value}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </motion.section>
  );
};

export default ProductDescriptionSection;

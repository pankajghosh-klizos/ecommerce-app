import { motion } from "motion/react";
import Button from "./Button";

const SaleSection = () => (
  <motion.section
    className="py-4 d-flex align-items-center justify-content-center flex-column sale px-2"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <p className="display-1 fw-lighter text-white mb-3">
      Big Summer{" "}
      <span className="fw-semibold d-block d-md-inline text-center">Sale</span>
    </p>

    <p className="text-white-50 text-center fw-light fs-5 mb-5 w-50">
      Get ready for the hottest deals of the season. Enjoy up to 50% off on a
      wide range of products. Shop now and refresh your tech collection with
      amazing discounts.
    </p>
    <Button className="btn-outline-light rounded-2 py-2 px-5 btn-lg">
      Shop Now
    </Button>
  </motion.section>
);

export default SaleSection;

import { motion } from "motion/react";
import { Images } from "../constants/images";
import Container from "./Container";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section
    className="pt-5 pt-md-0"
    style={{
      background: "linear-gradient(90.7deg, #211c24 0.64%, #211c24 101%)",
    }}
  >
    <Container className="position-relative overflow-hidden d-grid align-items-center">
      <div className="row align-items-center justify-content-between text-white pt-5">
        {/* Animated Text Section */}
        <motion.div
          className="col-12 col-md-6 text-center text-md-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="fs-3 text-white-50">Pro.Beyond.</p>
          <p className="display-1 fw-lighter">
            IPhone 14 <span className="fw-semibold">Pro</span>
          </p>
          <p className="text-white-50 fw-light mb-4 fs-5">
            Created to change everything for the better. For everyone
          </p>
          <Link
            to="/products/product/6752b332ad9cec5bf03c59b1"
            className="btn btn-outline-light px-5 py-3 mx-auto mx-md-0"
          >
            View More
          </Link>
        </motion.div>

        {/* Animated Image Section */}
        <motion.div
          className="col-12 col-md-6"
          style={{ maxWidth: "500px" }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <img
            src={Images.homeBanner}
            alt="banner"
            className="img-fluid w-100"
          />
        </motion.div>
      </div>
    </Container>
  </section>
);

export default HeroSection;

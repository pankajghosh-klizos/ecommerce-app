import { motion } from "motion/react";
import { Images } from "../../constants/images";
import "./BentoGrid.css";
import { Link } from "react-router-dom";

const BentoGrid = () => {
  return (
    <div className="p-0 m-0 flex-grid">
      <div className="d-lg-flex">
        <div className="w-100">
          <motion.div
            className="list-group-item bento-grid-item bento-grid-item-1 py-5 py-md-0 w-100 d-lg-flex bg-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.img
              src={Images?.playStation}
              alt="banner"
              className="w-100 px-5 mb-5 mb-md-0 px-md-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />

            <motion.div
              className="content text-center text-md-start px-4 py-md-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              <p className="fs-1 fw-light">
                Playstation <span className="fw-semibold">5</span>
              </p>
              <p className="m-0">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </motion.div>
          </motion.div>

          <div className="d-lg-flex">
            <motion.div
              className="list-group-item bento-grid-item bento-grid-item-2 py-5 w-100 d-lg-flex align-items-md-center w-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.img
                src={Images?.airPodsMax}
                alt="banner"
                className="w-100 px-5 mb-5 mb-md-0 px-md-0"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

              <motion.div
                className="content text-center text-md-start px-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <p className="fs-1 fw-light lh-sm">
                  Apple AirPods <span className="fw-semibold">Max</span>
                </p>
                <p className="m-0">
                  Computational audio. Listen, it&apos;s powerful
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="list-group-item bento-grid-item bento-grid-item-3 py-5 w-100 d-lg-flex w-100 align-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.img
                src={Images?.visionPro}
                alt="banner"
                className="w-100 px-5 mb-5 mb-md-0 px-md-0"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />

              <motion.div
                className="content text-center text-md-start px-4 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                <p className="fs-1 fw-light lh-sm">
                  Apple Vision <span className="fw-semibold">Pro</span>
                </p>
                <p className="m-0 text-white-50">
                  An immersive way to experience entertainment
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="list-group-item bento-grid-item py-4 w-100 bento-grid-item-4 w-100 d-lg-flex align-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.img
            src={Images?.macbookAir}
            alt="banner"
            className="w-100 px-5 mb-5 mb-md-0 px-md-0"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          <motion.div
            className="content text-center text-md-start px-4 px-md-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <p className="fs-1 fw-light">
              Macbook <span className="fw-semibold">Air</span>
            </p>

            <p className="m-0">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>

            <Link
              to="/products/product/67580e5b74e87650b772123d"
              className="btn btn-outline-dark mx-auto px-5 py-2 mt-4"
            >
              View More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BentoGrid;

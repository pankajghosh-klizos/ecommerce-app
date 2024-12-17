import { Link } from "react-router-dom";
import Container from "./Container";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"; // Import framer motion

const HighlightProductsSection = () => {
  const { products } = useSelector((state) => state.products);
  const highlightProducts = products.slice(1, 5);

  return (
    <section className="bg-light">
      <Container className="border border-light-subtle px-0">
        <motion.ul
          className="m-0 p-0 d-lg-flex list-unstyled"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {highlightProducts.map((item, index) => (
            <motion.li
              key={item?._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * index, duration: 0.6 }}
            >
              <div
                className={`card border-0 rounded-0 h-100 mx-auto border-light-subtle
                  ${index === 1 && "bg-body-secondary"} ${
                  index === 2 && "bg-secondary-subtle"
                } ${index === 3 && "bg-dark text-white"}`}
                style={{ width: "21rem" }}
              >
                <motion.div
                  className="mx-4 mt-4 py-4 overflow-hidden d-flex justify-content-center"
                  whileHover={{ scale: 1.05 }} // Scale effect on hover
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={item?.variants[0]?.product_images[0]}
                    alt="Product"
                    height="250px"
                  />
                </motion.div>
                <div className="card-body d-flex flex-column px-4 pb-5">
                  <Link
                    to={`/products/product/${item?._id}`}
                    className="card-title text-decoration-none fs-2 fw-light truncate-1-lines"
                  >
                    {item?.product_title}
                  </Link>
                  <motion.p
                    className={`card-text text-black-50 flex-grow-1 truncate-5-lines ${
                      index === 3 && "text-white-50"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + 0.3 * index, duration: 0.5 }}
                  >
                    {item?.product_description}
                  </motion.p>
                  <Link
                    to={`/products/product/${item?._id}`}
                    className={`btn rounded-1 w-75 mb-2 btn-lg ${
                      index === 3 ? "btn-outline-light" : "btn-outline-dark"
                    }`}
                  >
                    View More
                  </Link>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
};

export default HighlightProductsSection;

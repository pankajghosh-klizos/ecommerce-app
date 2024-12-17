import { motion } from "motion/react";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

const OfferProductsSection = () => {
  const { products } = useSelector((state) => state.products);
  const offerProducts = products.slice(-5);

  return (
    <motion.section
      className="py-5 latest-product"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <p className="fs-4 mb-4">Discounts up to -50%</p>
        <ul className="m-0 p-0 d-grid d-md-flex flex-wrap align-items-center justify-content-evenly gap-2 gap-md-3">
          {offerProducts.map((item, index) => (
            <motion.li
              key={item?._id}
              className="list-group-item"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
              }}
            >
              <ProductCard
                id={item?._id}
                banner={item?.variants[0]?.product_images[0]}
                title={item?.product_title}
                price={item?.product_basePrice}
              />
            </motion.li>
          ))}
        </ul>
      </Container>
    </motion.section>
  );
};

export default OfferProductsSection;

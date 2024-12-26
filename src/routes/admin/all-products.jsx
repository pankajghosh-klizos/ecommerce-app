import { Link, useLoaderData } from "react-router-dom";
import { EditCard } from "../../components";
import { motion } from "motion/react";

const AllProducts = () => {
  const { products } = useLoaderData();

  return (
    <motion.section
      className="ps-2 ps-md-3 pt-2 pt-md-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3 gap-3">
        <h1 className="fs-3 fw-semibold m-0">
          All Products{" "}
          <span className="fs-5 opacity-75 bg-secondary-subtle px-2 rounded-1 ms-2">
            {products.length}
          </span>
        </h1>

        <Link
          to="/admin/add-product"
          className="btn py-1 py-md-2 btn-dark d-flex align-items-center gap-2"
        >
          Add product
        </Link>
      </div>

      {products.length > 0 ? (
        <ul className="list-unstyled m-0 d-flex flex-wrap gap-3">
          {products.map((product) => (
            <motion.li
              key={product._id}
              className="mb-2 mb-md-0"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <EditCard
                id={product?._id}
                title={product?.product_title}
                banner={product?.variants[0]?.product_images[0]}
                price={product?.product_basePrice}
              />
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="fs-5 fw-semibold mb-0 text-center text-black-50">
          No products found
        </p>
      )}
    </motion.section>
  );
};

export default AllProducts;

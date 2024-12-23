import { useEffect } from "react";
import { Container, OfferProductsSection, ProductCard } from "../components";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

const Wishlist = () => {
  const { wishlistProducts } = useSelector((state) => state.wishlistProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <section className="my-5 pt-5">
        <Container>
          <p className="fs-4 fw-semibold mb-3">Wishlist Items</p>

          {wishlistProducts.length > 0 ? (
            <ul className="list-unstyled m-0 p-0 d-grid d-md-flex align-items-center flex-wrap gap-2 gap-md-3">
              {wishlistProducts.map((item, index) => (
                <motion.li
                  key={item?.id}
                  className="list-group-item"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <ProductCard
                    id={item.id}
                    title={item.title}
                    price={item?.basePrice}
                    banner={item?.images}
                    marked={item?.isWishlist}
                  />
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-black-50 fs-5 py-4">
              Your wishlist is empty. Start adding items to your wishlist.
            </p>
          )}
        </Container>
      </section>

      <OfferProductsSection />
    </>
  );
};

export default Wishlist;

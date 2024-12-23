import { useCallback, useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Button from "./Button";
import Container from "./Container";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../config/config";
import { Icons } from "../constants/icons";
import { useSelector } from "react-redux";
import PageLoader from "./PageLoader";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const CategoryFilterSection = () => {
  const { filterProducts } = useSelector((state) => state.filterProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState("");
  const [allProducts, setAllProducts] = useState(filterProducts || []);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("smartphone");

  // Predefined categories
  const categories = [
    { id: "smartphone", title: "Smart Phones", icon: Icons?.Phone },
    { id: "smartwatch", title: "Smart Watches", icon: Icons?.SmartWatch },
    { id: "camera", title: "Cameras", icon: Icons?.Camera },
    { id: "headphone", title: "Headphones", icon: Icons?.Headphones },
    { id: "computer", title: "Computers", icon: Icons?.Computer },
  ];

  // Predefined badges
  const badges = ["New Arrival", "Best Seller", "Featured Products"];

  // Fetch filtered products by category and badge
  const getFilteredProducts = useCallback(
    async (categoryId, badge = selectedBadge || "New Arrival") => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${config.backendUrl}/cyber/query/products/queryForProductBadgeAndCategory?category=${categoryId}&badge=${badge}`
        );

        if (res.data.success) {
          setAllProducts(res.data.products);
        } else {
          throw new Error(res.data.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedBadge]
  );

  // Initial fetch if no products are available
  useEffect(() => {
    if (!filterProducts) {
      getFilteredProducts(selectedCategory, selectedBadge);
    }
  }, [filterProducts, getFilteredProducts, selectedBadge, selectedCategory]);

  // Handle badge change
  const handleBadgeChange = (badge) => {
    if (badge !== selectedBadge) {
      setSelectedBadge(badge);
      getFilteredProducts(selectedCategory, badge);
    }
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    if (categoryId !== selectedCategory) {
      setCategoryLoading(true);
      setSelectedCategory(categoryId);
      getFilteredProducts(categoryId, selectedBadge).finally(() => {
        setCategoryLoading(false);
      });
    }
  };

  return (
    <section className="py-5 latest-product">
      <Container>
        <motion.p
          className="m-0 mb-4 fs-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Browse By Category
        </motion.p>

        <motion.ul
          className="category d-grid d-md-flex flex-wrap gap-3 mb-4 list-unstyled"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {categories.map((category) => (
            <motion.li
              key={category?.id}
              className="list-group-item"
              whileHover={{ scale: 1.05 }}
            >
              <Button
                className={`btn-light border border-1 rounded-1 w-100 ${
                  category.id === selectedCategory ? "bg-secondary-subtle" : ""
                }`}
                onClick={() => {
                  handleCategoryChange(category?.id);
                }}
              >
                <img
                  src={category?.icon}
                  alt={category?.title}
                  height="28px"
                  className="pe-none"
                />
                <span className="mb-0 fs-5 pe-none">{category?.title}</span>
              </Button>
            </motion.li>
          ))}
        </motion.ul>

        <motion.ul
          className="list-unstyled d-md-flex gap-3 mb-4 d-grid badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          {badges.map((badge) => (
            <motion.li key={badge} whileHover={{ scale: 1.05 }}>
              <Button
                className={`fs-5 rounded-0 px-1 border-dark border-0 border-2 w-100 ${
                  selectedBadge === badge
                    ? "opacity-100 border-bottom"
                    : "opacity-50"
                }`}
                onClick={() => handleBadgeChange(badge)}
              >
                {badge}
              </Button>
            </motion.li>
          ))}
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link to="/products" className="btn fs-5 w-100">
              View All
            </Link>
          </motion.li>
        </motion.ul>

        {isLoading || categoryLoading ? (
          <PageLoader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {allProducts?.length > 0 ? (
              <ul className="m-0 p-0 d-grid d-md-flex align-items-center flex-wrap gap-2 gap-md-3">
                {allProducts.map((item, index) => (
                  <motion.li
                    key={item?._id}
                    className="list-group-item"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                  >
                    <ProductCard
                      id={item?._id}
                      banner={item?.variants[0]?.product_images[0]}
                      title={item?.product_title}
                      price={
                        item?.product_basePrice +
                        item?.variants[0]?.product_additional_price
                      }
                    />
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No products found</p>
            )}
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default CategoryFilterSection;

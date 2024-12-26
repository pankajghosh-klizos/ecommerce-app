import PropTypes from "prop-types";
import { Icons } from "../../constants/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { useForm } from "react-hook-form";
import Button from "../Button";
import config from "../../config/config.js";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import "./Search.scss";
import toast from "react-hot-toast";

const Search = ({ className = "" }) => {
  const { register, watch, handleSubmit, reset } = useForm();

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const [debouncedQuery] = useDebounce(query, 500);

  const searchProducts = async (query) => {
    try {
      const res = await axios.get(
        `${config.backendUrl}/cyber/query/products/searchProductsByTitleAndDescription/search?query=${query}`
      );

      if (res.data.success) {
        setResults(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const searchInput = watch("searchQuery") || "";

  useEffect(() => {
    if (debouncedQuery) {
      searchProducts(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  useEffect(() => {
    setQuery(searchInput);
  }, [searchInput]);

  return (
    <div className="position-relative">
      <div
        className={`searchbar d-flex align-items-center rounded-2 p-2 gap-1 ${className}`}
      >
        <img src={Icons.Search} alt="icon" className="px-1" />

        <form
          className="d-flex align-items-center gap-1"
          onSubmit={handleSubmit(searchProducts)}
        >
          <input
            type="text"
            className="rounded-1 border-0"
            {...register("searchQuery")}
            placeholder="Type to search..."
          />

          <Button
            type="button"
            className={`btn-dark btn-sm ${!query && "opacity-0"}`}
            onClick={() => {
              reset();
              setResults([]);
              setQuery("");
            }}
          >
            Clear
          </Button>
        </form>
      </div>

      {results.length > 0 && (
        <motion.div
          className="position-absolute overflow-hidden mt-2 rounded p-2 bg-light border shadow-sm w-100"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <ul
            className="bg-light list-unstyled m-0 overflow-hidden overflow-y-auto"
            style={{ maxHeight: "200px" }}
          >
            {results.map((item) => (
              <li key={item.productId}>
                <Link
                  to={`/products/product/${item.productId}`}
                  className="border-bottom d-flex align-items-center gap-2 text-decoration-none text-dark py-2"
                >
                  <div className="w-25 px-3">
                    <img
                      src={
                        item.product_image || "https://via.placeholder.com/150"
                      }
                      alt="banner"
                      className="img-fluid"
                    />
                  </div>

                  <div className="w-75">
                    <p className="m-0 small text-black-50">
                      {item.product_badge}
                    </p>
                    <p className="m-0 text-truncate">{item.product_title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Search;

Search.propTypes = {
  className: PropTypes.string,
};

import { useDispatch, useSelector } from "react-redux";
import { Button, Container, ProductCard } from "../components";
import { Icons } from "../constants/icons";
import { useEffect } from "react";
import Accordion from "../components/Accordion";
import { useForm } from "react-hook-form";
import { setFilteredProducts } from "../store/filterProducts.slice";
import axios from "axios";
import config from "../config/config";
import toast from "react-hot-toast";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { filterProducts } = useSelector((state) => state.filterProducts);

  const { register, handleSubmit, reset } = useForm();

  const sidebarItems = [
    {
      id: "brand",
      title: "Brand",
      options: [
        { id: "brand-apple", label: "Apple" },
        { id: "brand-samsung", label: "Samsung" },
        { id: "brand-xiaomi", label: "Xiaomi" },
        { id: "brand-oneplus", label: "OnePlus" },
      ],
    },
    {
      id: "color",
      title: "Colors",
      options: [
        { id: "color-black", label: "Black" },
        { id: "color-blue", label: "Blue" },
        { id: "color-green", label: "Green" },
        { id: "color-gold", label: "Gold" },
        { id: "color-gray", label: "Gray" },
        { id: "color-pink", label: "Pink" },
        { id: "color-red", label: "Red" },
        { id: "color-silver", label: "Silver" },
        { id: "color-white", label: "White" },
      ],
    },
    {
      id: "battery_capacity",
      title: "Battery capacity",
      options: [
        { id: "battery-capacity-4000mah", label: "4000" },
        { id: "battery-capacity-4500mah", label: "4500" },
        { id: "battery-capacity-5000mah", label: "5000" },
        { id: "battery-capacity-5500mah", label: "5500" },
        { id: "battery-capacity-6000mah", label: "6000" },
      ],
    },
    {
      id: "storage",
      title: "Built-in memory",
      options: [
        { id: "built-in-memory-32gb", label: "32GB" },
        { id: "built-in-memory-64gb", label: "64GB" },
        { id: "built-in-memory-128gb", label: "128GB" },
        { id: "built-in-memory-256gb", label: "256GB" },
      ],
    },
  ];

  const getFilterProducts = async (filters) => {
    try {
      // Construct query string dynamically
      const query = Object.entries(filters)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const res = await axios.get(
        `${config.backendUrl}/cyber/query/products/queryForFilteringProduct?${query}`
      );

      if (res.data.success) {
        dispatch(setFilteredProducts(res.data.filterProducts));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const onSubmit = (data) => {
    const transformedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        acc[key] = value.join(",");
      } else if (value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    getFilterProducts(transformedData);
  };

  const handleClearFilters = () => {
    reset();
    dispatch(setFilteredProducts(products));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="d-md-flex mt-5 pt-4">
      <aside
        className="w-100 pt-md-4 pe-md-3 mb-4 mb-md-0 mx-auto"
        style={{ maxWidth: "300px" }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {sidebarItems.map((sideItem) => (
            <Accordion
              key={sideItem?.id}
              id={sideItem?.id}
              title={sideItem?.title}
            >
              <ul className="list-unstyled m-0">
                {sideItem?.options.map((option) => (
                  <li
                    className="d-flex align-items-center gap-2 p-1"
                    key={option?.id}
                  >
                    <input
                      type="checkbox"
                      id={option?.id}
                      {...register(sideItem.id)}
                      value={option?.label}
                      className="rounded-1"
                      style={{ width: "18px", height: "18px" }}
                    />

                    <label htmlFor={option?.id} className="m-0">
                      {sideItem?.id === "battery_capacity"
                        ? option?.label + " mAh"
                        : option?.label}
                    </label>
                  </li>
                ))}
              </ul>
            </Accordion>
          ))}

          <div className="d-flex justify-content-between">
            <Button type="submit" className="btn-dark mt-3 px-5 w-100 me-2">
              Filter
            </Button>
            <Button
              type="button"
              onClick={handleClearFilters}
              className="btn-light mt-3 px-5 w-100"
            >
              Clear
            </Button>
          </div>
        </form>
      </aside>

      <section className="p-2 p-md-4 px-md-0 w-100">
        <div className="d-flex align-items-center justify-content-between gap-5 mb-3">
          <p className="text-black-50 m-0">
            Selected Products:{" "}
            <span className="text-black">{filterProducts.length}</span>
          </p>

          <div className="dropdown">
            <Button
              className="border border-opacity-10 rounded-1 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled
            >
              By rating
            </Button>

            <ul className="dropdown-menu p-1">
              <li>
                <button className="dropdown-item p-2 d-flex gap-2" href="#">
                  <img src={Icons.starSolid} alt="star" />
                  <span>4.0 & above</span>
                </button>
              </li>
              <li>
                <button className="dropdown-item p-2 d-flex gap-2" href="#">
                  <img src={Icons.starSolid} alt="star" />
                  <span>3.0 & above</span>
                </button>
              </li>
              <li>
                <button className="dropdown-item p-2 d-flex gap-2" href="#">
                  <img src={Icons.starSolid} alt="star" />
                  <span>2.0 & above</span>
                </button>
              </li>
              <li>
                <button className="dropdown-item p-2 d-flex gap-2" href="#">
                  <img src={Icons.starSolid} alt="star" />
                  <span>1.0 & above</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {filterProducts.length > 0 ? (
          <ul className="list-unstyled d-flex gap-3 gap-md-2 flex-wrap m-0 justify-content-center justify-content-md-start">
            {filterProducts.map((product, index) => (
              <li key={index}>
                <ProductCard
                  id={product?._id}
                  title={product?.product_title}
                  banner={product?.variants[0].product_images[0]}
                  price={product?.product_basePrice}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="fs-5 text-black-50 text-center">No products found</p>
        )}
      </section>
    </Container>
  );
};

export default Products;

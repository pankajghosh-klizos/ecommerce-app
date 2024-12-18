import { useDispatch, useSelector } from "react-redux";
import { Button, Container, ProductCard } from "../components";
import { Icons } from "../constants/icons";
import { useEffect } from "react";
import Accordion from "../components/Accordion";

const Products = () => {
  const dispatch = useDispatch;
  const { filterProducts } = useSelector((state) => state.filterProducts);
  const sidebarItems = [
    {
      id: "brand",
      title: "Brand",
      expanded: true,
      options: [
        { id: "brand-apple", label: "Apple", checked: false },
        { id: "brand-samsung", label: "Samsung", checked: false },
        { id: "brand-xiaomi", label: "Xiaomi", checked: false },
        { id: "brand-oneplus", label: "OnePlus", checked: false },
      ],
    },
    {
      id: "colors",
      title: "Colors",
      options: [
        { id: "color-black", label: "Black", checked: false },
        { id: "color-white", label: "White", checked: false },
        { id: "color-blue", label: "Blue", checked: false },
        { id: "color-red", label: "Red", checked: false },
        { id: "color-green", label: "Green", checked: false },
      ],
    },
    {
      id: "battery-capacity",
      title: "Battery capacity",
      options: [
        { id: "battery-capacity-4000mah", label: "4000mAh", checked: false },
        { id: "battery-capacity-4500mah", label: "4500mAh", checked: false },
        { id: "battery-capacity-5000mah", label: "5000mAh", checked: false },
        { id: "battery-capacity-5500mah", label: "5500mAh", checked: false },
        { id: "battery-capacity-6000mah", label: "6000mAh", checked: false },
      ],
    },
    {
      id: "built-in-memory",
      title: "Built-in memory",
      options: [
        { id: "built-in-memory-32gb", label: "32GB", checked: false },
        { id: "built-in-memory-64gb", label: "64GB", checked: false },
        { id: "built-in-memory-128gb", label: "128GB", checked: false },
        { id: "built-in-memory-256gb", label: "256GB", checked: false },
      ],
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container className="d-flex mt-5 pt-4">
      <aside className="w-25 py-4 px-3">
        {sidebarItems.map((sideItem) => (
          <Accordion
            key={sideItem?.id}
            id={sideItem?.id}
            title={sideItem?.title}
            expanded={sideItem?.expanded}
          >
            <ul className="list-unstyle p-0 px-1 py-2 m-0">
              {sideItem?.options.map((option) => (
                <li className="list-group-item" key={option?.id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={option?.id}
                      checked={option?.checked}
                    />
                    <label className="form-check-label" htmlFor={option?.id}>
                      {option?.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
      </aside>

      <section className="flex-grow-1 py-4 px-5 w-75">
        <div className="d-lg-flex align-items-center justify-content-between gap-5 mb-3">
          <p className="text-black-50">
            Selected Products:{" "}
            <span className="text-black">{filterProducts.length}</span>
          </p>

          <div className="dropdown">
            <Button
              className="border border-opacity-10 rounded-1 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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

        {filterProducts?.length > 0 ? (
          <ul className="list-unstyle d-flex gap-2 flex-wrap m-0 p-0 px-5">
            {filterProducts.map((product) => (
              <li key={product?._id} className="list-group-item product-card">
                <ProductCard
                  id={product?._id}
                  title={product?.product_title}
                  banner={product?.first_image}
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

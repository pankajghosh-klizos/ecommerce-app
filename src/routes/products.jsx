import { useSelector } from "react-redux";
import { Button, Container, ProductCard, Sidebar } from "../components";
import { Icons } from "../constants/icons";
import { useEffect } from "react";

const Products = () => {
  const { filterProducts } = useSelector((state) => state.filterProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container className="d-flex mt-5 pt-4">
      <Sidebar />

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

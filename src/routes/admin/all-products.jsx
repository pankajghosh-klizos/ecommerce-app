import { Link, useLoaderData } from "react-router-dom";
import { Icons } from "../../constants/icons";
import { EditCard } from "../../components";

const AllProducts = () => {
  const { products } = useLoaderData();

  return (
    <>
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1 className="fs-3 fw-semibold mb-0">All Products</h1>

        <Link
          to="/admin/add-product"
          className="btn btn-dark d-flex align-items-center gap-2"
        >
          <img src={Icons?.AddCircle} alt="icon" />
          <span>Add new product</span>
        </Link>
      </div>

      {products.length > 0 ? (
        <ul className="list-unstyle d-flex gap-3 flex-wrap m-0 p-0">
          {products.map((product) => (
            <li key={product?._id} className="list-group-item product-card">
              <EditCard
                id={product?._id}
                title={product?.product_title}
                banner={product?.variants[0]?.product_images[0]}
                price={product?.product_basePrice}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="fs-5 fw-semibold mb-0 text-center text-black-50">
          No products found
        </p>
      )}
    </>
  );
};

export default AllProducts;

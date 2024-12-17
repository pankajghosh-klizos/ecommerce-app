import { useSelector } from "react-redux";
import { Button, Container, PageLoader } from "../components";
import { Icons } from "../constants/icons";
import { Images } from "../constants/images";
import { Link } from "react-router-dom";

const ProductDetailsSection = () => {
  const { productDetails } = useSelector((state) => state.productDetails);
  const price = productDetails?.product_basePrice || 0;
  console.log(productDetails);

  const features = [
    {
      icon: Icons.Truck,
      title: "Free Delivery",
      subtitle: "1-2 day",
      iconSize: "20px",
    },
    {
      icon: Icons.Home,
      title: "In Stock",
      subtitle: "Today",
      iconSize: "22px",
    },
    {
      icon: Icons.Verify,
      title: "Guaranteed",
      subtitle: "1 year",
      iconSize: "24px",
    },
  ];

  return (
    <section className="mt-5 py-5">
      <Container>
        <div className="d-lg-flex align-items-center">
          {/* Product Images */}
          <div className="w-100">
            <div className="d-lg-flex gap-3">
              <div
                className="p-4 order-2 mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <img
                  src={Images.productBanner1}
                  alt="banner"
                  className="w-100"
                />
              </div>

              <div className="d-flex justify-content-center justify-content-lg-start d-lg-block mt-lg-4 mb-4 order-1">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="p-2">
                    <Button className="p-0">
                      <img
                        src={Images.productBanner1}
                        alt="banner"
                        height="80px"
                      />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-100 px-lg-5">
            <h2 className="h1 mb-3 fw-bold">
              {productDetails?.product_title || "Product Name"}
            </h2>

            <h3 className="mb-4">
              <span className="me-3">₹ {price.toLocaleString("en-IN")}</span>
              <strike className="text-black-50 h4">$1499</strike>
            </h3>

            <div className="d-flex gap-4 mb-3">
              <p>Select color :</p>
              <div className="d-flex gap-2">
                {["black", "purple", "red", "goldenrod", "gray"].map(
                  (color) => (
                    <button
                      key={color}
                      className="btn rounded-circle colors p-0"
                      style={{ backgroundColor: color }}
                    ></button>
                  )
                )}
              </div>
            </div>

            <div className="d-flex mb-3">
              <div className="d-flex gap-2 w-100">
                {["128GB", "256GB", "512GB", "1TB"].map((size, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-dark rounded-2 w-25 ${
                      size === "1TB" ? "" : "opacity-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-black-50 mb-4">
              <span className="truncate-3-lines">
                {productDetails?.product_description ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."}
              </span>
              <Link to="#" className="text-black d-inline">
                more
              </Link>
            </p>

            <div className="d-grid d-lg-flex align-items-center gap-2 mb-5">
              <button className="btn btn-dark btn-lg rounded-1 py-2 px-5">
                Add to Wishlist
              </button>

              <button className="btn btn-outline-dark btn-lg rounded-1 py-2 px-5">
                Add to Cart
              </button>
            </div>

            <div className="d-flex flex-wrap gap-4 mb-4">
              {features.map((feature, index) => (
                <div key={index} className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-2 icon">
                    <img
                      src={feature.icon}
                      alt="icon"
                      height={feature.iconSize}
                    />
                  </div>
                  <p className="m-0">
                    <span className="d-block text-black-50">
                      {feature.title}
                    </span>
                    <span className="text-black">{feature.subtitle}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetailsSection;

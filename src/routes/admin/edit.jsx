import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import localforage from "localforage";
import toast from "react-hot-toast";
import {
  Button,
  Input,
  Textarea,
  Select,
  PageLoader,
  Loader,
  Modal,
} from "../../components";
import config from "../../config/config";
import { Images } from "../../constants/images";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // product form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // variant form
  const {
    register: registerVariant,
    handleSubmit: handleSubmitVariant,
    formState: { errors: errorsVariant },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetailsById();
    setLoading(false);
  }, []);

  // update product
  const editProductDetails = async (product) => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return;
      }

      const {
        product_title,
        product_description,
        product_badge,
        product_categories,
        product_basePrice,
      } = product;

      const res = await axios.put(
        `${config.backendUrl}/admin/cyber/dashboard/products/updateProduct/${productId}`,
        {
          product_title,
          product_description,
          product_badge,
          product_categories,
          product_basePrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/all-products");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // get product by id
  const getProductDetailsById = async () => {
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return toast.error("Please login again to continue.");
      }

      const res = await axios.get(
        `${config.backendUrl}/cyber/query/products/getSpecificProductWithVariants/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setProduct(res.data.product);
        reset(res.data.product);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch product details."
      );
    }
  };

  // create variant
  const createNewVariant = async (variant) => {
    setLoading(true);

    try {
      const token = await localforage.getItem("authToken");

      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const formData = new FormData();

      // Append files separately
      if (variant.files && variant.files.length > 0) {
        for (const file of variant.files) {
          formData.append("files", file);
        }
      }

      // Append the rest of the fields
      for (const [key, value] of Object.entries(variant)) {
        if (key !== "files" && value !== undefined) {
          formData.append(key, value);
        }
      }

      const res = await axios.post(
        `${config.backendUrl}/admin/cyber/dashboard/products/variants/createProductVariant/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Variant created successfully.");
        window.location.reload();
      } else {
        toast.error(res.data.message || "Failed to create variant.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // delete variant
  const deleteProductVariantById = async (id) => {
    setLoading(true);

    try {
      const token = await localforage.getItem("authToken");

      if (!token) {
        toast.error("Please login again to continue.");
        return;
      }

      const res = await axios.delete(
        `${config.backendUrl}/admin/cyber/dashboard/products/variants/deleteProductVariant/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-2 p-md-4">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1 className="fs-3 fw-semibold mb-0">Product Details</h1>

        <Button className="btn-dark" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {product ? (
        <>
          <form
            className="p-5 bg-body rounded-3 gap-5 border mb-5"
            onSubmit={handleSubmit(editProductDetails)}
          >
            <div className="d-lg-flex gap-lg-4">
              <div className="w-100">
                <Input
                  label="Product Name"
                  type="text"
                  placeholder="Enter the product name"
                  containerClassName="mb-4"
                  errorMessage={errors?.product_title?.message}
                  {...register("product_title", {
                    required: "Product name is required",
                    maxLength: {
                      value: 50,
                      message: "Product name must be less than 50 characters",
                    },
                  })}
                />

                <Textarea
                  label="Product Description"
                  placeholder="Enter product description"
                  rows={5}
                  containerClassName="mb-4"
                  className="custom-textarea-class"
                  errorMessage={errors?.product_description?.message}
                  {...register("product_description", {
                    required: "Product description is required",
                    maxLength: {
                      value: 500,
                      message: "Description must be less than 500 characters",
                    },
                    minLength: {
                      value: 100,
                      message: "Description must be at least 100 characters",
                    },
                  })}
                />
              </div>

              <div className="w-100">
                <Select
                  label="Product Badge"
                  placeholder="Select a badge"
                  options={[
                    { value: "New Arrival", label: "New Arrival" },
                    { value: "Best Seller", label: "Best Seller" },
                    { value: "Featured Products", label: "Featured Products" },
                  ]}
                  containerClassName="mb-4"
                  errorMessage={errors?.product_badge?.message}
                  {...register("product_badge", {
                    required: "Badge is required",
                  })}
                />

                <Select
                  label="Product Category"
                  placeholder="Select a category"
                  options={[
                    { value: "smartphone", label: "Smart Phone" },
                    { value: "smartwatch", label: "Smart Watch" },
                    { value: "camera", label: "Camera" },
                    { value: "headphone", label: "Headphone" },
                    { value: "computer", label: "Computer" },
                    { value: "gaming", label: "Gaming" },
                  ]}
                  containerClassName="mb-4"
                  errorMessage={errors?.product_categories?.message}
                  {...register("product_categories", {
                    required: "Category is required",
                  })}
                />

                <Input
                  label="Base Price"
                  type="number"
                  placeholder="Enter the regular price"
                  containerClassName="mb-4"
                  errorMessage={errors?.product_basePrice?.message}
                  {...register("product_basePrice", {
                    required: "Regular price is required",
                    min: {
                      value: 0.01,
                      message: "Price must be greater than zero",
                    },
                    max: {
                      value: 1000000,
                      message: "Price must be less than or equal to 1,000,000",
                    },
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message:
                        "Invalid price format. Please use up to two decimal places.",
                    },
                  })}
                />
              </div>
            </div>

            <div className="d-lg-flex gap-2 justify-content-end">
              <Button
                className="btn-secondary"
                onClick={() => navigate(`/admin/all-products`)}
              >
                Cancel
              </Button>

              <Button type="submit" className="btn-success" disabled={loading}>
                Save {loading && <Loader data-bs-theme="dark" />}
              </Button>
            </div>
          </form>

          <div>
            <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
              <h1 className="fs-3 fw-semibold mb-0">Variant Details</h1>

              <Modal
                id="variant"
                title="Add new variant"
                isCentered={true}
                containerClassName="modal-xl"
              >
                <form
                  className="p-2 bg-body rounded-3 gap-5"
                  onSubmit={handleSubmitVariant(createNewVariant)}
                  encType="multipart/form-data"
                >
                  <div className="d-lg-flex w-100 gap-lg-4">
                    <div className="w-100">
                      <Input
                        label="Images"
                        type="file"
                        containerClassName="mb-4"
                        accept="image/*"
                        multiple
                        errorMessage={errorsVariant?.files?.message}
                        style={{ height: "40px" }}
                        {...registerVariant("files")}
                      />

                      <Select
                        label="Color"
                        placeholder="Select a color"
                        options={[
                          { value: "black", label: "Black" },
                          { value: "blue", label: "Blue" },
                          { value: "green", label: "Green" },
                          { value: "gold", label: "Gold" },
                          { value: "gray", label: "Gray" },
                          { value: "pink", label: "Pink" },
                          { value: "red", label: "Red" },
                          { value: "silver", label: "Silver" },
                          { value: "white", label: "White" },
                        ]}
                        containerClassName="mb-4"
                        errorMessage={errorsVariant?.product_color?.message}
                        {...registerVariant("product_color", {
                          required: "Brand is required",
                        })}
                      />
                      <Input
                        label="Product Additional Price"
                        type="number"
                        placeholder="Enter the additional price"
                        containerClassName="mb-4"
                        errorMessage={
                          errorsVariant?.product_additional_price?.message
                        }
                        {...registerVariant("product_additional_price", {
                          required: "Additional price is required",
                          min: {
                            value: 1,
                            message: "Price must be at least 1",
                          },
                          max: {
                            value: 1000000,
                            message: "Price must be less than 10,00,000",
                          },
                        })}
                      />
                      <Input
                        label="Product CPU"
                        type="text"
                        placeholder="Enter the CPU details (e.g., IOS 18, A18 Pro chip)"
                        containerClassName="mb-4"
                        errorMessage={errorsVariant?.product_cpu?.message}
                        {...registerVariant("product_cpu", {
                          required: "CPU details are required",
                          maxLength: {
                            value: 100,
                            message:
                              "CPU details must be less than 100 characters",
                          },
                          validate: {
                            notOnlySpaces: (value) =>
                              value.trim() !== "" ||
                              "CPU details cannot be only spaces",
                          },
                        })}
                      />

                      <Input
                        label="Product Cores"
                        type="number"
                        placeholder="Enter the number of cores"
                        containerClassName="mb-4"
                        errorMessage={errorsVariant?.product_cores?.message}
                        {...registerVariant("product_cores", {
                          required: "Number of cores is required",
                          min: {
                            value: 1,
                            message: "There must be at least 1 core",
                          },
                          max: {
                            value: 64,
                            message: "Cores must not exceed 64",
                          },
                        })}
                      />
                      <Input
                        label="Product Main Camera"
                        type="text"
                        placeholder="Enter the main camera details (e.g., 50MP + 16MP)"
                        containerClassName="mb-4"
                        errorMessage={
                          errorsVariant?.product_main_camera?.message
                        }
                        {...registerVariant("product_main_camera", {
                          required: "Main camera details are required",
                          pattern: {
                            value: /^[0-9]+MP(\s\+\s[0-9]+MP){0,3}$/,
                            message:
                              "Main camera details must be a number followed by 'MP' (e.g., 50MP + 16MP)",
                          },
                          validate: {
                            notOnlySpaces: (value) =>
                              value.trim() !== "" ||
                              "CPU details cannot be only spaces",
                          },
                        })}
                      />
                      <Input
                        label="Product Front Camera"
                        type="text"
                        placeholder="Enter the front camera details (e.g., 16 MP)"
                        containerClassName="mb-4"
                        errorMessage={
                          errorsVariant?.product_front_camera?.message
                        }
                        {...registerVariant("product_front_camera", {
                          required: "Front camera details are required",
                          pattern: {
                            value: /^[0-9]+\s?MP$/, // Matches numbers followed by 'MP' (e.g., '16 MP')
                            message:
                              "Front camera details must be a number followed by 'MP' (e.g., 16 MP)",
                          },
                          maxLength: {
                            value: 100,
                            message:
                              "Front camera details must be less than 100 characters",
                          },
                        })}
                      />
                    </div>

                    <div className="w-100">
                      <Select
                        label="Product Brand"
                        placeholder="Select a brand"
                        options={[
                          { value: "apple", label: "Apple" },
                          { value: "samsung", label: "Samsung" },
                          { value: "google", label: "Google" },
                          { value: "sony", label: "Sony" },
                        ]}
                        containerClassName="mb-4"
                        errorMessage={errorsVariant?.product_brand?.message}
                        {...registerVariant("product_brand", {
                          required: "Brand is required",
                        })}
                      />

                      <Input
                        label="Product Battery Capacity"
                        type="number"
                        placeholder="Enter the battery capacity (mAh)"
                        containerClassName="mb-4"
                        errorMessage={
                          errorsVariant?.product_battery_capacity?.message
                        }
                        {...registerVariant("product_battery_capacity", {
                          required: "Battery capacity is required",
                          min: {
                            value: 1500,
                            message:
                              "Battery capacity must be at least 1500 mAh",
                          },
                          max: {
                            value: 6000,
                            message:
                              "Battery capacity must not exceed 6,000 mAh",
                          },
                        })}
                      />

                      <Input
                        label="Product Delivery Time"
                        type="text"
                        placeholder="Enter delivery time range (e.g., 1-2)"
                        containerClassName="mb-4"
                        errorMessage={
                          errorsVariant?.product_delivery_time?.message
                        }
                        {...registerVariant("product_delivery_time", {
                          required: "Delivery time range is required",
                          pattern: {
                            value: /^[0-9]+-[0-9]+$/,
                            message:
                              "Delivery time must be a valid range (e.g., 1-2)",
                          },
                        })}
                      />

                      <Input
                        label="Product Guarantee"
                        type="number"
                        placeholder="Enter the guarantee details (e.g., in years)"
                        containerClassName="mb-4"
                        errorMessage={errorsVariant?.product_guarantee?.message}
                        {...registerVariant("product_guarantee", {
                          required: "Guarantee details are required",
                          min: {
                            value: 1,
                            message: "Guarantee must be at least 1 year",
                          },
                          max: {
                            value: 10,
                            message: "Guarantee cannot exceed 10 years",
                          },
                        })}
                      />

                      <Input
                        label="Product Storage"
                        type="text"
                        placeholder="Enter the storage capacity (e.g., 128 GB or 1 TB)"
                        containerClassName="mb-4"
                        errorMessage={errorsVariant?.product_storage?.message}
                        {...registerVariant("product_storage", {
                          required: "Storage capacity is required",
                          pattern: {
                            value: /^[0-9]+(\s?GB|\s?TB)$/, // Matches numbers followed by either 'GB' or 'TB'
                            message:
                              "Must be a number followed by 'GB' or 'TB' (e.g., 128 GB or 1 TB)",
                          },
                          minLength: {
                            value: 4,
                            message:
                              "Storage capacity must be at least 4 characters",
                          },
                          maxLength: {
                            value: 10,
                            message:
                              "Storage capacity must not exceed 10 characters",
                          },
                        })}
                      />

                      <Input
                        label="Product Screen (Size & Type)"
                        type="text"
                        placeholder="Enter screen size (in inches) and type (e.g., 6.7 Super Retina XDR OLED)"
                        containerClassName="mb-4"
                        errorMessage={
                          errorsVariant?.product_screentype?.message
                        }
                        {...registerVariant("product_screentype", {
                          required: "Screen size and type are required",
                          pattern: {
                            value: /^\d+(\.\d{1,2})?\s+[A-Za-z0-9\s]+$/,
                            message:
                              "Please enter a valid screen size and type (e.g., 6.7 Super Retina XDR OLED)",
                          },
                        })}
                      />

                      <Input
                        label="Product Stock"
                        type="number"
                        placeholder="Enter the stock quantity"
                        containerClassName="mb-4"
                        errorMessage={errorsVariant?.product_stock?.message}
                        {...registerVariant("product_stock", {
                          required: "Stock quantity is required",
                          min: {
                            value: 1,
                            message: "Stock quantity must be at least 1",
                          },
                          max: {
                            value: 10000,
                            message: "Stock quantity must not exceed 10,000",
                          },
                        })}
                      />
                    </div>
                  </div>

                  <div className="d-lg-flex gap-2 justify-content-end">
                    <Button
                      className="btn-secondary rounded-1"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="btn-dark"
                      disabled={loading}
                    >
                      Save {loading && <Loader data-bs-theme="dark" />}
                    </Button>
                  </div>
                </form>
              </Modal>
            </div>

            {product.variants.length > 0 ? (
              <ul className="list-unstyled p-0 m-0 d-grid gap-3">
                {product.variants.map((variant) => (
                  <li
                    key={variant._id}
                    className="d-lg-flex gap-4 border p-5 rounded-3 bg-body"
                  >
                    <div className="d-grid gap-3">
                      <div className="w-100 d-flex gap-3">
                        <div
                          className="d-flex align-items-center justify-content-center border border-light-subtle"
                          style={{ height: "150px", width: "150px" }}
                        >
                          <img
                            src={
                              variant?.product_images[0] ||
                              Images.DefaultPlaceholder
                            }
                            alt="product-image-2"
                            className="object-fit-cover h-100"
                          />
                        </div>

                        <img
                          src={
                            variant?.product_images[1] ||
                            Images.DefaultPlaceholder
                          }
                          alt="product-image-2"
                          height="150px"
                          width="150px"
                        />
                      </div>

                      <div className="w-100 d-flex gap-3">
                        <img
                          src={
                            variant?.product_images[2] ||
                            Images.DefaultPlaceholder
                          }
                          alt="product-image-2"
                          height="150px"
                          width="150px"
                          className="object-fit-cover"
                        />

                        <img
                          src={
                            variant?.product_images[3] ||
                            Images.DefaultPlaceholder
                          }
                          alt="product-image-2"
                          height="150px"
                          width="150px"
                        />
                      </div>
                    </div>

                    {/* variant details */}
                    <div className="w-100">
                      <h5 className="mb-3">
                        {variant?.product_brand} {variant?.product_model}
                      </h5>

                      <p className="mb-2">
                        <span className="fw-bold">Color :</span>{" "}
                        <span
                          className="text-black-50 d-inline-block w-25 px-2 rounded-1"
                          style={{ backgroundColor: variant?.product_color }}
                        >
                          {variant?.product_color}
                        </span>
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">Battery Capacity:</span>{" "}
                        {variant?.product_battery_capacity} mAh
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">CPU:</span>{" "}
                        {variant?.product_cpu}
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">Cores:</span>{" "}
                        {variant?.product_cores}
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">Delivery Time:</span>{" "}
                        {variant?.product_delivery_time}
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">Guarantee:</span>{" "}
                        {variant?.product_guarantee} years
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">Storage:</span>{" "}
                        {variant?.product_storage}
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">Screen (Size & Type):</span>{" "}
                        {variant?.product_screentype}
                      </p>

                      <p className="mb-2">
                        <span className="fw-bold">Stock:</span>{" "}
                        {variant?.product_stock}
                      </p>
                    </div>

                    {/* variant actions */}
                    <div className="d-flex flex-column gap-2">
                      <Link
                        to={`/admin/product/variant/${variant?._id}/edit`}
                        className="btn btn-outline-dark"
                      >
                        Edit
                      </Link>

                      <Modal id={variant?._id} title="Delete" isCentered={true}>
                        <p className="fs-5 fw-bold text-center mb-3">
                          Confirm Variant Deletion
                        </p>
                        <p className="text-black-50 text-center mb-4">
                          Are you sure you want to delete this variant? This
                          action cannot be undone.
                        </p>

                        <div className="d-flex align-items-center justify-content-center gap-3 px-4">
                          <Button
                            className="btn-secondary rounded-1 w-100"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Cancel
                          </Button>

                          <Button
                            className="btn-danger rounded-1 w-100"
                            onClick={() =>
                              deleteProductVariantById(variant?._id)
                            }
                          >
                            Delete Variant{" "}
                            {loading && <Loader data-bs-theme="dark" />}
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-white p-5 border border-1 rounded-2">
                <p className="text-center text-black-50 m-0">
                  No variants available
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <PageLoader />
      )}
    </section>
  );
};

export default EditProduct;

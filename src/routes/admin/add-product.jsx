import { useForm } from "react-hook-form";
import { Button, Input, Loader, Select, Textarea } from "../../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import toast from "react-hot-toast";
import localforage from "localforage";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addProductDetails = async (data) => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");

      if (!token) {
        return toast.error("Please login again to continue.");
      }

      const res = await axios.post(
        `${config.backendUrl}/admin/cyber/dashboard/products/createProduct`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/all-products");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.response.statusText);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-2 py-md-4 ps-2 ps-md-4">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1 className="fs-3 fw-semibold mb-0">All Products</h1>

        <Button className="btn-dark rounded-1" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <form
        className="d-lg-flex bg-body rounded-3 gap-5"
        onSubmit={handleSubmit(addProductDetails)}
      >
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
              minLength: {
                value: 100,
                message: "Description must be at least 100 characters",
              },
              maxLength: {
                value: 500,
                message: "Description must be less than 500 characters",
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

          <div className="d-lg-flex gap-2 justify-content-end">
            <Button
              className="btn-secondary rounded-1"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="btn-dark rounded-1"
              disabled={loading}
            >
              Save {loading && <Loader data-bs-theme="dark" />}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddProduct;

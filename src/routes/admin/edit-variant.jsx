import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Loader, PageLoader, Select } from "../../components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import localforage from "localforage";
import config from "../../config/config";

const EditVariant = () => {
  const { variantId } = useParams();
  const navigate = useNavigate();
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(false);

  // variant form data
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);

    getVariantDetailsById();
    setLoading(false);
  }, []);

  // get variant by id
  const getVariantDetailsById = async () => {
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return toast.error("Please login again to continue.");
      }

      const res = await axios.get(
        `${config.backendUrl}/admin/cyber/dashboard/products/variants/getVariantDetails/${variantId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data.variant);
        setVariant(res.data.variant);

        reset(res.data.variant);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch product details."
      );
    }
  };

  const editVariantDetails = async (variant) => {
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

      const res = await axios.put(
        `${config.backendUrl}/admin/cyber/dashboard/products/variants/updateProductVariant/${variantId}`,
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
        toast.success(res.data.message || "Variant updated successfully.");
        navigate(-1);
      } else {
        toast.error(res.data.message || "Failed to update variant.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return variant ? (
    <div className="p-2 p-md-4">
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
        <h1 className="fs-3 fw-semibold mb-0">Variant Details</h1>

        <Button className="btn-dark" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <form
        className="p-5 bg-body rounded-3 gap-5 border mb-4"
        onSubmit={handleSubmit(editVariantDetails)}
      >
        <div className="d-lg-flex gap-lg-4">
          <div className="w-100">
            <Input
              label="Images"
              type="file"
              containerClassName="mb-4"
              accept="image/*"
              multiple
              errorMessage={errors?.files?.message}
              style={{ height: "40px" }}
              {...register("files", {
                validate: (files) => {
                  if (files?.length > 4) {
                    return "You can upload up to 4 images only.";
                  }
                  return true;
                },
              })}
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
              errorMessage={errors?.product_color?.message}
              {...register("product_color", {
                required: "Color is required",
              })}
            />

            <Input
              label="Product Additional Price"
              type="number"
              placeholder="Enter the additional price"
              containerClassName="mb-4"
              errorMessage={errors?.product_additional_price?.message}
              {...register("product_additional_price", {
                required: "Additional price is required",
                min: { value: 0, message: "Price must be at least 0" },
                max: {
                  value: 1000000,
                  message: "Price must be less than 10,00,000",
                },
              })}
            />

            <Input
              label="Product CPU"
              type="text"
              placeholder="Enter the CPU details"
              containerClassName="mb-4"
              errorMessage={errors?.product_cpu?.message}
              {...register("product_cpu", {
                required: "CPU details are required",
                maxLength: {
                  value: 100,
                  message: "CPU details must be less than 100 characters",
                },
              })}
            />

            <Input
              label="Product Cores"
              type="number"
              placeholder="Enter the number of cores"
              containerClassName="mb-4"
              errorMessage={errors?.product_cores?.message}
              {...register("product_cores", {
                required: "Number of cores is required",
                min: { value: 1, message: "There must be at least 1 core" },
                max: { value: 64, message: "Cores must not exceed 64" },
              })}
            />

            <Input
              label="Product Main Camera"
              type="text"
              placeholder="Enter the main camera details (e.g., 50 MP)"
              containerClassName="mb-4"
              errorMessage={errors?.product_main_camera?.message}
              {...register("product_main_camera", {
                required: "Main camera details are required",
              })}
            />

            <Input
              label="Product Front Camera"
              type="text"
              placeholder="Enter the front camera details (e.g., 16 MP)"
              containerClassName="mb-4"
              errorMessage={errors?.product_front_camera?.message}
              {...register("product_front_camera", {
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
              errorMessage={errors?.product_brand?.message}
              {...register("product_brand", {
                required: "Brand is required",
              })}
            />

            <Input
              label="Product Battery Capacity"
              type="number"
              placeholder="Enter the battery capacity (mAh)"
              containerClassName="mb-4"
              errorMessage={errors?.product_battery_capacity?.message}
              {...register("product_battery_capacity", {
                required: "Battery capacity is required",
                min: {
                  value: 500,
                  message: "Battery capacity must be at least 500 mAh",
                },
                max: {
                  value: 10000,
                  message: "Battery capacity must not exceed 10,000 mAh",
                },
              })}
            />

            <Input
              label="Product Delivery Time"
              type="text"
              placeholder="Enter delivery time range (e.g., 1-2 days)"
              containerClassName="mb-4"
              errorMessage={errors?.product_delivery_time?.message}
              {...register("product_delivery_time", {
                required: "Delivery time range is required",
                pattern: {
                  value: /^[0-9]+-[0-9]+$/,
                  message: "Delivery time must be a valid range (e.g., 1-2)",
                },
              })}
            />

            <Input
              label="Product Guarantee"
              type="number"
              placeholder="Enter the guarantee details (e.g., in years)"
              containerClassName="mb-4"
              errorMessage={errors?.product_guarantee?.message}
              {...register("product_guarantee", {
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
              errorMessage={errors?.product_storage?.message}
              {...register("product_storage", {
                required: "Storage capacity is required",
                pattern: {
                  value: /^[0-9]+(\s?GB|\s?TB)$/, // Matches numbers followed by either 'GB' or 'TB'
                  message:
                    "Must be a number followed by 'GB' or 'TB' (e.g., 128 GB or 1 TB)",
                },
                minLength: {
                  value: 4,
                  message: "Storage capacity must be at least 4 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Storage capacity must not exceed 10 characters",
                },
              })}
            />

            <Input
              label="Product Screen (Size & Type)"
              type="text"
              placeholder="Enter screen size (in inches) and type (e.g., 6.7 Super Retina XDR OLED)"
              containerClassName="mb-4"
              errorMessage={errors?.product_screentype?.message}
              {...register("product_screentype", {
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
              errorMessage={errors?.product_stock?.message}
              {...register("product_stock", {
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
    </div>
  ) : (
    <PageLoader />
  );
};

export default EditVariant;

import PropTypes from "prop-types";
import { useState } from "react";
import { Select, Button, Loader } from "../components";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import localforage from "localforage";
import config from "../config/config";

const OrderStatusForm = ({
  orderId,
  initialPaymentStatus = "Pending",
  initialOrderStatus = "Processing",
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      paymentStatus: initialPaymentStatus,
      orderStatus: initialOrderStatus,
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return;
      }

      const res = await axios.put(
        `${config.backendUrl}/cyber/payment/orders/updateOrderDetails`,
        {
          orderId,
          paymentStatus: data.paymentStatus,
          orderStatus: data.orderStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Order updated successfully!");
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.data.message || "Failed to update order.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-100" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="d-md-flex justify-content-between gap-3">
        <Select
          label="Payment Status"
          placeholder="Select payment status"
          options={[
            { value: "Paid", label: "Paid" },
            { value: "Pending", label: "Pending" },
            { value: "Failed", label: "Failed" },
          ]}
          containerClassName="w-100"
          errorMessage={errors?.paymentStatus?.message}
          {...register("paymentStatus", {
            required: "Payment status is required",
          })}
        />

        <Select
          label="Order Status"
          placeholder="Select order status"
          options={[
            { value: "Delivered", label: "Delivered" },
            { value: "Processing", label: "Processing" },
            { value: "Cancelled", label: "Cancelled" },
          ]}
          containerClassName="w-100"
          errorMessage={errors?.orderStatus?.message}
          {...register("orderStatus", {
            required: "Order status is required",
          })}
        />
      </div>

      <div className="float-md-end">
        <Button type="submit" className="btn-success w-100">
          Update {loading && <Loader data-bs-theme="dark" />}
        </Button>
      </div>
    </form>
  );
};

export default OrderStatusForm;

OrderStatusForm.propTypes = {
  orderId: PropTypes.string.isRequired,
  initialPaymentStatus: PropTypes.oneOf(["Paid", "Pending", "Failed"]),
  initialOrderStatus: PropTypes.oneOf(["Delivered", "Processing", "Cancelled"]),
  onSuccess: PropTypes.func,
};

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import Loader from "./Loader/Loader";
import toast from "react-hot-toast";
import axios from "axios";
import config from "../config/config";
import localforage from "localforage";
import Modal from "./Modal";
import { motion } from "motion/react";

const EditCard = ({ id, title = "Product Name", banner, price = 0 }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");

      if (!token) {
        toast.error("Please login again to continue.");
        return;
      }

      const res = await axios.delete(
        `${config.backendUrl}/admin/cyber/dashboard/products/deleteProduct/${id}`,
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
      } else {
        toast.error(res.data.message || "Failed to delete the product.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.statusText ||
          "An error occurred."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="card border-light-subtle bg-light pt-3"
      style={{ width: "15rem" }}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-3 my-0 py-3 rounded-1 overflow-hidden d-flex justify-content-center">
        <img src={banner} alt="Product" height="180px" />
      </div>

      <div className="card-body">
        <div className="flex-grow-1">
          <p className="m-0 truncate-1-lines fs-5 lh-sm text-center">{title}</p>
        </div>

        <p className="card-text fw-semibold d-flex align-items-center justify-content-center gap-3">
          ₹ {price.toLocaleString("en-IN")}
        </p>

        <div className="d-grid gap-2">
          <Button
            className="btn-outline-dark w-100"
            onClick={() => navigate(`/admin/product/${id}/edit`)}
          >
            Edit
          </Button>

          <Modal
            id={`deleteProduct-${id}`}
            title="Delete Product"
            isCentered={true}
          >
            <p className="fs-5 fw-bold text-center mb-3">
              Confirm Product Deletion
            </p>
            <p className="text-black-50 text-center mb-4">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>

            <div className="d-flex justify-content-center gap-3">
              <Button
                className="btn-secondary w-50"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </Button>
              <Button
                className="btn-danger w-50"
                onClick={deleteProduct}
                disabled={loading}
              >
                {loading ? <Loader data-bs-theme="dark" /> : "Delete"}
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </motion.div>
  );
};

EditCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  banner: PropTypes.string,
  price: PropTypes.number,
};

export default EditCard;

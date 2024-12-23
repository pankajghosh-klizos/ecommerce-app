import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Input,
  Loader,
  PageLoader,
  Select,
} from "../components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import localforage from "localforage";
import config from "../config/config";
import { updateUser } from "../store/auth.slice";

const EditAddress = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const selectedAddress = user?.address?.find(
    (address) => address._id === addressId
  );

  // variant form data
  const {
    register: addressRegister,
    handleSubmit: addressHandleSubmit,
    formState: { errors: addressErrors },
  } = useForm({
    defaultValues: {
      street: selectedAddress?.street,
      landMark: selectedAddress?.landMark,
      city: selectedAddress?.city,
      state: selectedAddress?.state,
      country: selectedAddress?.country,
      zipCode: selectedAddress?.zipCode,
      type_Of_Address: selectedAddress?.type_Of_Address,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editAddress = async (address) => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const {
        city,
        country,
        landMark,
        state,
        street,
        type_Of_Address,
        zipCode,
      } = address;

      const res = await axios.put(
        `${config.backendUrl}/cyber/user/modifyAddress/${addressId}`,
        {
          city,
          country,
          landMark,
          state,
          street,
          type_Of_Address,
          zipCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(updateUser(res.data.user));
        toast.success(res.data.message);
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

  return selectedAddress ? (
    <section className="mt-5 pt-4">
      <Container>
        <div className="d-flex align-items-center justify-content-between gap-2 my-4">
          <h1 className="fs-3 fw-semibold mb-0">Address Details</h1>

          <Button className="btn-dark" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <form
          className="p-2 bg-body rounded-3 gap-5 border p-4"
          onSubmit={addressHandleSubmit(editAddress)}
        >
          <div className="d-lg-flex gap-lg-4">
            <div className="w-100">
              <Input
                label="Street"
                type="text"
                placeholder="Enter your street address"
                containerClassName="mb-4"
                errorMessage={addressErrors?.street?.message}
                {...addressRegister("street", {
                  required: "Street address is required",
                  maxLength: {
                    value: 100,
                    message: "Street address must be less than 100 characters",
                  },
                })}
              />

              <Input
                label="Landmark"
                type="text"
                placeholder="Enter a landmark"
                containerClassName="mb-4"
                errorMessage={addressErrors?.landmark?.message}
                {...addressRegister("landMark", {
                  required: "Landmark is required",
                  maxLength: {
                    value: 100,
                    message: "Landmark must be less than 100 characters",
                  },
                })}
              />

              <Input
                label="City"
                type="text"
                placeholder="Enter your city"
                containerClassName="mb-4"
                errorMessage={addressErrors?.city?.message}
                {...addressRegister("city", {
                  required: "City is required",
                  maxLength: {
                    value: 50,
                    message: "City name must be less than 50 characters",
                  },
                })}
              />

              <Input
                label="State"
                type="text"
                placeholder="Enter your state"
                containerClassName="mb-4"
                errorMessage={addressErrors?.state?.message}
                {...addressRegister("state", {
                  required: "State is required",
                  maxLength: {
                    value: 50,
                    message: "State name must be less than 50 characters",
                  },
                })}
              />
            </div>

            <div className="w-100">
              <Input
                label="Zip Code"
                type="text"
                placeholder="Enter your zip code"
                containerClassName="mb-4"
                errorMessage={addressErrors?.zipCode?.message}
                {...addressRegister("zipCode", {
                  required: "Zip code is required",
                  pattern: {
                    value: /^[0-9]{6}(-[0-9]{4})?$/,
                    message:
                      "Enter a valid zip code (e.g., 12345 or 12345-6789)",
                  },
                })}
              />

              <Input
                label="Country"
                type="text"
                placeholder="Enter your country"
                containerClassName="mb-4"
                errorMessage={addressErrors?.country?.message}
                {...addressRegister("country", {
                  required: "Country is required",
                  maxLength: {
                    value: 100,
                    message: "Country name must be less than 100 characters",
                  },
                })}
              />

              <Select
                label="Address Type"
                placeholder="Select an address type"
                options={[
                  { value: "Home", label: "Home" },
                  { value: "Office", label: "Office" },
                  { value: "Other", label: "Other" },
                ]}
                containerClassName="mb-4"
                errorMessage={addressErrors?.type_Of_Address?.message}
                {...addressRegister("type_Of_Address", {
                  required: "Address type is required",
                })}
              />
            </div>
          </div>

          <div className="d-lg-flex gap-2 justify-content-end">
            <Button className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" className="btn-success" disabled={loading}>
              Save {loading && <Loader data-bs-theme="dark" />}
            </Button>
          </div>
        </form>
      </Container>
    </section>
  ) : (
    <PageLoader />
  );
};

export default EditAddress;

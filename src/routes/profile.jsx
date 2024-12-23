import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  Loader,
  Input,
  Modal,
  LogoutBtn,
  Select,
} from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import config from "../config/config";
import localforage from "localforage";
import axios from "axios";
import { updateUser } from "../store/auth.slice";
import { motion } from "motion/react";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
      phone: user?.phone,
      role: user?.role,
    },
  });

  // address form setup
  const {
    register: addressRegister,
    handleSubmit: addressHandleSubmit,
    formState: { errors: addressErrors },
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update profile function
  const editProfileDetails = async (user) => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const formData = new FormData();
      formData.append("file", user.file[0]);
      formData.append("fullname", user.fullname);
      formData.append("email", user.email);

      const res = await axios.post(
        `${config.backendUrl}/cyber/user/profile/update`,
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
        toast.success(res.data.message || "Profile updated successfully.");
        dispatch(updateUser(res.data.user));
        window.location.reload();
      } else {
        toast.error(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add new address
  const addNewAddress = async (address) => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const res = await axios.post(
        `${config.backendUrl}/cyber/user/createAddress`,
        address,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Address added successfully.");
        console.log(res.data.user);
        dispatch(updateUser(res.data.user));

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        toast.error(res.data.message || "Failed to add address.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete address
  const deleteAddressById = async (addressId) => {
    setLoading(true);
    try {
      const token = await localforage.getItem("authToken");
      if (!token) {
        toast.error("Please login again to continue.");
        return navigate("/login");
      }

      const res = await axios.delete(
        `${config.backendUrl}/cyber/user/removeAddress/${addressId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Address deleted successfully.");
        dispatch(updateUser(res.data.user));

        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        toast.error(res.data.message || "Failed to delete address.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="mt-5 pt-3 pt-md-4">
        <Container className="position-relative">
          <div className="profile-cover w-100 rounded-bottom-3 position-absolute top-0 start-0"></div>

          <div className="d-md-flex align-items-end gap-4 py-4 pt-5">
            <div
              id="upload"
              className="border p-1 rounded-2 mb-3 mb-md-0 mx-auto mx-md-0 position-relative bg-light border-secondary-subtle d-flex justify-content-center align-items-center"
              style={{
                width: "120px",
                height: "120px",
              }}
            >
              <img
                src={user?.profilePhoto}
                alt="profile"
                className="img-fluid rounded-1 border border-secondary-subtle h-100"
              />

              <div className="position-absolute">
                <Modal id="uploadProfilePhoto" title="Upload" isCentered={true}>
                  <form onSubmit={handleSubmit(editProfileDetails)}>
                    <Input
                      type="file"
                      errorMessage={errors?.file?.message}
                      {...register("file", {
                        required: "Please upload a photo",
                      })}
                    />

                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button
                        className="btn-secondary"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Cancel
                      </Button>

                      <Button className="btn-success" type="submit">
                        Upload {loading && <Loader data-bs-theme="dark" />}
                      </Button>
                    </div>
                  </form>
                </Modal>
              </div>
            </div>

            <div className="flex-grow-1 mb-3 mb-md-0 text-center text-md-start">
              <h1 className="fs-3 fw-semibold mb-0">{user?.fullname}</h1>
              <p className="text-black-50 mb-0">{user?.email}</p>
            </div>

            <div className="d-flex justify-content-center justify-content-md-start gap-2">
              {user?.role === "admin" ? (
                <Link to="/admin/all-products" className="btn btn-outline-dark">
                  Go to dashboard
                </Link>
              ) : (
                <Link to="/order/all" className="btn btn-outline-dark">
                  Go to Orders
                </Link>
              )}

              <Modal id="logoutConfirmation" title="Logout" isCentered={true}>
                <p className="fs-5 fw-bold text-center mb-3">Confirm Logout</p>
                <p className="text-black-50 text-center mb-4">
                  Are you sure you want to log out? You will need to log back in
                  to access your account.
                </p>

                <div className="d-flex justify-content-center gap-3">
                  <Button
                    className="btn-secondary w-100"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Cancel
                  </Button>

                  <LogoutBtn className="btn-danger w-100" />
                </div>
              </Modal>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-5 pt-4">
        <Container>
          <p className="fs-4 fw-semibold mb-3">Details</p>

          <form
            className="p-3 p-md-5 bg-body rounded-3 gap-5 border mb-5"
            onSubmit={handleSubmit(editProfileDetails)}
          >
            <div className="d-lg-flex gap-lg-4">
              <div className="w-100">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  errorMessage={errors?.fullname?.message}
                  {...register("fullname", {
                    pattern: {
                      value: /^(?!\s*$)[a-zA-Z\s]+$/,
                      message:
                        "Full name can only contain letters and spaces, and cannot be empty or only spaces",
                    },
                  })}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  containerClassName="mb-4"
                  errorMessage={errors?.email?.message}
                  {...register("email", {
                    pattern: {
                      value:
                        /^(?!\s*$)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>

              <div className="w-100">
                {/* <Input
                  label="Profile Image"
                  type="file"
                  containerClassName="mb-3"
                  accept="image/*"
                  errorMessage={errors?.file?.message}
                  {...register("file")}
                /> */}

                <Input label="Phone" {...register("phone")} disabled />

                <div className="d-flex gap-2 justify-content-end mt-md-5">
                  <Button
                    className="btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="btn-success"
                    disabled={loading}
                  >
                    Save {loading && <Loader data-bs-theme="dark" />}
                  </Button>
                </div>
              </div>
            </div>
          </form>

          {user?.role !== "admin" && (
            <>
              <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
                <h1 className="fs-3 fw-semibold mb-0">Address</h1>

                <Modal
                  id="address"
                  title="Add New Address"
                  isCentered={true}
                  containerClassName="modal-xl"
                >
                  <form
                    className="p-2 bg-body rounded-3 gap-5"
                    onSubmit={addressHandleSubmit(addNewAddress)}
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
                              message:
                                "Street address must be less than 100 characters",
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
                              message:
                                "City name must be less than 50 characters",
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
                              message:
                                "Landmark must be less than 100 characters",
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
                              message:
                                "State name must be less than 50 characters",
                            },
                          })}
                        />
                      </div>

                      <div className="w-100">
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
                              message:
                                "Country name must be less than 100 characters",
                            },
                          })}
                        />

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
                      <Button
                        className="btn-secondary"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="btn-success"
                        disabled={loading}
                      >
                        Save {loading && <Loader data-bs-theme="dark" />}
                      </Button>
                    </div>
                  </form>
                </Modal>
              </div>

              {user?.address.length > 0 ? (
                <ul className="list-unstyled p-0 m-0 d-grid gap-3">
                  {user.address.map((address) => (
                    <motion.li
                      key={address._id}
                      className="d-lg-flex align-items-center justify-content-between gap-4 border p-4 rounded-3 bg-body"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      {/* Address Details */}
                      <div className="w-100">
                        <h5 className="fw-bold d-flex align-items-center gap-3 mb-2">
                          {address?.street}{" "}
                          <span className="badge bg-dark text-uppercase fw-light rounded-1">
                            {address?.type_Of_Address}
                          </span>
                        </h5>
                        <p className="mb-2">
                          {address?.street}, {address?.city},{" "}
                          {address?.landMark}
                        </p>
                        <p className="mb-1">
                          {address?.state}, {address?.country},{" "}
                          {address?.zipCode}
                        </p>
                        <p className="mb-0">{user?.phone}</p>
                      </div>

                      {/* Address Actions */}
                      <div className="d-flex align-items-center gap-2">
                        <Link
                          to={`/address/${address?._id}/edit`}
                          className="btn btn-outline-dark px-4"
                        >
                          Edit
                        </Link>

                        <Modal
                          id={address?._id}
                          title="Delete"
                          isCentered={true}
                        >
                          <p className="fs-5 fw-bold text-center mb-3">
                            Confirm Address Deletion
                          </p>
                          <p className="text-black-50 text-center mb-4">
                            Are you sure you want to delete this Address? This
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
                              onClick={() => deleteAddressById(address?._id)}
                            >
                              Delete Address
                              {loading && <Loader data-bs-theme="dark" />}
                            </Button>
                          </div>
                        </Modal>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="bg-white p-5 border border-1 rounded-2">
                  <p className="text-center text-black-50 m-0">
                    No address available
                  </p>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Profile;

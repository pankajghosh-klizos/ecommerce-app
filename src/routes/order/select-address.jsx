import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Icons } from "../../constants/icons";
import { Button, Container } from "../../components";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../store/orderDetails.slice";
import { useEffect } from "react";

const SelectAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const selectedAddres = user?.address[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      addressId: selectedAddres._id,
    },
  });

  const selectedAddressId = watch("addressId");

  const handleSelectAddress = (data) => {
    const selectedAddress = user.address.find(
      (address) => address._id === data.addressId
    );

    dispatch(setAddress(selectedAddress));
    navigate("/order/select-shipping-method");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <motion.section
      className="mt-3 py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Container>
        {/* Steps Header */}
        <div className="d-flex justify-content-md-between gap-5 py-5">
          <div className="d-flex align-items-center gap-2 text-black">
            <img src={Icons.LocationIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 1</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Address</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 text-black opacity-25">
            <img src={Icons.ShippingIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 2</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Shipping</p>
            </div>
          </div>

          <div className="d-none d-md-flex align-items-center gap-2 text-black opacity-25">
            <img src={Icons.PaymentIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 3</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Payment</p>
            </div>
          </div>
        </div>

        {/* Address Selection Form */}
        <motion.div
          className="py-5 pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-black mb-4">Select Address</h2>

          <form className="w-100" onSubmit={handleSubmit(handleSelectAddress)}>
            <ul
              className="list-unstyled overflow-auto overflow-x-hidden mb-5"
              style={{ maxHeight: "25rem" }}
            >
              {user?.address.map((address, index) => (
                <motion.li
                  key={address._id}
                  className={`bg-light border border-2 border-light rounded-3 d-flex gap-2 gap-md-3 p-3 p-md-4 mb-3 me-2 ${
                    selectedAddressId === address._id ? "border-dark" : ""
                  }`}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <div className="pt-1">
                    <input
                      type="radio"
                      value={address._id}
                      style={{ height: "20px", width: "20px" }}
                      {...register("addressId", {
                        required: "Please select an address",
                      })}
                    />
                  </div>

                  <div className="w-100">
                    <h5 className="fw-bold d-flex align-items-center gap-3 mb-2">
                      {address?.street}{" "}
                      <span className="badge bg-dark text-uppercase fw-light rounded-1">
                        {address?.type_Of_Address}
                      </span>
                    </h5>
                    <p className="mb-2">
                      {address?.street}, {address?.city}, {address?.landMark}
                    </p>
                    <p className="mb-1">
                      {address?.state}, {address?.country}, {address?.zipCode}
                    </p>
                    <p className="mb-0">{user?.phone}</p>
                  </div>

                  <div className="d-flex align-items-baseline gap-2">
                    <Button
                      type="button"
                      className="p-0"
                      onClick={() => navigate(`/address/${address?._id}/edit`)}
                    >
                      <img
                        src={Icons.ToEditIcon}
                        alt="Edit"
                        width="24"
                        height="24"
                      />
                    </Button>

                    <Button type="button" className="p-0">
                      <img
                        src={Icons.CloseIcon}
                        alt="Delete"
                        width="24"
                        height="24"
                      />
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ul>

            {errors.addressId && (
              <p className="text-danger">{errors.addressId.message}</p>
            )}

            {/* <Link
              to="/profile"
              className="btn border-0 mx-auto d-block p-0 w-25 text-center"
            >
              <img
                src={Icons.AddressAddIcon}
                alt="Add"
                height="24"
                className="mb-2 d-block mx-auto"
              />
              <span>Add new Address</span>
            </Link> */}

            <div className="d-flex justify-content-center">
              <Link to="/profile" className="btn border-0">
                <img
                  src={Icons.AddressAddIcon}
                  alt="Add"
                  height="24"
                  className="d-block mx-auto mb-2"
                />
                <span>Add new Address</span>
              </Link>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex gap-3 float-md-end my-5">
              <Button
                type="button"
                className="btn-outline-dark rounded-2 py-3 px-5 w-100"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>

              <Button
                type="submit"
                className="btn-dark rounded-2 py-3 px-5 w-100"
              >
                Next
              </Button>
            </div>
          </form>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default SelectAddress;

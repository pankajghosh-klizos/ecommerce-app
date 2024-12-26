import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Icons } from "../../constants/icons";
import { Button, Container } from "../../components";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setShippingMethod,
  setDeliveryDate,
} from "../../store/orderDetails.slice";

const SelectShippingMethod = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shippingMethods = [
    {
      id: "method1",
      amount: 0,
      label: "Regulary shipment",
    },
    {
      id: "method2",
      amount: 50,
      label: "Get your delivery as soon as possible",
    },
    {
      id: "method3",
      amount: 100,
      label: "Pick a date when you want to get your delivery",
    },
  ];

  const getFormattedDate = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const today = new Date();
  const tommorow = new Date();
  const oneWeekLater = new Date();
  tommorow.setDate(today.getDate() + 1);
  oneWeekLater.setDate(today.getDate() + 7);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      shippingMethod: "method1",
    },
  });

  const selectedMethod = watch("shippingMethod");

  const onSubmit = (data) => {
    if (selectedMethod === "method1") {
      dispatch(setDeliveryDate(getFormattedDate(oneWeekLater)));
    }

    if (selectedMethod === "method2") {
      dispatch(setDeliveryDate(getFormattedDate(tommorow)));
    }

    dispatch(setShippingMethod(data.shippingMethod));
    navigate("/order/select-payment-method");
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
        <div className="d-flex justify-content-md-between gap-5 py-5">
          <div className="d-none d-md-flex align-items-center gap-2 text-black opacity-25">
            <img src={Icons.LocationIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 1</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Address</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 text-black">
            <img src={Icons.ShippingIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 2</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Shipping</p>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 text-black opacity-25">
            <img src={Icons.PaymentIcon} alt="icon" width="40" height="40" />

            <div>
              <p className="m-0 fs-5 lh-sm">Step 3</p>
              <p className="m-0 fw-semibold fs-4 lh-sm">Payment</p>
            </div>
          </div>
        </div>

        <motion.div
          className="py-5 pt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-black mb-4">Select Shipping Method</h2>

          <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
            <ul className="list-unstyled mb-4" style={{ minHeight: "25rem" }}>
              {shippingMethods.map((method, index) => (
                <motion.li
                  className={`border border-light border-2 bg-light rounded-3 d-flex align-items-center gap-2 gap-md-3 p-3 p-md-4 mb-3 ${
                    selectedMethod === method.id ? "border-dark" : ""
                  } ${method.amount > 50 ? "opacity-50 pe-none" : ""}`}
                  key={method.id}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  <div className="pt-1">
                    <input
                      id={method.id}
                      type="radio"
                      value={method.id}
                      style={{ height: "20px", width: "20px" }}
                      {...register("shippingMethod", {
                        required: "Please select a shipping method",
                      })}
                    />
                  </div>

                  <label className="w-100 d-md-flex gap-4" htmlFor={method.id}>
                    <span className="fs-5 m-0 fw-semibold">
                      {method?.amount === 0 ? (
                        "Free"
                      ) : (
                        <>
                          {method?.amount > 50
                            ? "Schedule"
                            : `₹ ${method?.amount}`}
                        </>
                      )}
                    </span>

                    <span className="fs-5 m-0">{method?.label}</span>
                  </label>

                  {method?.amount === 0 ? (
                    <p className="m-0 fw-semibold text-nowrap">
                      {getFormattedDate(oneWeekLater)}
                    </p>
                  ) : (
                    <>
                      {method?.amount > 50 ? (
                        <select className="btn" defaultValue="selectdate">
                          <option value="selectdate">Select Date</option>
                        </select>
                      ) : (
                        <p className="m-0 fw-semibold text-nowrap">
                          {getFormattedDate(tommorow)}
                        </p>
                      )}
                    </>
                  )}
                </motion.li>
              ))}
            </ul>

            {errors.shippingMethod && (
              <p className="text-danger">{errors.shippingMethod.message}</p>
            )}

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

export default SelectShippingMethod;

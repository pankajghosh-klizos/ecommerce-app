import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthFormLayout } from "../layouts/index.js";
import { Button, Container, Input, Loader } from "../components/index.js";
import axios from "axios";
import config from "../config/config.js";
import toast from "react-hot-toast";
import { setPhone } from "../store/verify.slice.js";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.backendUrl}/cyber/user/registration`,
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setPhone(data.phone));
        toast.success(
          res.data.message ||
            "OTP sent successfully, please verify your phone number"
        );
        navigate("/sign-up/verify");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.response?.statusText
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 py-5">
      <Container>
        <AuthFormLayout
          title="Sign up"
          containerClassName="py-2"
          className="px-2 px-lg-5"
        >
          <form onSubmit={handleSubmit(signup)}>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              errorMessage={errors?.phone?.message}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
            />

            <Input
              label="Full Name"
              placeholder="Enter your full name"
              errorMessage={errors?.fullname?.message}
              {...register("fullname", {
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name can only contain letters and spaces",
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
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />

            <Button
              type="submit"
              className="btn-dark w-100 py-2 mb-2"
              disabled={loading}
            >
              Continue {loading && <Loader data-bs-theme="dark" />}
            </Button>
          </form>

          <p className="text-center mt-3">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-decoration-none text-black-50 ms-2"
            >
              Sign in
            </Link>
          </p>
        </AuthFormLayout>
      </Container>
    </section>
  );
};

export default Signup;

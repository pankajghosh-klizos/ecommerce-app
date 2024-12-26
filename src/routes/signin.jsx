import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthFormLayout } from "../layouts";
import { Button, Container, Input, Loader } from "../components";
import toast from "react-hot-toast";
import { setPhone } from "../store/verify.slice";
import config from "../config/config";
import axios from "axios";

const Signin = () => {
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

  const signin = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.backendUrl}/cyber/user/login`,
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setPhone(data.phone));
        toast.success(
          res.data.message ||
            "OTP has been sent to your registered phone number"
        );
        navigate("/sign-in/verify");
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
          title="Sign in"
          containerClassName="py-2"
          className="px-2 px-lg-5"
        >
          <form onSubmit={handleSubmit(signin)}>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone Number"
              containerClassName="mb-4"
              errorMessage={errors?.phone?.message}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be 10 digits",
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
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-decoration-none text-black-50 ms-2"
            >
              Sign up
            </Link>
          </p>
        </AuthFormLayout>
      </Container>
    </section>
  );
};

export default Signin;

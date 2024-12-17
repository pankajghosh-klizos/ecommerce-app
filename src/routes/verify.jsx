import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AuthFormLayout } from "../layouts/index.js";
import { Button, Container, Input, Loader } from "../components/index.js";
import config from "../config/config.js";
import axios from "axios";
import localforage from "localforage";
import { login } from "../store/auth.slice.js";

const Verify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.verify);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData.phone) {
      toast.error("Please enter your phone number ");
      navigate(-1);
    }
  }, [navigate, userData]);

  const verifyOtpForSignup = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.backendUrl}/cyber/user/verify/otp/register`,
        { ...data, phone: userData.phone },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        localforage.setItem("authToken", res.data.token);
        dispatch(login({ user: res.data.user }));
        toast.success(res.data.message || "You have registered successfully!");
        navigate("/");
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

  const verifyOtpForSignin = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.backendUrl}/cyber/user/verify/otp/login`,
        { ...data, phone: userData.phone },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        localforage.setItem("authToken", res.data.token);
        dispatch(login(res.data.user));
        toast.success(res.data.message || "You have registered successfully!");
        navigate("/");
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

  const verifyOtp = (data) => {
    if (location.pathname.includes("sign-up")) verifyOtpForSignup(data);
    if (location.pathname.includes("sign-in")) verifyOtpForSignin(data);
  };

  return (
    <section className="mt-5 py-5">
      <Container>
        <AuthFormLayout
          title="Verification code"
          containerClassName="py-2"
          className="px-2 px-lg-5"
        >
          <form onSubmit={handleSubmit(verifyOtp)}>
            <Input
              placeholder="Enter your 6 digit otp"
              containerClassName="mb-4"
              errorMessage={errors?.otp?.message}
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "OTP must be a 6-digit number",
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
        </AuthFormLayout>
      </Container>
    </section>
  );
};

export default Verify;

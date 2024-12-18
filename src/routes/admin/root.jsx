import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts";

const Root = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return user?.role !== "admin" ? (
    navigate("/")
  ) : (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default Root;

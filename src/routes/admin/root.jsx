import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../layouts";

const Root = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return user?.role !== "admin" ? (
    navigate("/")
  ) : (
    <section className="mt-5 pt-4">
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </section>
  );
};

export default Root;

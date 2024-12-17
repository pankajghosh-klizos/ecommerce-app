import PropTypes from "prop-types";
import { Container } from "../components";
import { NavLink } from "react-router-dom";
import { Icons } from "../constants/icons";

const DashboardLayout = ({ children }) => {
  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Icons?.Dashboard,
      path: "/admin/all-products",
    },
    {
      id: "allproducts",
      label: "All Products",
      icon: Icons?.AllProducts,
      path: "/admin/all-products",
    },
    {
      id: "orderlist",
      label: "Order List",
      icon: Icons?.OrderList,
      path: "/admin/order-list",
    },
  ];
  return (
    <Container className="d-flex min-vh-100">
      <aside
        className="border-end pt-4 pe-3 w-100"
        style={{ maxWidth: "250px" }}
      >
        <ul className="list-unstyled">
          {sidebarItems.map((item) => (
            <li key={item.id} className="mb-1">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn btn-dark w-100 rounded-1 text-start d-flex align-items-center gap-2"
                    : "btn btn-light w-100 rounded-1 text-start d-flex align-items-center gap-2"
                }
                to={item.path}
              >
                {item?.icon && (
                  <img src={item?.icon} alt="icon" className="icon" />
                )}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <div className="w-100 px-3 py-4 bg-light">{children}</div>
    </Container>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

import PropTypes from "prop-types";
import { Container } from "../components";
import { NavLink } from "react-router-dom";
import { Icons } from "../constants/icons";

const DashboardLayout = ({ children }) => {
  const sidebarItems = [
    // {
    //   id: "dashboard",
    //   label: "Dashboard",
    //   icon: Icons?.Dashboard,
    //   path: "/admin/dashboard",
    // },
    {
      id: "allproducts",
      label: "Products List",
      icon: Icons?.AllProducts,
      path: "/admin/all-products",
    },
    {
      id: "orderlist",
      label: "Orders List",
      icon: Icons?.OrderList,
      path: "/admin/order-list",
    },
    {
      id: "userList",
      label: "Users List",
      icon: Icons?.Profile,
      path: "/admin/user-list",
    },
  ];
  return (
    <Container className="mt-5 pt-3 d-flex min-vh-100">
      <aside
        className="py-3 py-md-4 pe-3 border-end w-100"
        style={{ maxWidth: "200px" }}
      >
        <ul className="list-unstyled m-0">
          {sidebarItems.map((item) => (
            <li key={item.id} className="mb-1">
              <NavLink
                className={({ isActive }) =>
                  `btn w-100 rounded-1 text-start d-flex align-items-center gap-md-2 ${
                    isActive ? "btn-dark" : "btn-light"
                  }`
                }
                to={item.path}
              >
                {item?.icon && (
                  <img
                    src={item?.icon}
                    alt="icon"
                    className="icon"
                    height="15px"
                  />
                )}
                <span className="d-none d-md-inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <div className="pt-2 flex-grow-1">{children}</div>
    </Container>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

import { motion } from "motion/react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import { useSelector } from "react-redux";
import { Icons } from "../constants/icons";
import Search from "./Search/Search";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);
  const { user } = useSelector((state) => state.auth);
  const { cartProducts } = useSelector((state) => state.cartProducts);

  const navItems = [
    { id: "home", slug: "/", label: "Home", isActive: true },
    {
      id: "about",
      slug: "/about",
      label: "About",
      isActive: true,
    },
    {
      id: "contact",
      slug: "/contact",
      label: "Contact",
      isActive: true,
    },
    {
      id: "wishlist",
      slug: "/wishlist",
      label: "Wishlist",
      icon: Icons?.Wishlist,
      isActive: user?.role !== "admin",
    },
    {
      id: "cart",
      slug: "/cart",
      label: "Cart",
      icon: Icons?.Cart,
      isActive: user?.role !== "admin",
    },
    {
      id: "profile",
      slug: "/profile",
      label: "Profile",
      icon: Icons?.Profile,
      isActive: true,
    },
  ];

  return (
    <motion.header
      className="border-bottom z-3 fixed-top bg-white"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <nav className="navbar navbar-expand-lg">
          <Link
            className="navbar-brand fs-2 fw-bold"
            to="/"
            style={{ overflow: "hidden" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              cyber.
            </motion.div>
          </Link>

          <button
            className="navbar-toggler border-0 px-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <motion.div
            className="collapse navbar-collapse justify-content-lg-end"
            id="navbarSupportedContent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {user?.role !== "admin" && (
              <motion.div
                className="me-lg-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Search />
              </motion.div>
            )}

            <ul className="navbar-nav mb-lg-0 gap-3">
              {navItems.map(
                (navItem, index) =>
                  navItem?.isActive && (
                    <motion.li
                      key={navItem?.id || index}
                      className="nav-item"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to={navItem?.slug}
                      >
                        {navItem?.icon ? (
                          <div className="position-relative d-flex d-lg-block align-items-center justify-content-between">
                            <span className="d-lg-none">{navItem?.label}</span>
                            <motion.img
                              src={navItem?.icon}
                              alt={navItem?.label}
                              height="20px"
                              className="d-none d-lg-inline"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5 }}
                            />
                            {navItem?.label === "Cart" && (
                              <motion.span
                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  duration: 0.5,
                                  ease: "easeOut",
                                  delay: 0.5,
                                }}
                              >
                                {cartProducts.length > 9
                                  ? "9+"
                                  : cartProducts.length}
                              </motion.span>
                            )}
                          </div>
                        ) : (
                          <span className="fs-6">{navItem?.label}</span>
                        )}
                      </NavLink>
                    </motion.li>
                  )
              )}

              <motion.li
                className="nav-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {!authStatus && (
                  <NavLink
                    to="/sign-in"
                    className="btn btn-dark px-4 py-2 w-100 mb-2 mb-md-0"
                  >
                    Sign in
                  </NavLink>
                )}
              </motion.li>
            </ul>
          </motion.div>
        </nav>
      </Container>
    </motion.header>
  );
};

export default Header;

import { useState, useEffect } from "react";
import { Outlet, useNavigation, useLoaderData } from "react-router-dom";
import { Footer, Header, PageLoader } from "../components/index.js";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/auth.slice.js";
import { setProducts } from "../store/products.slice.js";
import { setFilteredProducts } from "../store/filterProducts.slice.js";
import { setWishlistProducts } from "../store/wishlistProducts.slice.js";
import { setCartProducts } from "../store/cartProducts.slice.js";

const Root = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, products, wishlist, cart } = useLoaderData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle user authentication
    if (user?.isLoggedIn) {
      dispatch(login(user)); // Log in the user
    } else {
      dispatch(logout()); // Log out the user
    }

    // Populate state with products, wishlist, and cart if available
    if (products.length > 0) dispatch(setProducts(products));
    if (products.length > 0) dispatch(setFilteredProducts(products));
    if (wishlist.length > 0) dispatch(setWishlistProducts(wishlist));
    if (cart.length > 0) dispatch(setCartProducts(cart));

    setLoading(false);
  }, [user, products, wishlist, cart, dispatch]);

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="d-flex w-100 min-vh-100 flex-column">
        <Header />
        <main
          className={`min-vh-100 ${
            navigation.state === "loading" ? "loading" : ""
          }`}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Root;

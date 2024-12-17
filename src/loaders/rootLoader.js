import axios from "axios";
import config from "../config/config";
import localforage from "localforage";

const getUserData = async () => {
  try {
    const token = await localforage.getItem("authToken");

    if (!token) {
      return { user: null };
    }

    const res = await axios.get(
      `${config.backendUrl}/cyber/user/singleUserDetails`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
    return { user: null };
  }
};

const getProductsData = async () => {
  try {
    const res = await axios.get(
      `${config.backendUrl}/cyber/query/products/getProducts`
    );

    return res.data;
  } catch (error) {
    console.log("Error fetching products data:", error);
    return { products: [] };
  }
};

const getWishlistData = async () => {
  try {
    const token = await localforage.getItem("authToken");

    if (!token) {
      return { wishlist: [] };
    }

    const res = await axios.get(
      `${config.backendUrl}/cyber/user/wishlist/getWishlist`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return { wishlist: [] };
  }
};

const getCartData = async () => {
  try {
    const token = await localforage.getItem("authToken");

    if (!token) {
      return { cart: [] };
    }

    const res = await axios.get(
      `${config.backendUrl}/cyber/user/cart/cartDetails`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.log("Error fetching cart data:", error);
    return { cart: [] };
  }
};

const rootLoader = async () => {
  const { products = [] } = (await getProductsData()) || {};
  const { user = null } = (await getUserData()) || {};
  const { wishlist = [] } = (await getWishlistData()) || {};
  const { cart = [] } = (await getCartData()) || {};

  return { products, user, wishlist, cart };
};

export default rootLoader;

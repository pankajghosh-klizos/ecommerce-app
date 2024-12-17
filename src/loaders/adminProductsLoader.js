import axios from "axios";
import config from "../config/config";
import localforage from "localforage";

const adminProductsLoader = async () => {
  try {
    const token = await localforage.getItem("authToken");

    if (!token) {
      return { products: [] };
    }

    const res = await axios.get(
      `${config.backendUrl}/cyber/query/products/getProducts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return { products: [] };
  }
};

export default adminProductsLoader;

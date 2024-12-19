import { useParams } from "react-router-dom";
import {
  OfferProductsSection,
  ProductDetailsSection,
  ProductDescriptionSection,
  ReviewsSection,
} from "../../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./product.scss";
import config from "../../config/config";
import axios from "axios";
import { setProductDetails } from "../../store/productDetails.slice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  // get product by id
  const getProductDetailsById = async () => {
    try {
      const res = await axios.get(
        `${config.backendUrl}/cyber/query/products/getSpecificProductWithVariants/${productId}`
      );

      if (res.data.success) {
        dispatch(setProductDetails(res.data.product));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDetailsById();
  }, [productId]);

  return (
    <>
      <ProductDetailsSection />
      <ProductDescriptionSection />
      <ReviewsSection />
      <OfferProductsSection />
    </>
  );
};

export default ProductDetails;

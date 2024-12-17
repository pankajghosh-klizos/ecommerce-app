import {
  CategoryFilterSection,
  FeaturedSection,
  HeroSection,
  HighlightProductsSection,
  OfferProductsSection,
  SaleSection,
} from "../../components";
import "./home.scss";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <CategoryFilterSection />
      <HighlightProductsSection />
      <OfferProductsSection />
      <SaleSection />
    </>
  );
};

export default Home;

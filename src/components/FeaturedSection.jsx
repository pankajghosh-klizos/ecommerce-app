import BentoGrid from "./BentoGrid/BentoGrid";
import Container from "./Container";

const FeaturedSection = () => (
  <section className="featured">
    <Container className="px-0">
      <BentoGrid />
    </Container>
  </section>
);
export default FeaturedSection;

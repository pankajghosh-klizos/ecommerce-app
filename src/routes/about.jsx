import { useEffect } from "react";
import { Container } from "../components";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="pt-5 pb-5 mt-5">
      <section className="mb-4">
        <Container>
          <h3 className="mb-3">About Us</h3>

          <p className="text-black-50 mb-4">
            Welcome to Cyber, your trusted destination for cutting-edge
            technology and innovative gadgets.Our mission is to provide the
            latest and most advanced tech products to enhance your digital
            lifestyle, making everyday experiences seamless, efficient, and
            enjoyable.
          </p>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <h3 className="mb-3">Who We Are</h3>

          <p className="text-black-50 mb-4">
            At Cyber, we believe in the power of technology to transform lives.
            From the sleekest smartphones to immersive gaming consoles, and
            advanced computing devices, we curate a range of premium products
            that cater to tech enthusiasts and everyday users alike.
          </p>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <h3 className="mb-3">What We Offer</h3>

          <p className="text-black-50 mb-4">
            Explore a carefully selected assortment of the most sought-after
            gadgets:
          </p>

          <ul className="text-black-50">
            <li>
              <strong>Smartphones:</strong> Stay connected with flagship devices
              like the iPhone 14 Pro, engineered for performance and elegance.
            </li>
            <li>
              <strong>Wearables:</strong> Discover advanced accessories such as
              the Apple AirPods Max and Apple Vision Pro.
            </li>
            <li>
              <strong>Gaming:</strong> Dive into powerful gaming experiences
              with PlayStation 5 and more.
            </li>
            <li>
              <strong>Computers and Laptops:</strong> Elevate productivity with
              devices like the MacBook Air and other leading computers.
            </li>
            <li>
              <strong>Smart Devices & Accessories:</strong> From cameras to
              smartwatches, we have everything to complement your tech
              ecosystem.
            </li>
          </ul>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <h3 className="mb-3">Our Commitment</h3>

          <ul className="text-black-50">
            <li>
              <strong>Innovation:</strong> We bring you the newest tech trends
              and latest releases as soon as they hit the market.
            </li>
            <li>
              <strong>Customer Satisfaction:</strong> Our priority is to provide
              excellent customer service, ensuring a seamless shopping
              experience from start to finish.
            </li>
            <li>
              <strong>Quality Products:</strong> Each item in our store is
              sourced from top-tier brands, guaranteeing authenticity and
              reliability.
            </li>
          </ul>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <h3 className="mb-3">Why Choose Us?</h3>

          <p className="text-black-50 mb-4">
            Cyber is more than a tech store; it&apos;s a gateway to innovation.
            Whether you&apos;re a gamer, a professional, or just someone
            passionate about technology, we’re here to equip you with the tools
            you need to thrive in a digital world.
          </p>

          <p className="fs-5 text-center">
            Thank you for choosing <strong>cyber.</strong> Let’s embrace the
            future together. 💙✨
          </p>
        </Container>
      </section>
    </div>
  );
};

export default About;

import { useEffect } from "react";
import { Container } from "../components";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="pt-5 pb-5 mt-5">
      <section className="mb-4">
        <Container>
          <h3 className="mb-3">Contact Us</h3>

          <p className="text-black-50 mb-4">
            We’d love to hear from you! Whether you have a question about our
            products, need assistance, or simply want to share your feedback,
            our team is here to help.
          </p>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <h3 className="mb-3">Get in Touch</h3>

          <p className="text-black-50 mb-3">
            You can reach us through the following channels:
          </p>

          <ul className="text-black-50">
            <li>Call us at: +1-800-123-4567</li>
            <li>Drop us a line at: support@cyber.com</li>
          </ul>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <h3 className="mb-3">Connect With Us Online</h3>

          <p className="text-black-50 mb-3">
            Follow us on social media for the latest updates, promotions, and
            tech news:
          </p>

          <ul className="text-black-50">
            <li>Facebook: @CyberOfficial</li>
            <li>Instagram: @CyberTech</li>
            <li>Twitter: @CyberNow</li>
          </ul>
        </Container>
      </section>

      <section className="mb-4">
        <Container>
          <h3 className="mb-3">Need Help?</h3>

          <p className="text-black-50 mb-4">
            Check out our FAQs or Support Page for quick answers to common
            questions.
          </p>
        </Container>
      </section>
    </div>
  );
};

export default Contact;

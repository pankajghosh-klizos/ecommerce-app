import { Link } from "react-router-dom";
import Container from "../Container";
import { motion } from "motion/react";
import "./Footer.scss";

const Footer = () => {
  return (
    <motion.footer
      className="footer py-5 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <ul className="p-0 m-0 d-grid gap-4">
          <li className="list-group-item text-center text-md-start px-2 fs-5">
            <Link className="navbar-brand fs-1 fw-semibold lh-1" to="/">
              cyber.
            </Link>

            <p className="text-white-50 mt-3">
              Cyber eCommerce - Your one-stop shop for cutting-edge gadgets,
              electronics, and tech essentials. Shop with confidence, enjoy
              seamless transactions, and explore the future of online shopping.
              Stay connected, stay innovative!
            </p>
          </li>

          <li className="list-group-item text-center text-md-start px-2 fs-5">
            <p className="fw-semibold fs-5 m-0 mb-2">Services</p>

            <ul className="m-0 p-0">
              {[
                "Bonus program",
                "Gift cards",
                "Credit and payment",
                "Service contracts",
                "Non-cash account",
                "Payment",
              ].map((item, index) => (
                <li
                  key={index}
                  className="list-group-item p-0 mb-2 fw-light text-white-50"
                >
                  <Link className="nav-link" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="list-group-item text-center text-md-start px-2 fs-5">
            <p className="fw-semibold fs-5 m-0 mb-2">Assistance to the buyer</p>

            <ul className="m-0 p-0">
              {[
                "Find an order",
                "Terms of delivery",
                "Exchange and return of goods",
                "Guarantee",
                "Frequently asked questions",
                "Terms of use of the site",
              ].map((item, index) => (
                <li
                  key={index}
                  className="list-group-item p-0 mb-2 fw-light text-white-50"
                >
                  <Link className="nav-link" to="/">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </Container>
    </motion.footer>
  );
};

export default Footer;

import { Container } from "../components";

const ProductDescriptionSection = () => {
  const screenDetails = [
    ["Screen diagonal", '6.7"'],
    ["The screen resolution", "2796x1290"],
    ["The screen refresh rate", "120 Hz"],
    ["The pixel density", "460 ppi"],
    ["Screen type", "OLED"],
    ["Additionally", "Dynamic Island, Always-On display, HDR display..."],
  ];

  const cpuDetails = [
    ["CPU", "A16 Bionic"],
    ["Number of cores", "6"],
  ];

  return (
    <section className="py-5 pt-0" id="#product_description">
      <Container>
        <h3 className="mb-3">Details</h3>
        <p className="text-black-50 mb-4">
          Just as a book is judged by its cover, the first thing you notice
          when...
        </p>

        <h4 className="mb-3">Screen</h4>
        <ul className="list-unstyled mb-5">
          {screenDetails.map(([label, value], index) => (
            <li
              key={index}
              className="d-flex justify-content-between border-bottom mb-3 gap-4"
            >
              <p>{label}</p>
              <p>{value}</p>
            </li>
          ))}
        </ul>

        <h4 className="mb-3">CPU</h4>
        <ul className="list-unstyled">
          {cpuDetails.map(([label, value], index) => (
            <li
              key={index}
              className="d-flex justify-content-between border-bottom mb-3 gap-4"
            >
              <p>{label}</p>
              <p>{value}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ProductDescriptionSection;

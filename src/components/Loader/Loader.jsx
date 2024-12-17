import PropTypes from "prop-types";
import "./Loader.scss";

const Loader = ({ className = "", ...props }) => {
  return (
    <div
      className={`spinner-border text-primary ${className}`}
      aria-live="polite"
      aria-atomic="true"
      {...props}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

export default Loader;

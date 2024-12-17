import PropTypes from "prop-types";

const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`btn d-flex align-items-center justify-content-center gap-2 ${className}`}
      {...props}
    >
      {children || "Button"}
    </button>
  );
};

export default Button;

// PropTypes for type checking of component props
Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
};

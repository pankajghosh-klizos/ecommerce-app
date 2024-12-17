import PropTypes from "prop-types";

const Container = ({ children, className = "" }) => {
  return <div className={`container ${className}`}>{children}</div>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

import PropTypes from "prop-types";
import { Images } from "../constants/images";

const AuthFormLayout = ({
  children,
  title,
  containerClassName = "",
  className = "",
}) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${containerClassName}`}
    >
      <div className="d-none d-lg-block w-100">
        <img
          src={Images?.authBanner}
          alt="banner"
          className="d-none d-lg-block"
        />
      </div>

      <div className={`w-100 d-flex flex-column ${className}`}>
        {title && <h1 className="text-center text-lg-start mb-3">{title}</h1>}
        <div className="flex-grow-1">{children}</div>
      </div>
    </div>
  );
};

export default AuthFormLayout;

AuthFormLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
};

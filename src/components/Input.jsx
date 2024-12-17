import PropTypes from "prop-types";
import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    containerClassName = "",
    className = "",
    errorMessage = "",
    style = {},
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className={`mb-3 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      <div className="position-relative mb-3">
        <input
          type={type}
          className={`form-control py-md-2 ${className}`}
          id={id}
          ref={ref}
          style={{ height: "calc(1.5em + 0.75rem + 2px)", ...style }}
          {...props}
        />
        <p className="small position-absolute text-danger mb-0">
          {errorMessage}
        </p>
      </div>
    </div>
  );
});

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  style: PropTypes.object,
};

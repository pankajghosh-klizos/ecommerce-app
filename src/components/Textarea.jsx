import PropTypes from "prop-types";
import { forwardRef, useId } from "react";

const Textarea = forwardRef(function Textarea(
  {
    label,
    placeholder = "Enter text here...",
    containerClassName = "",
    className = "",
    errorMessage = "",
    rows = 4,
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
        <textarea
          id={id}
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={`form-control ${className}`}
          {...props}
        ></textarea>
        <p className="small position-absolute text-danger mb-0">
          {errorMessage}
        </p>
      </div>
    </div>
  );
});

export default Textarea;

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  rows: PropTypes.number,
};

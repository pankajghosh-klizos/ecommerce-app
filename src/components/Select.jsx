import PropTypes from "prop-types";
import { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  {
    label,
    options = [],
    placeholder = "Select an option",
    containerClassName = "",
    className = "",
    errorMessage = "",
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
        <select
          id={id}
          ref={ref}
          className={`form-select ${className}`}
          defaultValue=""
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="small position-absolute text-danger mb-0">
          {errorMessage}
        </p>
      </div>
    </div>
  );
});

export default Select;

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
};

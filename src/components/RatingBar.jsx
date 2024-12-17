import PropTypes from "prop-types";

const RatingBar = ({ label, percentage, value }) => {
  return (
    <div className="d-flex align-items-center mb-2">
      {/* Label */}
      <div className="text-nowrap rating-label fs-5">{label}</div>

      {/* Progress Bar */}
      <div className="progress flex-grow-1" style={{ height: "10px" }}>
        <progress
          className="progress-bar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        ></progress>
      </div>

      {/* Value */}
      <div className="rating-value text-end text-black-50">{value}</div>
    </div>
  );
};

export default RatingBar;

RatingBar.propTypes = {
  label: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

import PropTypes from "prop-types";

const Accordion = ({
  id,
  title,
  children,
  expanded = false,
  containerClass = "",
  className = "",
}) => {
  return (
    <div className={`accordion ${containerClass}`} id="accordionExample">
      <div className="accordion-item border-0">
        <button
          className={`accordion-button shadow-none p-0 py-2 px-1 border-bottom fw-semibold ${
            !expanded && "collapsed"
          }`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}`}
          aria-expanded={expanded}
          aria-controls={id}
        >
          {title}
        </button>

        <div
          id={id}
          className={`accordion-collapse collapse ${expanded ? "show" : ""}`}
          data-bs-parent="#accordionExample"
        >
          <div className={`accordion-body p-0 ${className}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  expanded: PropTypes.bool,
  containerClass: PropTypes.string,
  className: PropTypes.string,
};

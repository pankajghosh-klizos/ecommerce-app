import PropTypes from "prop-types";
import Button from "./Button";

const Modal = ({
  id,
  title = "Modal Title",
  children,
  footerButtons = [],
  isCentered = false,
  onClose = () => {},
  containerClassName = "",
}) => {
  return (
    <>
      <Button
        type="button"
        className="btn-dark"
        data-bs-toggle="modal"
        data-bs-target={`#${id}`}
      >
        {title}
      </Button>

      <div
        className={`modal fade ${containerClassName}`}
        id={id}
        tabIndex="-1"
        aria-labelledby={`${id}Label`}
        aria-hidden="true"
      >
        <div
          className={`modal-dialog ${
            isCentered ? "modal-dialog-centered" : ""
          }`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${id}Label`}>
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            {footerButtons.length > 0 && (
              <div className="modal-footer">
                {footerButtons.map((button, index) => (
                  <button
                    key={index}
                    type={button.type || "button"}
                    className={`btn ${button.className}`}
                    onClick={button.onClick}
                    data-bs-dismiss={button.dismiss ? "modal" : ""}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  footerButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      className: PropTypes.string,
      onClick: PropTypes.func,
      type: PropTypes.string,
      dismiss: PropTypes.bool,
    })
  ),
  isCentered: PropTypes.bool,
  onClose: PropTypes.func,
  containerClassName: PropTypes.string,
};

export default Modal;

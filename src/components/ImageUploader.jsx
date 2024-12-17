import PropTypes from "prop-types";
import { forwardRef, useState, useId } from "react";

const ImageUploader = forwardRef(function ImageUploader(
  {
    label,
    containerClassName = "",
    className = "",
    errorMessage = "",
    accept = "image/*",
    onChange,
    maxFiles = 4,
    name,
    ...props
  },
  ref
) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(errorMessage);
  const id = useId();

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > maxFiles) {
      setError(`You can upload a maximum of ${maxFiles} images.`);
      return;
    }

    const newImages = [];
    let valid = true;

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          newImages.push(fileReader.result);
          if (newImages.length === files.length) {
            setImages((prevImages) => {
              const updatedImages = [...prevImages, ...newImages];
              if (onChange) {
                onChange({
                  target: {
                    name,
                    value: updatedImages,
                  },
                });
              }
              return updatedImages;
            });
            setError("");
          }
        };
        fileReader.readAsDataURL(file);
      } else {
        valid = false;
        setError("Please upload only valid image files.");
        break;
      }
    }

    if (!valid) return;
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      if (onChange) {
        onChange({
          target: {
            name,
            value: updatedImages,
          },
        });
      }
      return updatedImages;
    });
  };

  return (
    <div className={`mb-3 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}

      <div className="position-relative mb-3">
        <input
          type="file"
          className={`form-control py-md-2 ${className}`}
          id={id}
          ref={ref}
          accept={accept}
          onChange={handleFileChange}
          multiple
          name={name}
          {...props}
        />
        <div className="d-flex flex-wrap mt-2">
          {images.map((image, index) => (
            <div key={index} className="position-relative mr-2 mb-2">
              <img
                src={image}
                alt={`preview-${index}`}
                className="img-fluid"
                style={{
                  maxHeight: "200px",
                  objectFit: "cover",
                  width: "100px",
                  height: "100px",
                }}
              />
              <button
                type="button"
                className="btn btn-danger position-absolute"
                style={{
                  top: "0",
                  right: "0",
                  padding: "0.2rem 0.4rem",
                  fontSize: "12px",
                }}
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        {(error || errorMessage) && (
          <p
            className="small position-absolute text-danger mb-0"
            style={{ bottom: "-20px" }}
          >
            {error || errorMessage}
          </p>
        )}
      </div>
    </div>
  );
});

export default ImageUploader;

ImageUploader.propTypes = {
  label: PropTypes.string,
  containerClassName: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  style: PropTypes.object,
  accept: PropTypes.string,
  onChange: PropTypes.func,
  maxFiles: PropTypes.number,
  name: PropTypes.string.isRequired,
};

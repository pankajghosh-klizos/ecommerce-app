import PropTypes from "prop-types";
import { Icons } from "../../constants/icons";
import "./Search.scss";

const Search = ({ className = "" }) => {
  return (
    <div
      className={`searchbar d-flex align-items-center rounded-2 p-2 gap-1 ${className}`}
    >
      <img src={Icons.Search} alt="icon" className="px-1" />

      <form className="d-flex align-items-center gap-1">
        <input type="text" className="rounded-1 border-0" />

        {/* <button type="submit" className="btn btn-dark btn-sm">
          Search
        </button> */}
      </form>
    </div>
  );
};

export default Search;

Search.propTypes = {
  className: PropTypes.string,
};

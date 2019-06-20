import React from "react";
import PropTypes from "prop-types";
import "./SearchBox.css";

const SearchBox = ({ searchText, placeholder, onTextChange }) => {
  return (
    <div className="search-input ml-4">
      <div className="input-group col-md-12">
        <span className="search-icon">
          <i className="fas far fa-search mt-2" />
        </span>
        <input
          type="text"
          value={searchText}
          className="form-control input-lg"
          onChange={e => onTextChange(e.currentTarget.value)}
          placeholder={placeholder}
        />
        {searchText && (
          <button
            className="btn btn-link"
            type="button"
            onClick={() => onTextChange("")}
          >
            <i className="fas far fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  searchText: PropTypes.string,
  placeholder: PropTypes.string,
  onTextChange: PropTypes.func.isRequired
};

SearchBox.defaultProps = {
  searchText: "",
  placeholder: "Search"
};

export default SearchBox;

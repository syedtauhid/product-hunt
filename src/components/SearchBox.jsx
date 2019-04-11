import React from 'react';
import PropTypes from 'prop-types';
import './SearchBox.css';

const SearchBox = ({ text, placeholder, onTextChange }) => {
    return (
        <div className="search-input">
            <div className="input-group col-md-12">
                <span className="search-icon">
                    <i className="fas far fa-search mt-2"></i>
                </span>
                <input type="text" value={ text } className="form-control input-lg" onChange={ (e) => onTextChange(e.currentTarget.value)}  placeholder={ placeholder } />
                <button className="btn btn-link" type="button" onClick={()=>onTextChange('')}><i className="fas far fa-times"></i></button>
            </div>
        </div>
    )
}

SearchBox.propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    onTextChange: PropTypes.func.isRequired
}

SearchBox.defaultProps = {
    text: '',
    placeholder: 'search'
}

export default SearchBox;
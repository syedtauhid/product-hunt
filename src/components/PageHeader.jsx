import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ title, label }) => {
    return (
        <div className="pb-1 mt-4 mb-4 border-bottom text-center">
            <h4>{ title }</h4>
            <small className="text-muted"> { label } </small>
        </div>
    )
}

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string
}

PageHeader.defaultProps = {
    label: ''
}

export default PageHeader;
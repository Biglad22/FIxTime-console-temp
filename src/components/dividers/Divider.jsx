import React from 'react';
import PropTypes from 'prop-types';

const Divider = ({ className ='' }) => {
    return <div className={`h-px bg-medium ${className}`}></div>;
};

Divider.propTypes = {
    className: PropTypes.string,
};

export default Divider;

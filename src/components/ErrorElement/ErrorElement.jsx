import React from 'react';
import PropTypes from 'prop-types';

import './ErrorElement.css';

function ErrorElement({ className, text }) {
  return <span className={`error-element ${className}`}>{text}</span>;
}

ErrorElement.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

ErrorElement.defaultProps = {
  text: '',
  className: '',
};

export default ErrorElement;

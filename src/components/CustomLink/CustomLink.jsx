import React from 'react';
import PropTypes from 'prop-types';

import { Link, NavLink } from 'react-router-dom';

import './CustomLink.css';

function CustomLink({
  path, children, className, activeClassName, onClick, target, ariaLabel,
}) {
  if (path.startsWith('http')) {
    return (
      <a href={path} className={`custom-link ${className}`} rel="noreferrer" target={target}>
        {children}
      </a>
    );
  }
  if (activeClassName) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) => `custom-link ${className} ${isActive ? activeClassName : ''}`}
        onClick={onClick}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <Link to={path} className={`custom-link ${className}`} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

CustomLink.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  target: PropTypes.string,
  activeClassName: PropTypes.string,
  ariaLabel: PropTypes.string,
};

CustomLink.defaultProps = {
  onClick: () => {},
  target: '_blank',
  activeClassName: '',
  ariaLabel: '',
};

export default CustomLink;

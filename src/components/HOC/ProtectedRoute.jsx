import { React, useContext } from 'react';
import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';
import LoginContext from '../../contexts/LoginContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(LoginContext);

  return isLoggedIn ? children : <Navigate to="/" />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

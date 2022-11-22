import { Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Routes>
        <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Navigate to='/' />
      }
      </Route>
    </Routes>
  );
};

export default ProtectedRoute;
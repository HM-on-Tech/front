import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AdminAccess = ({ children }) => {
  const { isLoggedIn } = useSelector(state => state.user)

  useEffect(() => {
      if (isLoggedIn == false) {
          Router.push(`/`); // redirects to http://localhost:3000
      }
  }, [isLoggedIn]);
  return <>{children}</>;
};

export default AdminAccess;

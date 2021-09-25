import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AdminAccess = ({ children }) => {
  console.log('-0000-')
  const { isLoggedIn } = useSelector(state => state.user)

  useEffect(() => {
    console.log('1230918310923809')
      if (isLoggedIn == false) {
          Router.push(`/`); // redirects to http://localhost:3000
      }
  }, [isLoggedIn]);
  return <>{children}</>;
};

export default AdminAccess;

import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from './auth';

const Admin = ({ children }) => {
    useEffect(() => {
        if (!isAuth() || isAuth().role !== true) {
            Router.push(`/`); // redirects to http://localhost:3000
        }
    }, []);
    return <>{children}</>;
};

export default Admin;

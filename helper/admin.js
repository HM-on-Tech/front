import { useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from './auth';

const Admin = ({ children }) => {
    useEffect(() => {
        console.log(isAuth(),'123123')
        if (!isAuth() || isAuth().isAdmin !== true) {
            Router.push(`/`); // redirects to http://localhost:3000
        }
    }, []);
    return <>{children}</>;
};

export default Admin;

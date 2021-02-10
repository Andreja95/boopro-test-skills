import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authService} from '../framework/auth';

const ProtectedRoute = ({component: Component, ...rest}) => {
    const isAuth = authService.isAuth();
    console.log(isAuth);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (isAuth == true) {
                    return <Component {...rest} {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;

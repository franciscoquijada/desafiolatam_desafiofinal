import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const isLogin = () => {

    let jwt = localStorage['token'];
    if (jwt === 'null')
        jwt = null;
    const result = !!jwt;
    return result;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;
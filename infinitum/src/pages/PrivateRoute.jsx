import React from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";


const PrivateRoute = ({ component: Component, pageType, userType, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (userType === "ROLE_CUSTOMER" && pageType === "customer") ||
                ((userType === "ROLE_ADMIN" || userType === "ROLE_WORKER") && pageType === "admin") ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export default PrivateRoute;
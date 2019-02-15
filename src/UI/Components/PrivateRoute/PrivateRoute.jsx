import React from 'react';
import PropTypes from 'prop-types';
import {
    Route, Redirect,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            rest.isSessionUser ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location },
                }}
                />
            )
        )}
    />
);

PrivateRoute.propTypes = {
    isSessionUser: PropTypes.bool,
};

PrivateRoute.defaultProps = {
    isSessionUser: false,
};

export default PrivateRoute;

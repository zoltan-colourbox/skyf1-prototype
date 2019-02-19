import React from 'react';
import PropTypes from 'prop-types';
import {
    Route, Redirect,
} from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            !rest.isSessionUser ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/folder',
                    state: { from: props.location },
                }}
                />
            )
        )}
    />
);

PublicRoute.propTypes = {
    isSessionUser: PropTypes.bool,
};

PublicRoute.defaultProps = {
    isSessionUser: false,
};

export default PublicRoute;

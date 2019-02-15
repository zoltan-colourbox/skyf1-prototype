import React from 'react';
import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import 'Globals/FontAwesome';
import { connect } from 'react-redux';
import AsyncComponent from 'Components/AsyncComponent/AsyncComponent';
import LogoutRedirect from 'Components/LogoutRedirect/LogoutRedirect';
import Styles from './App.scss';

const Login = AsyncComponent(() => import('Containers/Login/Login'));
const Folder = AsyncComponent(() => import('Pages/Folder/Folder'));
const NotFound = AsyncComponent(() => import('Pages/NotFound/NotFound'));
const About = AsyncComponent(() => import('Pages/About/About'));

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className={Styles.Container}>
                    <Switch>
                        <PublicRouteMapped path="/" exact component={Login} />
                        <PrivateRouteMapped path="/folder/:id" exact component={Folder} />
                        <Route path="/about" exact component={About} />
                        <Route component={NotFound} />
                    </Switch>
                    <LogoutRedirect />
                </div>
            </Router>
        );
    }
}

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

const mapStateToProps = (state) => {
    return {
        isSessionUser: !!state.sessionUser.userData.token,
    };
};

const PrivateRouteMapped = connect(
    mapStateToProps,
)(PrivateRoute);


const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            rest.isSessionUser !== true ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: '/folder/root',
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

const PublicRouteMapped = connect(
    mapStateToProps,
)(PublicRoute);

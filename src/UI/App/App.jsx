import React from 'react';
import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import 'Globals/FontAwesome';
import SessionUser from 'Globals/SessionUser';
import AsyncComponent from 'Components/AsyncComponent/AsyncComponent';
import LogoutRedirect from 'Components/LogoutRedirect/LogoutRedirect';
import Styles from './App.scss';

const Login = AsyncComponent(() => import('Pages/Login/Login'));
const Folder = AsyncComponent(() => import('Pages/Folder/Folder'));
const NotFound = AsyncComponent(() => import('Pages/NotFound/NotFound'));
const About = AsyncComponent(() => import('Pages/About/About'));

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className={Styles.Container}>
                    <Switch>
                        <PublicRoute path="/" exact component={Login} />
                        <PrivateRoute path="/folder/:id" exact component={Folder} />
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
            SessionUser.is === true ? (
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

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            SessionUser.is !== true ? (
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

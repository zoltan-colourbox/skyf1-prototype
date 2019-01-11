import React from 'react';
import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import '../../Globals/FontAwesome';
import AsyncComponent from '../Components/AsyncComponent/AsyncComponent';
import LogoutRedirect from '../Components/LogoutRedirect/LogoutRedirect';
import SessionUser from '../../Globals/SessionUser';
import Styles from './App.scss';

const Login = AsyncComponent(() => import('../Containers/Login/Login'));
const Folder = AsyncComponent(() => import('../Containers/Folder/Folder'));
const NotFound = AsyncComponent(() => import('../Containers/NotFound/NotFound'));
const About = AsyncComponent(() => import('../Containers/About/About'));

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

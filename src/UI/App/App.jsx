import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import 'Globals/FontAwesome';
import AsyncComponent from 'Components/AsyncComponent/AsyncComponent';
import PublicRoute from 'Containers/PublicRoute/PublicRoute';
import PrivateRoute from 'Containers/PrivateRoute/PrivateRoute';
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
                        <PublicRoute path="/" exact component={Login} />
                        <PrivateRoute path="/folder/:id" exact component={Folder} />
                        <Route path="/about" exact component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

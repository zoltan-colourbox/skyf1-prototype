import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AsyncComponent from '../Components/AsyncComponent/AsyncComponent';
import HeaderBar from '../Components/HeaderBar/HeaderBar';

import SessionUser from '../../Globals/SessionUser';
import Styles from './App.scss';

const Login = AsyncComponent(() => import("../Containers/Login/Login"));
const Folder = AsyncComponent(() => import("../Containers/Folder/Folder"));
const NotFound = AsyncComponent(() => import("../Containers/NotFound/NotFound"));
const About = AsyncComponent(() => import("../Containers/About/About"));

class App extends React.Component {
  render() {
    return (
      <Router>
          <div>
            <HeaderBar className={Styles.HeaderBar} />
            <div className={Styles.Container}>
                <Switch>
                  <PublicRoute path="/" exact component={Login} />
                  <PrivateRoute path="/folder/:id" exact component={Folder} />
                  <Route path="/about" exact component={About} />
                  <Route component={NotFound} />
                </Switch>
            </div>
          </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      SessionUser.isLogged === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: "/",
          state: { from: props.location }
          }} />
  )} />
)

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      SessionUser.isLogged !== true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: "/folder/root",
          state: { from: props.location }
          }} />
  )} />
)

export default App;

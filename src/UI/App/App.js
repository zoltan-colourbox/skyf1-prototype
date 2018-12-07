import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AsyncComponent from '../Components/AsyncComponent/AsyncComponent';
// import PrivateRoute from '../Components/AsyncComponent/AsyncComponent';

import SessionUser from '../../Globals/SessionUser';
import './App.scss';

const Login = AsyncComponent(() => import("../Containers/Login/Login"));
const Folder = AsyncComponent(() => import("../Containers/Folder/Folder"));
const NotFound = AsyncComponent(() => import("../Containers/NotFound/NotFound"));
const About = AsyncComponent(() => import("../Containers/About/About"));

class App extends React.Component {
  render() {
    return (
      <Router>
          <Switch>
            <PublicRoute path="/" exact component={Login} />
            <PrivateRoute path="/folder/:id" exact component={Folder} />
            <Route path="/about" exact component={About} />
            <Route component={NotFound} />
          </Switch>
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
          pathname: "/",
          state: { from: props.location }
          }} />
  )} />
)

export default App;

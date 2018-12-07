import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AsyncComponent from '../Components/AsyncComponent/AsyncComponent';
import './App.scss';

const Login = AsyncComponent(() => import("../Containers/Login/Login"));
const Folder = AsyncComponent(() => import("../Containers/Folder/Folder"));
const NotFound = AsyncComponent(() => import("../Containers/NotFound/NotFound"));

class App extends React.Component {
  render() {
    return (
      <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/folder/:id" exact component={Folder} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    );
  }
}

export default App;

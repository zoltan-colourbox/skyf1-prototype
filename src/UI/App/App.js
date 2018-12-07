import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AsyncComponent from '../Components/AsyncComponent/AsyncComponent';
import './App.scss';

const Login = AsyncComponent(() => import("../Containers/Login/Login"));
const Folder = AsyncComponent(() => import("../Containers/Folder/Folder"));
const NotFound = AsyncComponent(() => import("../Containers/NotFound/NotFound"));

class App extends React.Component {
  render() {
    return (
      <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/folder/all">Folder</Link>
              </li>
              <li>
                <Link to="/notfound">404</Link>
              </li>
            </ul>
            
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/folder/:id" exact component={Folder} />
              <Route component={NotFound} />
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;

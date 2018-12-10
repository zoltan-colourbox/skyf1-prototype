import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Styles from './HeaderBar.scss';
import SessionUser from '../../../Globals/SessionUser';

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: SessionUser.name,
      isLogged: SessionUser.isLogged,
    };

    this.onClick = this.onClick.bind(this);
    this.userChanged = this.userChanged.bind(this);
  }

  userChanged(event, user) {
    this.setState({ 
      name: user.name,
      isLogged: user.isLogged
    });
  }

  onClick() {
    SessionUser.logout();
  }

  componentWillMount() {
    SessionUser.on('change', this.userChanged);
  }

  componentWillUnmount() {
    SessionUser.off('change', this.userChanged);
  }

  render() {
    return this.state.isLogged ? (
      <div className={[this.props.className, Styles.Container].join(' ')}>
        <span>{this.state.name}</span> 
        <span> | </span>
        <button onClick={this.onClick}>Logout</button>
      </div>
    ) : (
    <Route>
      <Redirect to="/" />
    </Route>);
  }
}

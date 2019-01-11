import React from 'react';
import { Route, Redirect } from 'react-router';
import SessionUser from '../../../Globals/SessionUser';
import Styles from './Login.scss';
import GlobalStyles from '../../../Globals/Global.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isSessionUser: SessionUser.is,
            error: false,
            loading: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.id]: event.target.value,
            error: false,
        });
    }

    onSubmit(event) {
        event.preventDefault();

        this.setState({ error: false });

        const { email, password, loading } = this.state;
        if (!loading) {
            this.setState({ loading: true });
            SessionUser.login(email, password)
                .then(() => {
                    this.setState({
                        isSessionUser: SessionUser.is,
                        loading: false,
                    });
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false,
                    });
                });
        }
    }

    render() {
        const {
            email, password, isSessionUser, error,
        } = this.state;

        return (
            <div className={Styles.Container}>
                <div className={Styles.Table}>
                    <div className={Styles.Cell}>
                        <div className={Styles.Box}>
                            <img src="/skyfish-logo-small.svg" alt="Skyfish" className={Styles.Logo} />
                            <h1>Log in to Skyfish</h1>
                            <p>Welcome back! Thanks for using Skyfish</p>
                            <form onSubmit={this.onSubmit}>
                                <input type="text" id="email" className={Styles.Input} placeholder="Email address" onChange={this.onChange} value={email} />
                                <input type="password" id="password" className={Styles.Input} placeholder="Password" onChange={this.onChange} value={password} />
                                {
                                    error ? (
                                        <p className={[Styles.ErrorMessage, GlobalStyles.ErrorMessage].join(' ')}>Wrong username or password</p>
                                    ) : null
                                }
                                <div className={Styles.Buttons}>
                                    <button type="submit" className={GlobalStyles.SubmitButton}>Log in</button>
                                    <button type="button" className={GlobalStyles.InlineButton}>Forgot your password?</button>
                                </div>
                                <div className={GlobalStyles.Spacer} />
                            </form>
                        </div>
                    </div>
                </div>
                {
                    isSessionUser ? (
                        <Route>
                            <Redirect to="/folder/root" />
                        </Route>
                    ) : null
                }
            </div>
        );
    }
}

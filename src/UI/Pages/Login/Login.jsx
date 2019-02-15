import React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import GlobalStyles from 'Globals/Global.scss';
import Styles from './Login.scss';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const { onChange } = this.props;
        onChange();
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const { email, password } = this.state;
        const { isFetching } = this.props;
        if (!isFetching) {
            const { onSubmit } = this.props;
            onSubmit(email, password);
        }
    }

    render() {
        const {
            email, password,
        } = this.state;
        const {
            isError, isSessionUser,
        } = this.props;

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
                                    isError ? (
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

Login.propTypes = {
    isFetching: PropTypes.bool,
    isError: PropTypes.bool,
    isSessionUser: PropTypes.bool,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
};

Login.defaultProps = {
    isFetching: false,
    isError: false,
    isSessionUser: false,
    onSubmit: () => {},
    onChange: () => {},
};

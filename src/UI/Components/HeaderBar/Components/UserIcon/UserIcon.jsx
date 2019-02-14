import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './UserIcon.scss';

export default class UserIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropDown: false,
        };

        this.container = React.createRef();
        this.dropDownContainer = React.createRef();

        this.toggleDrodDown = this.toggleDrodDown.bind(this);
        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.onDocumentMouseDown);
        document.addEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocumentMouseDown);
        document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentMouseDown(event) {
        if (!((this.container.current && this.container.current.contains(event.target))
            || (this.dropDownContainer.current && this.dropDownContainer.current.contains(event.target)))) {
            this.setState({ showDropDown: false });
        }
    }

    onDocumentClick(event) {
        if (this.dropDownContainer.current && this.dropDownContainer.current.contains(event.target)) {
            setTimeout(() => {
                if (this.dropDownContainer.current) {
                    this.setState({ showDropDown: false });
                }
            }, 100);
        }
    }

    toggleDrodDown() {
        this.setState((state) => {
            return { showDropDown: !state.showDropDown };
        });
    }

    render() {
        const { name, imageUrl, onLogout } = this.props;
        const { showDropDown } = this.state;
        return (
            <div ref={this.container} className={Styles.Container}>
                <button type="button" onClick={this.toggleDrodDown}>
                    { imageUrl ? <div className={Styles.ProfileImage} style={{ backgroundImage: `url('${imageUrl}')` }} /> : <FontAwesomeIcon icon="user-circle" /> }
                    <span className={Styles.Name}>{name}</span>
                    <FontAwesomeIcon icon={!showDropDown ? 'chevron-down' : 'chevron-up'} />
                </button>
                {
                    showDropDown
                        ? ReactDOM.createPortal((
                            <React.Fragment>
                                <div ref={this.dropDownContainer} className={Styles.DropDown}>
                                    <ul>
                                        <li>
                                            <button type="button">
                                                <span><FontAwesomeIcon icon="user" /></span>
                                                <span>My account</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button type="button">
                                                <span><FontAwesomeIcon icon="cog" /></span>
                                                <span>Admin</span>
                                            </button>
                                        </li>
                                        <li>
                                            <a href="https://www.skyfish.com/helpcenter" target="_blank" rel="noopener noreferrer">
                                                <span><FontAwesomeIcon icon="question-circle" /></span>
                                                <span>Help center</span>
                                            </a>
                                        </li>
                                        <li>
                                            <button type="button" onClick={onLogout}>
                                                <span><FontAwesomeIcon icon="sign-out-alt" /></span>
                                                <span>Logout</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <div className={Styles.DropDownOverlay} />
                            </React.Fragment>
                        ),
                        document.body) : null
                }
            </div>
        );
    }
}

UserIcon.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onLogout: PropTypes.func,
};

UserIcon.defaultProps = {
    name: '',
    imageUrl: '',
    onLogout: () => {},
};

import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './UserIcon.scss';
import SessionUser from '../../../../../Globals/SessionUser';

export default class UserIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: SessionUser.name,
            imageUrl: SessionUser.profileImageUrl,
            showDropDown: false,
        };

        this.container = React.createRef();
        this.dropDownContainer = React.createRef();

        this.userChanged = this.userChanged.bind(this);
        this.toggleDrodDown = this.toggleDrodDown.bind(this);
        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);

        if (SessionUser.profileImageUrl) {
            const image = new Image();
            image.onerror = () => {
                SessionUser.updateProfileImageUrl();
            };
            image.src = SessionUser.profileImageUrl;
        }
    }

    componentWillMount() {
        SessionUser.on('change', this.userChanged);
        document.addEventListener('mousedown', this.onDocumentMouseDown);
        document.addEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount() {
        SessionUser.off('change', this.userChanged);
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

    userChanged() {
        this.setState({
            name: SessionUser.name,
            imageUrl: SessionUser.profileImageUrl,
        });
    }

    toggleDrodDown() {
        this.setState((state) => {
            return { showDropDown: !state.showDropDown };
        });
    }

    logout() {
        SessionUser.logout();
    }

    render() {
        const { showDropDown, name, imageUrl } = this.state;
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
                                            <button type="button" onClick={this.logout}>
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

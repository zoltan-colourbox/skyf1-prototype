import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './NotifyInstall.scss';

export default class NotifyInstall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

        this.deferredPrompt = null;
        window.addEventListener('beforeinstallprompt', (event) => {
            this.setState({ visible: true });

            // Prevent Chrome 67 and earlier from automatically showing the prompt
            event.preventDefault();

            // Stash the event so it can be triggered later.
            this.deferredPrompt = event;
        });

        this.installed = false;
        window.addEventListener('appinstalled', () => {
            this.installed = true;
        });

        this.onClose = this.onClose.bind(this);
        this.onInstall = this.onInstall.bind(this);
    }

    onClose() {
        this.setState({
            visible: false,
        });
    }

    onInstall() {
        this.onClose();
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA accepted'); // eslint-disable-line no-console
                } else {
                    this.setState({ visible: false });
                }
            });
    }

    render() {
        const { visible } = this.state;

        return (
            visible ? (
                ReactDOM.createPortal((
                    <div className={Styles.Container}>
                        <div className={Styles.Text}>
                            <img src="/logo-192x192.png" alt="Skyfish PWA" align="absmiddle" />
                            Skyfish PWA
                        </div>
                        <button type="button" onClick={this.onInstall} className={Styles.Button}>Install Skyfish PWA</button>
                        <button type="button" onClick={this.onClose} className={Styles.Close}>
                            <FontAwesomeIcon icon="times" />
                        </button>
                    </div>
                ), document.body)
            ) : null
        );
    }
}

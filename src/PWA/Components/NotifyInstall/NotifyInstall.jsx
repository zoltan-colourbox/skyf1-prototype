import React from 'react';
import ReactDOM from 'react-dom';
import Styles from './NotifyInstall.less';

export default class NotifyInstall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
        };
    }

    render() {
        const { visible } = this.state;

        return (
            visible ? (
                ReactDOM.createPortal((
                    <div className={Styles.Container}>
                        1
                    </div>
                ), document.body)
            ) : null
        );
    }
}

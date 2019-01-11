import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './NotificationIcon.scss';

export default class NotificationIcon extends React.Component {
    render() {
        return (
            <div className={Styles.Container}>
                <button type="button">
                    <FontAwesomeIcon icon="bell" />
                </button>
            </div>
        );
    }
}

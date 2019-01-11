import React from 'react';
import Styles from './MenuIcon.scss';

export default class MenuIcon extends React.Component {
    render() {
        return (
            <div className={Styles.Container}>
                <button type="button">
                    <span />
                </button>
            </div>
        );
    }
}

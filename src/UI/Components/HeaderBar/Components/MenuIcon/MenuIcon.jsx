import React from 'react';
import PropTypes from 'prop-types';
import Styles from './MenuIcon.scss';

export default class MenuIcon extends React.Component {
    render() {
        const { className } = this.props;
        return (
            <div {...this.props} className={[className, Styles.Container].join(' ')}>
                <button type="button">
                    <span />
                </button>
            </div>
        );
    }
}

MenuIcon.propTypes = {
    className: PropTypes.string,
};

MenuIcon.defaultProps = {
    className: '',
};

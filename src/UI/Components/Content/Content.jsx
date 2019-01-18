import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Content.scss';

export default class Content extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <div className={Styles.Container}>
                <div className={Styles.Content}>
                    {children}
                </div>
            </div>
        );
    }
}

Content.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Content.defaultProps = {
    children: null,
};

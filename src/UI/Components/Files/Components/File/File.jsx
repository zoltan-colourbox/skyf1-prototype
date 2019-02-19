import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Styles from './File.scss';

export default class File extends React.Component {
    render() {
        const {
            className, filename, icon, folderId, mediaId,
        } = this.props;

        return (
            <Link
                className={[className, Styles.Container].join(' ')}
                to={`/folder/${folderId}/media/${mediaId}`}
            >
                <div className={Styles.Content}>
                    <div className={Styles.ContentInner}>
                        <div className={Styles.Icon} style={{ backgroundImage: `url('${icon}')` }} />
                        <div className={Styles.Title}>{filename}</div>
                    </div>
                </div>
            </Link>
        );
    }
}

File.propTypes = {
    className: PropTypes.string,
    filename: PropTypes.string, // eslint-disable-line react/forbid-prop-types
    icon: PropTypes.string,
    folderId: PropTypes.number,
    mediaId: PropTypes.number,
};

File.defaultProps = {
    className: null,
    filename: '',
    icon: '',
    folderId: null,
    mediaId: null,
};

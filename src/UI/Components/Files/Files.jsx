import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import File from './Components/File/File';
import Styles from './Files.scss';

export default class Files extends React.Component {
    render() {
        const {
            className, files, isFetching, folderId,
        } = this.props;

        return (
            <div className={[className, Styles.Container].join(' ')}>
                <div className={Styles.Content}>
                    {isFetching ? (
                        <FontAwesomeIcon icon="sync-alt" className={Styles.LoadingIcon} />
                    ) : (
                        <div className={Styles.Files}>
                            {files.map(file => (
                                <File
                                    className={Styles.File}
                                    key={file.media_id}
                                    filename={file.filename}
                                    icon={file.thumbnail_url_ssl}
                                    mediaId={file.unique_media_id}
                                    folderId={folderId}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Files.propTypes = {
    className: PropTypes.string,
    files: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    isFetching: PropTypes.bool,
    folderId: PropTypes.number,
};

Files.defaultProps = {
    className: null,
    isFetching: false,
    folderId: null,
};

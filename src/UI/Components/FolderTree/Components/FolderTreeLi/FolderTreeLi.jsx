import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Styles from './FolderTreeLi.scss';
import FolderTree from '../../FolderTree';

export default class FolderTreeLi extends React.Component {
    render() {
        const {
            className, folders, folder, folderId,
        } = this.props;

        return (
            <li className={[className, Styles.Container].join(' ')}>
                <Link
                    className={[Styles.Link, folderId === folder.id ? Styles.Active : null].join(' ')}
                    to={`/folder/${folder.id}`}
                >
                    {folder.name}
                </Link>
                <FolderTree folders={folders} folderId={folderId} parentId={folder.id} />
            </li>
        );
    }
}

FolderTreeLi.propTypes = {
    className: PropTypes.string,
    folder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    folders: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    folderId: PropTypes.number,
};

FolderTreeLi.defaultProps = {
    className: '',
    folders: [],
    folderId: null,
};

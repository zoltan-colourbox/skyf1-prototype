import React from 'react';
import PropTypes from 'prop-types';
import Styles from './FolderTree.scss';
import FolderTreeLi from './Components/FolderTreeLi/FolderTreeLi';

export default class FolderTree extends React.Component {
    render() {
        const { className, folders, parentId } = this.props;

        const liFolders = [];
        Object.values(folders).forEach((folder) => {
            if (folder.parent === parentId) {
                liFolders.push(folder);
            }
        });

        return (
            <ul className={[className, Styles.Container].join(' ')}>
                {liFolders.map(folder => <FolderTreeLi key={folder.id} folder={folder} folders={folders} />)}
            </ul>
        );
    }
}

FolderTree.propTypes = {
    className: PropTypes.string,
    folders: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    parentId: PropTypes.number,
};

FolderTree.defaultProps = {
    className: '',
    parentId: null,
};

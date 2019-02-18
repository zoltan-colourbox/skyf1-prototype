import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './FolderTreeLi.scss';
import FolderTree from '../../FolderTree';

export default class FolderTreeLi extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    onClick() {
        const { onClick } = this.props;
        onClick();
    }

    isActive() {
        const {
            folder, folderId,
        } = this.props;
        return folderId === folder.id;
    }

    toggleCollapse(event) {
        event.preventDefault();
        event.stopPropagation();
        const { setCollapse, folder, collapsed } = this.props;
        setCollapse(folder.id, !collapsed);
    }

    render() {
        const {
            className, folders, folder, folderId, parents, collapsed,
        } = this.props;

        return (
            <li className={[className, Styles.Container].join(' ')}>
                <Link
                    style={{ paddingLeft: `${parents * 10}px` }}
                    className={[Styles.Link, this.isActive() ? Styles.Active : null].join(' ')}
                    onClick={this.onClick}
                    to={`/folder/${folder.id}`}
                >
                    <button
                        type="button"
                        className={[Styles.ArrowIcon, collapsed ? Styles.ArrowIconDown : null].join(' ')}
                        onClick={this.toggleCollapse}
                    >
                        <FontAwesomeIcon icon="caret-right" />
                    </button>
                    <FontAwesomeIcon className={[Styles.Icon, this.isActive() ? Styles.IconActive : null].join(' ')} icon={!this.isActive() ? 'folder' : 'folder-open'} />
                    <span>{folder.name}</span>
                </Link>
                {collapsed ? (
                    <FolderTree folders={folders} folderId={folderId} parentId={folder.id} parents={parents + 1} />
                ) : null}
            </li>
        );
    }
}

FolderTreeLi.propTypes = {
    className: PropTypes.string,
    folder: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    folders: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    folderId: PropTypes.number,
    parents: PropTypes.number,
    collapsed: PropTypes.bool,
    setCollapse: PropTypes.func,
    onClick: PropTypes.func,
};

FolderTreeLi.defaultProps = {
    className: '',
    folders: [],
    folderId: null,
    parents: 0,
    collapsed: false,
    setCollapse: () => {},
    onClick: () => {},
};

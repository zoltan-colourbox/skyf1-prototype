import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './FolderTreeLi.scss';
import FolderTree from '../../FolderTree';

export default class FolderTreeLi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    isActive() {
        const {
            folder, folderId,
        } = this.props;
        return folderId === folder.id;
    }

    toggleCollapse(event) {
        event.preventDefault();
        this.setState((state) => { return { collapsed: !state.collapsed }; });
    }

    render() {
        const {
            className, folders, folder, folderId, parents,
        } = this.props;
        const { collapsed } = this.state;

        return (
            <li className={[className, Styles.Container].join(' ')}>
                <Link
                    style={{ paddingLeft: `${parents * 10}px` }}
                    className={[Styles.Link, this.isActive() ? Styles.Active : null].join(' ')}
                    to={`/folder/${folder.id}`}
                >
                    <button
                        type="button"
                        className={[Styles.ArrowIcon, collapsed ? Styles.ArrowIconDown : null].join(' ')}
                        onClick={this.toggleCollapse}
                    >
                        <FontAwesomeIcon icon="caret-right" />
                    </button>
                    <FontAwesomeIcon className={Styles.Icon} icon={!this.isActive() ? 'folder' : 'folder-open'} />
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
};

FolderTreeLi.defaultProps = {
    className: '',
    folders: [],
    folderId: null,
    parents: 0,
};

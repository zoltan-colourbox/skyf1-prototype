import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import FolderTree from 'Components/FolderTree/FolderTree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './SideBar.scss';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.container = React.createRef();
        this.reloadButton = React.createRef();
        this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.onDocumentMouseDown);
        document.addEventListener('click', this.onDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocumentMouseDown);
        document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentMouseDown(event) {
        const { visible } = this.props;
        if (visible) {
            if (!(this.container.current && this.container.current.contains(event.target))) {
                const { onClose } = this.props;
                onClose();
            }
        }
    }

    onDocumentClick(event) {
        const { visible } = this.props;
        if (visible
            && this.container.current
            && this.container.current.contains(event.target)
            && this.reloadButton.current
            && !this.reloadButton.current.contains(event.target)
        ) {
            setTimeout(() => {
                if (this.container.current) {
                    const { onClose } = this.props;
                    onClose();
                }
            }, 100);
        }
    }

    render() {
        const {
            visible, folders, onReload, isReloading, folderId,
        } = this.props;
        return (
            <React.Fragment>
                <div ref={this.container} className={[Styles.Container, visible ? Styles.Visible : null].join(' ')}>
                    <div className={[Styles.Reload].join(' ')}>
                        <button ref={this.reloadButton} className={[Styles.ReloadButton, isReloading ? Styles.IsReloading : null].join(' ')} type="button" onClick={onReload}>
                            <FontAwesomeIcon icon="sync-alt" />
                        </button>
                    </div>
                    <FolderTree folders={folders} folderId={folderId} className={Styles.FolderTree} />
                </div>
                {
                    ReactDOM.createPortal((
                        <React.Fragment>
                            <div className={[Styles.Overlay, visible ? Styles.Visible : null].join(' ')} />
                            <div className={[Styles.OverlayHeader, visible ? Styles.Visible : null].join(' ')} />
                        </React.Fragment>
                    ), document.body)
                }
            </React.Fragment>
        );
    }
}

SideBar.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    folders: PropTypes.array, // eslint-disable-line react/forbid-prop-
    onReload: PropTypes.func,
    isReloading: PropTypes.bool,
    folderId: PropTypes.number,
};

SideBar.defaultProps = {
    folders: [],
    onReload: () => {},
    isReloading: false,
    folderId: null,
};

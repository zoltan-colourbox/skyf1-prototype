import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import HeaderBar from 'Containers/HeaderBar/HeaderBar';
import Content from 'Components/Content/Content';
import SideBar from 'Containers/SideBar/SideBar';
import Files from 'Containers/Files/Files';
import FilePreview from 'Components/FilePreview/FilePreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capturePicture } from 'Globals/Camera';
import Styles from './Folder.scss';

export default class Folder extends React.Component {
    constructor(props) {
        super(props);

        this.closeSideBar = this.closeSideBar.bind(this);
        this.capturePicture = this.capturePicture.bind(this);
    }

    getFolderBreadcrumbs() {
        const { folders, selectedFolder } = this.props;
        const folderPath = [];
        if (selectedFolder && folders.length > 0) {
            const getFolder = (folderId) => {
                folders.forEach((folder) => {
                    if (folder.id === folderId) {
                        folderPath.push(folder);
                        if (folder.parent !== null) {
                            getFolder(folder.parent);
                        }
                    }
                });
            };
            getFolder(selectedFolder);
        }
        return folderPath.reverse();
    }

    capturePicture() {
        capturePicture().then((imgData) => {
            console.log(imgData);
        });
    }

    closeSideBar() {
        const { setSideBarVisibility } = this.props;
        setSideBarVisibility(false);
    }

    render() {
        const {
            sideBarVisibile, isReloading, onReload, selectedFile,
            APIToken, selectedFolder,
        } = this.props;

        return (
            <React.Fragment>
                <HeaderBar />
                <Content>
                    <div className={Styles.Content}>
                        <div className={Styles.Top}>
                            <div className={Styles.Title}>
                                {this.getFolderBreadcrumbs().map(folder => (
                                    <span
                                        key={folder.id}
                                        className={Styles.Breadcrumb}
                                    >
                                        {folder.name}
                                    </span>
                                ))}
                            </div>
                            <div className={Styles.Reload}>
                                <button className={[Styles.ReloadButton, isReloading ? Styles.IsReloading : null].join(' ')} type="button" onClick={onReload}>
                                    <FontAwesomeIcon icon="sync-alt" />
                                </button>
                            </div>
                        </div>
                        <Files className={Styles.Files} />
                        {selectedFolder ? (
                            <button type="button" className={Styles.Camera} onClick={this.capturePicture}>
                                <FontAwesomeIcon icon="camera-retro" />
                            </button>
                        ) : null}
                    </div>
                </Content>
                {
                    ReactDOM.createPortal(<SideBar
                        visible={sideBarVisibile}
                        onClose={this.closeSideBar}
                    />, document.body)
                }
                {
                    selectedFile ? (
                        <FilePreview APIToken={APIToken} mediaId={selectedFile} />
                    ) : null
                }
            </React.Fragment>
        );
    }
}

Folder.propTypes = {
    setSideBarVisibility: PropTypes.func,
    sideBarVisibile: PropTypes.bool,
    isReloading: PropTypes.bool,
    onReload: PropTypes.func,
    selectedFolder: PropTypes.number,
    folders: PropTypes.any,
    selectedFile: PropTypes.number,
    APIToken: PropTypes.string,
};

Folder.defaultProps = {
    setSideBarVisibility: () => {},
    sideBarVisibile: false,
    isReloading: false,
    onReload: () => {},
    selectedFolder: null,
    folders: [],
    selectedFile: null,
    APIToken: null,
};

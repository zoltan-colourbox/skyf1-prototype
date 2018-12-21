import React from 'react';
import SessionUser from '../../../Globals/SessionUser';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';
import './Folder.scss';

export default class Folder extends React.Component {
    constructor() {
        super();

        this.state = {
            folders: [],
        };

        SessionUser.getFolders()
            .then(folders => this.setState({ folders }))
            .catch((response) => {
                console.error(response);
            });
    }

    render() {
        const { folders } = this.state;
        const folderNames = folders.map(folder => <p key={folder.id}>{folder.name}</p>);

        return (
            <React.Fragment>
                <HeaderBar />
                <div className="folders">
                    <h1>Folders</h1>
                    {folderNames}
                </div>
            </React.Fragment>
        );
    }
}

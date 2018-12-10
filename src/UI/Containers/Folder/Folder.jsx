import React from 'react';
import SessionUser from '../../../Globals/SessionUser';
import './Folder.scss';

export default class Folder extends React.Component {
    constructor() {
        super();

        this.state = {
            folders: [],
        };
    }

    componentDidMount() {
        SessionUser.getFolders()
            .then(folders => this.setState({ folders }));
    }

    render() {
        const { folders } = this.state;
        const folderNames = folders.map(folder => <p>{folder.name}</p>);

        return (
            <div className="folders">
                <h1>Folders</h1>
                {folderNames}
            </div>
        );
    }
}

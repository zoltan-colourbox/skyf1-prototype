import React from 'react';
import HeaderBar from 'Containers/HeaderBar/HeaderBar';
import Content from 'Components/Content/Content';
import './Folder.scss';

export default class Folder extends React.Component {
    render() {
        return (
            <React.Fragment>
                <HeaderBar />
                <Content />
            </React.Fragment>
        );
    }
}

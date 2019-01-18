import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Styles from './SideBar.scss';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.container = React.createRef();
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
        if (!(this.container.current && this.container.current.contains(event.target))) {
            const { onClose } = this.props;
            onClose();
        }
    }

    onDocumentClick(event) {
        if (this.container.current && this.container.current.contains(event.target)) {
            setTimeout(() => {
                if (this.container.current) {
                    const { onClose } = this.props;
                    onClose();
                }
            }, 100);
        }
    }

    render() {
        const { visible } = this.props;
        return (
            <React.Fragment>
                <div ref={this.container} className={[Styles.Container, visible ? Styles.Visible : null].join(' ')}>
                    1
                </div>
                {
                    ReactDOM.createPortal((
                        <div className={[Styles.Overlay, visible ? Styles.Visible : null].join(' ')} />
                    ), document.body)
                }
            </React.Fragment>
        );
    }
}

SideBar.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createAPI } from 'Factories/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './FilePreview.scss';

class FilePreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgUrl: null,
            loading: true,
        };

        this.close = this.close.bind(this);
    }

    componentDidMount() {
        this.getPreviewUrl();
    }

    componentDidUpdate() {
        this.getPreviewUrl();
    }

    getPreviewUrl() {
        const { mediaId, APIToken } = this.props;
        createAPI(APIToken)
            .mediaImage(mediaId)
            .then((json) => {
                console.log(json);
            });
    }

    close() {
        const { history } = this.props; // eslint-disable-line react/prop-types
        history.goBack();
    }

    render() {
        const { imgUrl, loading } = this.state;

        return ReactDOM.createPortal((
            <div className={Styles.Container}>
                <button type="button" className={Styles.Close} onClick={this.close}>
                    <FontAwesomeIcon icon="times" />
                </button>
                {loading ? <FontAwesomeIcon icon="sync-alt" className={Styles.LoadingIcon} /> : <div className={Styles.PopUp} style={{ backgroundImage: `url('${imgUrl}')` }} />}
            </div>
        ), document.body);
    }
}

FilePreview.propTypes = {
    mediaId: PropTypes.number,
    APIToken: PropTypes.string,
};

FilePreview.defaultProps = {
    mediaId: null,
    APIToken: null,
};

export default withRouter(FilePreview);

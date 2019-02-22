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
        };

        this.close = this.close.bind(this);
    }

    componentDidMount() {
        this.getPreviewUrl();
    }

    getPreviewUrl() {
        const { mediaId, APIToken } = this.props;
        createAPI(APIToken)
            .mediaImage(mediaId)
            .then(response => response.body)
            .then((body) => {
                const reader = body.getReader();
                return new ReadableStream({
                    start(controller) {
                        function pump() {
                            return reader.read().then(({ done, value }) => {
                                // When no more data needs to be consumed, close the stream
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                // Enqueue the next data chunk into our target stream
                                controller.enqueue(value);
                                return pump(); // eslint-disable-line consistent-return
                            });
                        }
                        return pump();
                    },
                });
            })
            .then(stream => new Response(stream))
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob))
            .then((imgUrl) => {
                this.setState({ imgUrl });
            });
    }

    close() {
        const { history } = this.props; // eslint-disable-line react/prop-types
        history.goBack();
    }

    render() {
        const { imgUrl } = this.state;

        return ReactDOM.createPortal((
            <div className={Styles.Container}>
                <button type="button" className={Styles.Close} onClick={this.close}>
                    <FontAwesomeIcon icon="times" />
                </button>
                {!imgUrl ? <FontAwesomeIcon icon="sync-alt" className={Styles.LoadingIcon} /> : <div className={Styles.PopUp} style={{ backgroundImage: `url('${imgUrl}')` }} />}
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

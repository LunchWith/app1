import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../actions/card';


class CardWriteView extends React.Component {
    static propTypes = {
        actions: PropTypes.shape({
            cardPost: PropTypes.func.isRequired
        }).isRequired,
    }

    constructor(props) {
        super(props),

        this.state = {
            contents: '',
            videoid: '',
            imageName: 'image',
            imageFile: null,
        };
    }

    handleChange = (e) => {
        this.setState({
            contents: e.target.value
        });
    }

    handleChangeVideo = (e) => {
        this.setState({
            videoid: e.target.value
        });
    }

    handleChangeImage = (e) => {
        this.setState({
            imageFile: e.target.files[0],
            imageName: e.target.files[0].name
        });
    }

    handleClickImage = () => {
        document.getElementsByClassName('imageUpload')[0].click();
    }

    handlePost = () => {
        const contents = this.state.contents;
        const videoid = this.state.videoid;
        const imageFile = this.state.imageFile;

        this.props.actions.cardPost(contents, videoid, imageFile);
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="form">
                            <div className="form-group">
                                <textarea className="form-control"
                                    placeholder="Write down your memo"
                                    rows="4"
                                    value={this.state.contents}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <span className="glyphicon glyphicon-facetime-video" />
                                </div>
                                <input className="form-control input-sm"
                                    type="text"
                                    placeholder="Youtube video-ID"
                                    value={this.state.videoid}
                                    onChange={this.handleChangeVideo}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-xs-5">
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <a onClick={this.handleClickImage}>
                                            <i className="glyphicon glyphicon-picture" />
                                        </a>
                                    </div>
                                    <input className="form-control input-md"
                                        type="text"
                                        placeholder={this.state.imageName}
                                        disabled
                                    />
                                    <div className="hide">
                                        <input className="imageUpload"
                                            type="file"
                                            onChange={this.handleChangeImage}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-7">
                                <button className="btn btn-primary"
                                    type="button"
                                    onClick={this.handlePost}
                                >POST</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(null, mapDispatchToProps)(CardWriteView);
export { CardWriteView as CardWriteViewNotConnected };

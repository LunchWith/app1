import React from 'react';
import PropTypes from 'prop-types';
import Video from './video';
import Image from './image';
// import TimeAgo from 'react-timeago';


class Card extends React.Component {
    static propTypes = {
        card: PropTypes.shape({
            username: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            imagePath: PropTypes.string,
            videoid: PropTypes.string,
        }).isRequired,
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.props.card.username}
                    </div>
                    {/* <small className="text-right">
                        <TimeAgo date={data.create_at} />
                    </small> */}
                    <div className="modal-body">
                        {this.props.card.imagePath ? <Image imagePath={this.props.card.imagePath} /> : undefined}
                        {this.props.card.videoid ? <Video videoid={this.props.card.videoid} /> : undefined}
                        <div className="self-card-contents">
                            {this.props.card.contents}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="row">
                            <div className="col-xs-5 text-left">
                                reply
                            </div>
                            <div className="col-xs-7">
                                <button className="btn btn-danger btn-lg"
                                    type="button"
                                    // onClick={this.handlePost}
                                >Purchase</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Card;

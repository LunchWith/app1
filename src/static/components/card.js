import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

import Video from './video';
import Image from './image';
import ReplyHomeView from '../containers/SubContainers/replyHome';


class Card extends React.Component {
    static propTypes = {
        card: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            imagePath: PropTypes.string,
            videoid: PropTypes.string,
            create_at: PropTypes.string.isRequired,
            topBidder: PropTypes.shape({
            }),
        }).isRequired,
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="row">
                            <div className="col-xs-6">
                                <i className="glyphicon glyphicon-user" />&nbsp;
                                <strong>{this.props.card.username}</strong>
                            </div>
                            <div className="col-xs-6 text-right">
                                <small>
                                    <TimeAgo date={this.props.card.create_at} />
                                </small>&nbsp;&nbsp;
                                <i className="glyphicon glyphicon-time" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        {this.props.card.imagePath ? <Image imagePath={this.props.card.imagePath} /> : undefined}
                        {this.props.card.videoid ? <Video videoid={this.props.card.videoid} /> : undefined}
                        <div className="self-card-contents">
                            {this.props.card.contents}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <ReplyHomeView topBidder={this.props.card.topBidder}
                            cardId={this.props.card.id}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Card;

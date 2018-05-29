import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import Video from './video';
import Image from './image';
import ReplyListView from '../containers/ReplyList/index';
import ReplyWriteView from '../containers/ReplyWrite/index';


class Card extends React.Component {
    static propTypes = {
        card: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            imagePath: PropTypes.string,
            videoid: PropTypes.string,
            create_at: PropTypes.string.isRequired,
        }).isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="row">
                            <div className="col-xs-6">
                                <i className="glyphicon glyphicon-user" />&nbsp;
                                {this.props.card.username}
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
                        <ReplyListView cardId={this.props.card.id} key={this.props.card.id} />
                        {this.props.isAuthenticated ?
                            <ReplyWriteView form={'replyWriteViewForm_'.concat(this.props.card.id)}
                                cardId={this.props.card.id}
                            />
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
    };
};


export default connect(mapStateToProps, null)(Card);
export { Card as CardNotConnected };

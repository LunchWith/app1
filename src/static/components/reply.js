import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';


class Reply extends React.Component {
    static propTypes = {
        reply: PropTypes.shape({
            username: PropTypes.string.isRequired,
            bid_price: PropTypes.number.isRequired,
            contents: PropTypes.string.isRequired,
            create_at: PropTypes.string.isRequired,
        }).isRequired,
    }

    render() {
        return (
            <div className="reply">
                <div className="row">
                    <div className="col-xs-5 text-left reply-sub">
                        <i className="glyphicon glyphicon-user" />&nbsp;
                        <strong>{this.props.reply.username}</strong>
                    </div>
                    <div className="col-xs-4 text-left">
                        <small>
                            <i className="glyphicon glyphicon-heart text-primary" />
                        </small>&nbsp;&nbsp;&nbsp;
                        <span className="text-danger">$ {this.props.reply.bid_price}</span>
                    </div>
                    <div className="col-xs-3 text-center reply-sub">
                        <TimeAgo date={this.props.reply.create_at} />
                    </div>
                </div>
                <div className="text-left reply-sub">
                    {this.props.reply.contents}
                </div>
            </div>
        );
    }
}


export default Reply;

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
                    <div className="col-xs-4 text-left reply-sub">
                        <strong>{this.props.reply.username}</strong>
                    </div>
                    <div className="col-xs-5 text-left">
                        <h4 className="text-danger">$ {this.props.reply.bid_price}</h4>
                    </div>
                    <div className="col-xs-3 text-center reply-sub">
                        <TimeAgo date={this.props.reply.create_at} />
                    </div>
                </div>
                <div className="text-left reply-sub">
                    {this.props.reply.contents}
                </div>
                <div className="text-center reply-btn">
                    ▼
                </div>
            </div>

        );
    }
}


export default Reply;

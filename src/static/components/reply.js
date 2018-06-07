import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

import addComma from '../utils/addComma';


class Reply extends React.Component {
    static propTypes = {
        reply: PropTypes.shape({
            username: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            bidPrice: PropTypes.number.isRequired,
            createAt: PropTypes.string.isRequired,
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
                        <span className="text-danger">$ {addComma(this.props.reply.bidPrice)}</span>
                    </div>
                    <div className="col-xs-3 text-center reply-sub">
                        <TimeAgo date={this.props.reply.createAt} />
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

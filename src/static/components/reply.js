import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';


class Reply extends React.Component {
    static propTypes = {
        reply: PropTypes.shape({
            username: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            create_at: PropTypes.string.isRequired,
        }).isRequired,
    }

    render() {
        return (
            <div className="row reply">
                <div className="col-xs-4 text-left">
                    {this.props.reply.username}
                </div>
                <div className="col-xs-5 text-left">
                    {this.props.reply.contents}
                </div>
                <div className="col-xs-3 text-center">
                    <TimeAgo date={this.props.reply.create_at} />
                </div>
            </div>
        );
    }
}


export default Reply;

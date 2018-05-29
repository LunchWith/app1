import React from 'react';
import PropTypes from 'prop-types';


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
            <div className="row">
                <div className="col-xs-4 text-center">
                    {this.props.reply.username}
                </div>
                <div className="col-xs-5 text-right">
                    {this.props.reply.contents}
                </div>
                <div className="col-xs-3 text-center">
                    {this.props.reply.create_at}
                </div>
            </div>
        );
    }
}


export default Reply;

import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import moment from 'moment';

import Video from './video';
import Image from './image';
import ReplyHomeView from '../containers/SubContainers/replyHome';


class Card extends React.Component {
    static propTypes = {
        card: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            videoName: PropTypes.string,
            imagePath: PropTypes.string,
            deadline: PropTypes.string.isRequired,
            createAt: PropTypes.string.isRequired,
            topBidder: PropTypes.shape({
            }),
        }).isRequired,
        index: PropTypes.number.isRequired,
    }

    constructor() {
        super();

        this.state = {
            diffMinutes: undefined,
            diffSeconds: undefined,
        };
    }

    componentDidMount() {
        // show deadline every second
        setInterval(() => {
            const now = moment().utc();
            const deadline = moment(this.props.card.deadline).utc();

            const diffTime = moment.duration(deadline.diff(now));
            const diffMinutes = diffTime.minutes();
            const diffSeconds = diffTime.seconds();

            this.setState({
                diffMinutes,
                diffSeconds,
            });
        }, 1000);
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
                                    <TimeAgo date={this.props.card.createAt} />
                                </small>&nbsp;&nbsp;
                                <i className="glyphicon glyphicon-time" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="self-card-deadline">
                            <h3 className="text-danger text-right">
                                {this.state.diffMinutes >= 0 && this.state.diffSeconds >= 0 ?
                                    `${this.state.diffMinutes} : ${this.state.diffSeconds}`
                                    :
                                    undefined
                                }
                            </h3>
                        </div>
                        {this.props.card.imagePath ?
                            <Image imagePath={this.props.card.imagePath} />
                            :
                            undefined
                        }
                        {this.props.card.videoName ?
                            <Video videoName={this.props.card.videoName} />
                            :
                            undefined
                        }
                        <div className="self-card-contents">
                            {this.props.card.contents}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <ReplyHomeView topBidder={this.props.card.topBidder}
                            cardId={this.props.card.id}
                            index={this.props.index}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Card;

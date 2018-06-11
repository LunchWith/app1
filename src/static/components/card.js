import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import moment from 'moment';

import Video from './video';
import Image from './image';
import ReplyHomeView from '../containers/SubContainers/replyHome';
import GoogleMapSearchBox from './googleMapSearchBox';

import showTime from '../utils/showTime';


class Card extends React.Component {
    static propTypes = {
        card: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            contents: PropTypes.string.isRequired,
            videoName: PropTypes.string,
            imagePath: PropTypes.string,
            meetAt: PropTypes.string.isRequired,
            deadlineAt: PropTypes.string.isRequired,
            createAt: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
            topBidder: PropTypes.shape({
            }),
        }).isRequired,
        index: PropTypes.number.isRequired,
    }

    constructor() {
        super();

        this.state = {
            showDeadLine: ''
        };
    }

    componentDidMount() {
        // show deadline every second
        setInterval(() => {
            const now = moment().utc();
            const deadlineAt = moment(this.props.card.deadlineAt).utc();
            const diffTime = moment.duration(deadlineAt.diff(now));

            let showDeadLine = '';
            if (diffTime.years() >= 1) {
                showDeadLine = `${diffTime.years()} YEAR`;
            } else if (diffTime.months() >= 1) {
                showDeadLine = `${diffTime.months()} MONTH`;
            } else if (diffTime.days() >= 1) {
                showDeadLine = `${diffTime.days()} DAY`;
            } else if (diffTime.hours() >= 1) {
                showDeadLine = `${diffTime.hours()} HOUR`;
            } else if (diffTime.minutes() >= 0 && diffTime.seconds() >= 0) {
                showDeadLine = `${showTime(diffTime.minutes())} : ${showTime(diffTime.seconds())}`;
            } else if (diffTime.minutes() < 0 || diffTime.seconds() < 0) {
                showDeadLine = 'CLOSED';
            } else {
                showDeadLine = '';
            }

            this.setState({
                showDeadLine,
            });
        }, 1000);
    }

    handleClickMap = () => {
        this.setState({
            mapToggle: !this.state.mapToggle
        });
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
                                <i className="glyphicon glyphicon-time self-timer" />
                            </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="self-card-deadline">
                            <h4 className="text-danger text-right">
                                {this.state.showDeadLine}
                            </h4>
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
                        {this.state.mapToggle && this.props.card.location !== '' ?
                            <div className="self-card-map">
                                <GoogleMapSearchBox disabled="disabled"
                                    location={this.props.card.location}
                                    lat={this.props.card.lat}
                                    lng={this.props.card.lng}
                                />
                                <p className="text-right">{this.props.card.location}</p>
                            </div>
                            :
                            undefined
                        }
                        <div className="text-right">
                            Meet: {moment(this.props.card.meetAt).format('MM/DD/YYYY HH:MM')}&nbsp;&nbsp;
                            <a onClick={this.handleClickMap} className="self-mapToggle">
                                {this.state.mapToggle ?
                                    <i className="glyphicon glyphicon-collapse-up" />
                                    :
                                    <i className="glyphicon glyphicon-collapse-down" />
                                }
                            </a>
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

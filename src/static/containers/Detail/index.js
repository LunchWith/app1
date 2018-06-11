import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import moment from 'moment';
import { connect } from 'react-redux';

import Video from '../../components/video';
import Image from '../../components/image';
import GoogleMapSearchBox from '../../components/googleMapSearchBox';

import showTime from '../../utils/showTime';


class DetailView extends React.Component {
    static propTypes = {
        detail: PropTypes.shape({
            username: PropTypes.string.isRequired,
            createAt: PropTypes.string.isRequired,
            deadlineAt: PropTypes.string.isRequired,
            imagePath: PropTypes.string,
            videoName: PropTypes.string,
            contents: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
            meetAt: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor() {
        super();

        this.state = {
            showDeadLine: ''
        };
    }

    componentDidMount() {
        // show deadline every second
        this.deadlineTicking = setInterval(() => {
            const now = moment().utc();
            const deadlineAt = moment(this.props.detail.deadlineAt).utc();
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

    componentWillUnmount() {
        clearInterval(this.deadlineTicking);
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="row">
                            <div className="col-xs-6">
                                <i className="glyphicon glyphicon-user" />&nbsp;
                                <strong>{this.props.detail.username}</strong>
                            </div>
                            <div className="col-xs-6 text-right">
                                <small>
                                    <TimeAgo date={this.props.detail.createAt} />
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
                        {this.props.detail.imagePath ?
                            <Image imagePath={this.props.detail.imagePath} />
                            :
                            undefined
                        }
                        {this.props.detail.videoName ?
                            <Video videoName={this.props.detail.videoName} />
                            :
                            undefined
                        }
                        <div className="self-card-contents">
                            {this.props.detail.contents}
                        </div>
                        {this.props.detail.location !== '' ?
                            <div className="self-card-map">
                                <GoogleMapSearchBox disabled="disabled"
                                    location={this.props.detail.location}
                                    lat={this.props.detail.lat}
                                    lng={this.props.detail.lng}
                                />
                                <p className="text-right">{this.props.detail.location}</p>
                            </div>
                            :
                            undefined
                        }
                        <div className="text-right">
                            Meet: {moment(this.props.detail.meetAt).format('MM/DD/YYYY HH:MM')}
                        </div>
                    </div>
                    <div className="modal-footer">
                        {/* <ReplyHomeView topBidder={this.props.detail.topBidder}
                            cardId={this.props.detail.id}
                            index={this.props.index}
                        /> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        detail: state.routing.location.state,
    };
};


export default connect(mapStateToProps, null)(DetailView);
export { DetailView as DetailViewNotConnected };

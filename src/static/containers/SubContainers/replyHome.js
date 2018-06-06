import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReplyListView from './replyList';
import ReplyWriteView from './replyWrite';
import * as actionCreators from '../../actions/reply';


class ReplyHomeView extends React.Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        cardId: PropTypes.number.isRequired,
        topBidder: PropTypes.shape({
            username: PropTypes.string,
            contents: PropTypes.string,
            bidPrice: PropTypes.number,
            createAt: PropTypes.string,
            nextBidder: PropTypes.number,
        }),
        isAuthenticated: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        topBidder: null
    }


    render() {
        const showTopBidder = (topBidder) => {
            return (
                <div>
                    <div className="row">
                        <div className="col-xs-5 text-left">
                            <i className="glyphicon glyphicon-user" />&nbsp;
                            <strong>{topBidder.username}</strong>
                        </div>
                        <div className="col-xs-4 text-left">
                            <h4 className="text-danger">
                                <small>
                                    <i className="glyphicon glyphicon-heart text-primary" />
                                </small>&nbsp;
                                $ {topBidder.bidPrice}
                            </h4>
                        </div>
                        <div className="col-xs-3 text-center">
                            <TimeAgo date={topBidder.createAt} />
                        </div>
                    </div>
                    <div className="text-left">
                        {topBidder.contents}
                    </div>
                </div>
            );
        };

        return (
            <div>
                {this.props.topBidder ?
                    <div>
                        {showTopBidder(this.props.topBidder)}
                    </div>
                    :
                    undefined
                }
                {/* should validate topBidder before topBidder.nextBidder */}
                <ReplyListView cardId={this.props.cardId}
                    nextBidder={this.props.topBidder && this.props.topBidder.nextBidder}
                />
                {this.props.isAuthenticated ?
                    <div className="reply">
                        <ReplyWriteView form={'replyWriteViewForm_'.concat(this.props.cardId)}
                            cardId={this.props.cardId}
                            index={this.props.index}
                        />
                    </div>
                    :
                    undefined
                }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dataSet: state.card.dataSet,
        isAuthenticated: state.auth.isAuthenticated,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReplyHomeView);
export { ReplyHomeView as ReplyHomeViewNotConnected };


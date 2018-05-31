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
        cardId: PropTypes.number.isRequired,
        topBidder: PropTypes.shape({
            username: PropTypes.string.isRequired,
            bid_price: PropTypes.number.isRequired,
            contents: PropTypes.string.isRequired,
            create_at: PropTypes.string.isRequired,
            nextUser: PropTypes.number,
        }).isRequired,
        actions: PropTypes.shape({
            replyList: PropTypes.func.isRequired
        }).isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
    }

    handleClick = () => {
        this.props.actions.replyList(this.props.cardId);
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
                                $ {topBidder.bid_price}
                            </h4>
                        </div>
                        <div className="col-xs-3 text-center">
                            <TimeAgo date={topBidder.create_at} />
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
                {/* validate topBidder before topBidder.nextUser */}
                {this.props.topBidder && this.props.topBidder.nextUser ?
                    <div className="text-center reply">
                        {this.props['dataSet_'.concat(this.props.cardId)] ?
                            <ReplyListView cardId={this.props.cardId}
                                replySet={this.props['dataSet_'.concat(this.props.cardId)]}
                            />
                            : undefined
                        }
                        <a className="reply-btn" onClick={this.handleClick}>▼</a>
                    </div>
                    :
                    undefined
                }
                {this.props.isAuthenticated ?
                    (<div className="reply">
                        <ReplyWriteView form={'replyWriteViewForm_'.concat(this.props.cardId)}
                            cardId={this.props.cardId}
                        />
                    </div>
                    )
                    :
                    undefined
                }
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        ['dataSet_'.concat(ownProps.cardId)]: state.reply['dataSet_'.concat(ownProps.cardId)],
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
export { ReplyHomeView as ReplyNotConnected };


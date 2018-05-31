import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


// import ReplyListView from '../containers/SubContainers/replyList';
import ReplyWriteView from '../containers/SubContainers/replyWrite';
import * as actionCreators from '../actions/reply';


class Reply extends React.Component {
    static propTypes = {
        cardId: PropTypes.number.isRequired,
        topBidder: PropTypes.shape({
            username: PropTypes.string.isRequired,
            bid_price: PropTypes.number.isRequired,
            contents: PropTypes.string.isRequired,
            create_at: PropTypes.string.isRequired,
            nextUser: PropTypes.number,
        }).isRequired,
        dataSet: PropTypes.shape({
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
        console.log(this.props.dataSet);
        const showTopBidder = (topBidder) => {
            return (
                <div>
                    <div className="row">
                        <div className="col-xs-4 text-left">
                            <strong>{topBidder.username}</strong>
                        </div>
                        <div className="col-xs-5 text-left">
                            <h4 className="text-danger">$ {topBidder.bid_price}</h4>
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

        const items = (dataSet) => {
            return dataSet.map((reply, i) => {
                return (
                    <div className="reply">
                        <div className="row">
                            <div className="col-xs-4 text-left reply-sub">
                                <strong>{reply.username}</strong>
                            </div>
                            <div className="col-xs-5 text-left">
                                <p className="text-danger">$ {reply.bid_price}</p>
                            </div>
                            <div className="col-xs-3 text-center reply-sub">
                                <TimeAgo date={reply.create_at} />
                            </div>
                        </div>
                        <div className="text-left reply-sub">
                            {reply.contents}
                        </div>
                    </div>
                );
            });
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
                        {this.props.dataSet ? <div>{items(this.props.dataSet)}</div> : undefined}
                        <a className="reply-btn" onClick={this.handleClick}>▼</a>
                    </div>
                    // <ReplyListView cardId={this.props.cardId} key={this.props.cardId} />
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


const mapStateToProps = (state) => {
    return {
        dataSet: state.reply.dataSet,
        isAuthenticated: state.auth.isAuthenticated,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Reply);
export { Reply as ReplyNotConnected };


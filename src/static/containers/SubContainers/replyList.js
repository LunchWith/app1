import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Reply from '../../components/reply';
import * as actionCreators from '../../actions/reply';


class ReplyListView extends React.Component {
    static propTypes = {
        cardId: PropTypes.number.isRequired,
        actions: PropTypes.shape({
            replyList: PropTypes.func.isRequired
        }).isRequired,
    }

    handleClick = () => {
        const replyDataSet = 'replyDataSet_'.concat(this.props.cardId);
        const startPage = 'startPage_'.concat(this.props.cardId);

        this.props.actions.replyList(
            this.props[replyDataSet],
            this.props.cardId,
            this.props[startPage] ? this.props[startPage] : 1,
        );
    }

    render() {
        const items = (replyDataSet) => {
            return replyDataSet.map((reply, i) => {
                return <Reply key={reply.id} reply={reply} />;
            });
        };

        const replyListDownBtn = () => {
            return (
                <div className="text-center reply">
                    <a className="reply-btn" onClick={this.handleClick}>▼</a>
                </div>
            );
        };

        const replyDataSet = 'replyDataSet_'.concat(this.props.cardId);
        const nextBidder = 'nextBidder_'.concat(this.props.cardId);
        return (
            <div>
                {this.props[replyDataSet] ? items(this.props[replyDataSet]) : undefined}
                {this.props[nextBidder] ? replyListDownBtn() : undefined}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const replyDataSet = 'replyDataSet_'.concat(ownProps.cardId);
    const nextBidder = 'nextBidder_'.concat(ownProps.cardId);
    const startPage = 'startPage_'.concat(ownProps.cardId);

    let stateReplyNextBidder = false;
    if (state.reply[nextBidder] === undefined) { // undefined is initial props
        stateReplyNextBidder = ownProps.nextBidder;
    } else if (state.reply[nextBidder] === true) { // true or false are next props
        stateReplyNextBidder = state.reply[nextBidder];
    }

    return {
        [replyDataSet]: state.reply[replyDataSet],
        [nextBidder]: stateReplyNextBidder,
        [startPage]: state.reply[startPage],
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ReplyListView);
export { ReplyListView as ReplyListViewNotConnected };

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Reply from '../../components/reply';
import * as actionCreators from '../../actions/reply';


class ReplyListView extends React.Component {
    static propTypes = {
        cardId: PropTypes.number.isRequired,
        nextBidder: PropTypes.number,
        actions: PropTypes.shape({
            replyList: PropTypes.func.isRequired
        }).isRequired,
    }

    static defaultProps = {
        nextBidder: undefined,
    }

    handleClick = () => {
        this.props.actions.replyList(this.props.cardId);
    }

    render() {
        const items = (replyDataSet) => {
            return replyDataSet.map((reply, i) => {
                return <Reply key={reply.id} reply={reply} />;
            });
        };

        const replyBtn = () => {
            return (
                <div className="text-center reply">
                    <a className="reply-btn" onClick={this.handleClick}>▼</a>
                </div>
            );
        };

        const replyBtnInitial = () => {
            return (
                this.props['replyDataSet_'.concat(this.props.cardId)] === undefined &&
                    this.props.nextBidder ?
                    replyBtn()
                    :
                    undefined
            );
        };

        return (
            <div>
                {this.props['replyDataSet_'.concat(this.props.cardId)] ?
                    items(this.props['replyDataSet_'.concat(this.props.cardId)])
                    :
                    undefined
                }
                {this.props['nextBidder_'.concat(this.props.cardId)] ?
                    replyBtn()
                    :
                    replyBtnInitial()
                }
            </div>


        );
    }
}


const mapStateToProps = (state, ownProps) => {
    let nextBidder = ownProps.nextBidder;
    const nextBidderId = 'nextBidder_'.concat(ownProps.cardId);

    if (state.reply[nextBidderId] !== undefined) {
        nextBidder = state.reply[nextBidderId];
    }
    return {
        ['replyDataSet_'.concat(ownProps.cardId)]: state.reply['replyDataSet_'.concat(ownProps.cardId)],
        [nextBidderId]: nextBidder,
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

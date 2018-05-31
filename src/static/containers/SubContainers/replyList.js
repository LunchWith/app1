import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Reply from '../../components/reply';
import * as actionCreators from '../../actions/reply';


class ReplyListView extends React.Component {
    static propTypes = {
        replySet: PropTypes.shape({
        }).isRequired,
    }

    render() {
        const items = (replySet) => {
            return replySet.map((reply, i) => {
                return <Reply key={reply.id} reply={reply} />;
            });
        };

        return (
            <div>
                {items(this.props.replySet)}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        ['dataSet_'.concat(ownProps.cardId)]: state.reply['dataSet_'.concat(ownProps.cardId)]
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

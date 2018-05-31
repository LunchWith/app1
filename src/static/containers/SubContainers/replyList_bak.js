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

    static defaultProps = {
        dataSet: [],
    }

    componentWillMount() {
        this.props.actions.replyList(this.props.cardId);
    }

    render() {
        const items = (dataSet) => {
            return dataSet.map((reply, i) => {
                return <Reply key={reply.id} reply={reply} />;
            });
        };

        return (
            this.props['dataSet_'.concat(this.props.cardId)] !== undefined ?
                (<div>{items(this.props['dataSet_'.concat(this.props.cardId)])}</div>)
                : null
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

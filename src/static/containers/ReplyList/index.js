import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../actions/reply';
import Reply from '../../components/reply';


class ReplyListView extends React.Component {
    static propTypes = {
        cardId: PropTypes.number.isRequired,
        dataSet: PropTypes.arrayOf(
            PropTypes.shape({
                username: PropTypes.string.isRequired,
                contents: PropTypes.string.isRequired,
                create_at: PropTypes.string.isRequired,
            })
        ),
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
        console.log(this.props.cardId);
        console.log(this.props.dataSet);
        // const items = (dataSet) => {
        //     return dataSet.map((reply, i) => {
        //         return <Reply key={reply.id} reply={reply} />;
        //     });
        // };

        return (
            <div>asdf</div>
            // this.props.dataSet.length !== 0 ?
            //     (<div>{items(this.props.dataSet)}</div>)
            //     : null
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dataSet: state.reply.dataSet,
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

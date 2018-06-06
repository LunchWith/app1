import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as actionReplyCreators from '../../actions/reply';
import * as actionCardCreators from '../../actions/card';


const FIELDS_BIDPRICE = {
    bidPrice: {
        tag: 'input',
        type: 'text',
        className: 'form-control text-right',
        placeholder: '$ 100.00',
    },
};

const FIELDS_REPLY = {
    contents: {
        tag: 'input',
        type: 'text',
        className: 'form-control text-center',
        placeholder: 'Write down your bid-messages',
    },
};

class ReplyWriteView extends React.Component {
    static propTypes = {
        dataSet: PropTypes.arrayOf(
            PropTypes.shape({
            }).isRequired,
        ).isRequired,
        index: PropTypes.number.isRequired,
        cardId: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        fields: PropTypes.shape({
        }).isRequired,
        actionReplys: PropTypes.shape({
            replyPost: PropTypes.func.isRequired,
        }).isRequired,
        actionCards: PropTypes.shape({
            cardList: PropTypes.func.isRequired,
            cardChange: PropTypes.func.isRequired,
        }).isRequired,
        username: PropTypes.string.isRequired,
    }

    onSubmit = (values) => {
        const dataSet = this.props.dataSet;
        const index = this.props.index;
        const cardId = this.props.cardId;
        const bidPrice = values.bidPrice;
        const contents = values.contents;

        this.props.actionReplys.replyPost(
            cardId,
            bidPrice,
            contents
        ).then(() => {
            this.props.actionCards.cardChange(dataSet, index);
        });
    }

    renderField = (fieldItems, field) => {
        const fieldHelper = this.props.fields[field];
        const fieldRedColor = fieldHelper.touched && fieldHelper.invalid ? 'has-error text-danger' : '';
        return (
            <div className={`form-group ${fieldRedColor}`} key={field}>
                <fieldItems.tag className={fieldItems.className}
                    type={fieldItems.type}
                    placeholder={fieldItems.placeholder}
                    rows={fieldItems.rows}
                    disabled={fieldItems.disabled}
                    {...fieldHelper}
                />
                <div className="text-help">
                    {fieldHelper.touched ? fieldHelper.error : ''}
                </div>
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="row">
                    <div className="col-xs-5 text-left reply-sub">
                        <i className="glyphicon glyphicon-user" />&nbsp;
                        <strong>
                            {this.props.username}
                        </strong>
                    </div>
                    <div className="col-xs-4 text-left">
                        {_.map(FIELDS_BIDPRICE, this.renderField)}
                    </div>
                    <div className="col-xs-3 text-center">
                        <button className="btn btn-danger btn-md"
                            type="submit"
                        >Purchase</button>
                    </div>
                </div>
                <div>
                    {_.map(FIELDS_REPLY, this.renderField)}
                </div>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    _.each(FIELDS_BIDPRICE, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter the ${field}`;
        }
    });
    return errors;
}


const mapStateToProps = (state) => {
    return {
        username: state.auth.userFirstName + state.auth.userLastName,
        dataSet: state.card.dataSet,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actionReplys: bindActionCreators(actionReplyCreators, dispatch),
        actionCards: bindActionCreators(actionCardCreators, dispatch),
    };
};


export default reduxForm({
    form: 'ReplyWriteViewForm',
    fields: _.keys(FIELDS_BIDPRICE).concat(_.keys(FIELDS_REPLY)),
    validate,
})(connect(mapStateToProps, mapDispatchToProps)(ReplyWriteView));
export { ReplyWriteView as ReplyWriteViewNotConnected };

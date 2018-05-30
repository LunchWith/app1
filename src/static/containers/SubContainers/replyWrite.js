import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import * as actionCreators from '../../actions/reply';


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
        cardId: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        fields: PropTypes.shape({
        }).isRequired,
        actions: PropTypes.shape({
            replyPost: PropTypes.func.isRequired,
        }).isRequired,
        userFirstName: PropTypes.string.isRequired,
        userLastName: PropTypes.string.isRequired,
    }

    onSubmit = (values) => {
        const cardId = this.props.cardId;
        const bidPrice = values.bidPrice;
        const contents = values.contents;

        this.props.actions.replyPost(cardId, bidPrice, contents);
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
                    <div className="col-xs-4 text-left reply-sub">
                        <strong>
                            {this.props.userFirstName}
                            {this.props.userLastName}
                        </strong>
                    </div>
                    <div className="col-xs-5 text-left">
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
        userFirstName: state.auth.userFirstName,
        userLastName: state.auth.userLastName,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch),
    };
};


export default reduxForm({
    form: 'ReplyWriteViewForm',
    fields: _.keys(FIELDS_BIDPRICE).concat(_.keys(FIELDS_REPLY)),
    validate,
})(connect(mapStateToProps, mapDispatchToProps)(ReplyWriteView));
export { ReplyWriteView as ReplyWriteViewNotConnected };

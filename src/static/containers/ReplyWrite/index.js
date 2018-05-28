import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import * as actionCreators from '../../actions/reply';


const FIELDS = {
    contents: {
        tag: 'input',
        type: 'text',
        className: 'form-control',
        placeholder: 'Write down your bid-message',
    },
};

class ReplyWriteView extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        fields: PropTypes.shape.isRequired,
        actions: PropTypes.shape({
            replyPost: PropTypes.func.isRequired,
        }).isRequired,
        userFirstName: PropTypes.string.isRequired,
        userLastName: PropTypes.string.isRequired,
    }

    onSubmit = (values) => {
        const contents = values.contents;

        this.props.actions.replyPost(contents).then({
        });
    }

    renderField = (fieldItems, field) => {
        const fieldHelper = this.props.fields[field];
        const fieldRedColor = fieldHelper.touched && fieldHelper.invalid ? 'has-error text-danger' : '';
        return (
            <div className={`form-group ${fieldRedColor}`}>
                <fieldItems.tag className={fieldItems.className}
                    type={fieldItems.type}
                    placeholder={fieldItems.placeholder}
                    rows={fieldItems.rows}
                    disabled={fieldItems.disabled}
                    key={this.props.id}
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
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} key={this.props.id}>
                <div className="row">
                    <div className="col-xs-4 text-center">
                        {this.props.userFirstName}
                        {this.props.userLastName}
                    </div>
                    <div className="col-xs-5 text-right">
                        {_.map(FIELDS, this.renderField)}
                    </div>
                    <div className="col-xs-3 text-center">
                        <button className="btn btn-danger btn-md"
                            type="submit"
                        >Purchase</button>
                    </div>
                </div>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
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
    fields: _.keys(FIELDS),
    validate,
})(connect(mapStateToProps, mapDispatchToProps)(ReplyWriteView));
export { ReplyWriteView as ReplyWriteViewNotConnected };

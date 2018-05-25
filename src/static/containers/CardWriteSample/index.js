import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as actionCreators from '../../actions/cardSample';


const FIELDS = {
    contents: {
        id: 1,
        type: 'textarea',
    },

    title: {
        id: 2,
        type: 'input',
    },

    title3: {
        id: 3,
        type: 'input',
    },
};

class CardPostSampleView extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        fields: PropTypes.shape({
            contents: PropTypes.object.isRequired
        }).isRequired,
        actions: PropTypes.shape({
            cardPostSample: PropTypes.func.isRequired,
        }).isRequired,
    }

    onSubmit = (values) => {
        this.props.actions.cardPostSample(values).then({
            // reset
        });
    }

    renderField = (fieldConfig, field) => {
        const fieldHelper = this.props.fields[field];
        const fieldRedColor = fieldHelper.touched && fieldHelper.invalid ? 'has-error text-danger' : '';

        return (
            <div className={`form-group ${fieldRedColor}`} key={fieldConfig.id}>
                <fieldConfig.type type="text"
                    className="form-control"
                    {...fieldHelper.touched}
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
                {_.map(FIELDS, this.renderField)}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter a ${field}`;
        }
    });

    return errors;
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch),
    };
};


export default reduxForm({
    form: 'CardPostSampleViewForm',
    fields: _.keys(FIELDS),
    validate,
})(connect(null, mapDispatchToProps)(CardPostSampleView));

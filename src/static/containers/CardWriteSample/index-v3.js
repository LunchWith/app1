import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../actions/cardSample';


class CardPostSampleView extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        // fields: PropTypes.shape({
        //     contents: PropTypes.object.isRequired
        // }).isRequired,
        actions: PropTypes.shape({
            cardPostSample: PropTypes.func.isRequired,
        }).isRequired,
    }

    onSubmit = (values) => {
        this.props.actions.cardPostSample(values).then({
            // reset
        });
    }

    renderField = (fields) => {
        const { meta: { touched, error } } = fields;

        return (
            <div className="form-group">
                <span>{fields.label}</span>
                <input className="form-control"
                    type="text"
                    {...fields.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field label="Post Contents"
                    name="contents"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    if (!values.contents) {
        errors.contents = 'Enter contents';
    }
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
    fields: ['contents'],
    validate,
})(connect(null, mapDispatchToProps)(CardPostSampleView));

import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';

import * as actionCreators from '../../actions/cardSample';


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

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className={`form-group ${this.props.fields.contents.touched && this.props.fields.contents.invalid ? 'panel panel-danger' : ''}`} >
                    <span>contents</span>
                    <input type="text" className="form-control" {...this.props.fields.contents} />
                    <div className="text-help">
                        {this.props.fields.contents.touched ? this.props.fields.contents.error : ''}
                    </div>
                </div>
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
    validate
}, null, mapDispatchToProps)(CardPostSampleView);

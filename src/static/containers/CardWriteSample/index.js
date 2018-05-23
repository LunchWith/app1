import React from 'react';
import { reduxForm, reset } from 'redux-form';

import { cardPostSample } from '../../actions/cardSample';


class CardWriteSampleView extends React.Component {
    constructor(props) {
        super(props),

        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(props) {
        this.props.cardPostSample(props).then(() => {
            console.log('stop!!!');
            reset();
        });
    }

    render() {
        const { fields: { contents, videoid }, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <h3>Create A New Card</h3>
                <div className="form-group">
                    <input type="textarea" className={`form-control ${contents.touched && contents.invalid ? 'panel-danger' : ''}`} {...contents} />
                    <div className={`text-help ${contents.touched && contents.invalid ? 'text-danger' : ''}`}>
                        {contents.touched ? contents.error : ''}
                    </div>
                </div>

                <div className="form-group text-danger">
                    <input type="textarea" className="form-control" {...videoid} />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    if (!values.contents) {
        errors.contents = 'Enter the contents';
    }

    return errors;
}


export default reduxForm({
    form: 'CardWriteSampleForm',
    fields: ['contents', 'videoid'],
    validate
}, null, { cardPostSample })(CardWriteSampleView);

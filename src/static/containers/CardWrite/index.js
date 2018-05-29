import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, reset } from 'redux-form';
import _ from 'lodash';


import * as actionCreators from '../../actions/card';


const FIELDS = {
    contents: {
        tag: 'textarea',
        className: 'form-control',
        placeholder: 'Write down your contents',
        rows: 4,
    },
};


const FIELDS_VIDEO = {
    videoid: {
        tag: 'input',
        type: 'text',
        className: 'form-control input-sm',
        placeholder: 'Youtube video-ID'
    },
};


const FIELDS_IMAGE = {
    imageFileName: {
        tag: 'input',
        type: 'text',
        className: 'form-control input-md',
        placeholder: 'Image',
        disabled: 'disabled',
    },

    imageFile: {
        tag: 'input',
        type: 'file',
        className: 'hide',
    },
};


class CardWriteView extends React.Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        fields: PropTypes.shape({
        }).isRequired,
        actions: PropTypes.shape({
            cardPost: PropTypes.func.isRequired,
        }).isRequired,
    }

    onSubmit = (values) => {
        const contents = values.contents;
        const videoid = values.videoid;
        const imageFile = values.imageFile ? values.imageFile[0] : null;
        const imageYN = imageFile ? 1 : 0;

        this.props.actions.cardPost(contents, videoid, imageYN, imageFile).then(
            // reset('CardPostViewForm')
        );
    }

    handleClickImage = () => {
        document.getElementsByClassName('hide')[0].click();
    }

    renderField = (fieldItems, field) => {
        const fieldHelper = this.props.fields[field];
        const fieldRedColor = fieldHelper.touched && fieldHelper.invalid ? 'has-error text-danger' : '';

        const imageObject = document.getElementsByClassName('hide')[0];
        const imageFile = imageObject ? imageObject.value : undefined;
        const imageFileName = imageFile ? imageObject.files[0].name : undefined;

        const placeholder = field === 'imageFileName' && imageFileName ? imageFileName : fieldItems.placeholder;

        return (
            <div className={`form-group ${fieldRedColor}`} key={field}>
                <fieldItems.tag className={fieldItems.className}
                    type={fieldItems.type}
                    placeholder={placeholder}
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
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            {_.map(FIELDS, this.renderField)}
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <span className="glyphicon glyphicon-facetime-video" />
                                </div>
                                {_.map(FIELDS_VIDEO, this.renderField)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <a onClick={this.handleClickImage}>
                                                <i className="glyphicon glyphicon-picture" />
                                            </a>
                                        </div>
                                        {_.map(FIELDS_IMAGE, this.renderField)}
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <button className="btn btn-primary"
                                        type="submit"
                                    >POST</button>
                                </div>
                            </div>
                        </div>
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


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch),
    };
};


export default reduxForm({
    form: 'CardPostViewForm',
    fields: _.keys(FIELDS).concat(_.keys(FIELDS_VIDEO)).concat(_.keys(FIELDS_IMAGE)), // ['contents', 'videoid', ... ]
    validate,
})(connect(null, mapDispatchToProps)(CardWriteView));
export { CardWriteView as CardWriteViewNotConnected };

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import _ from 'lodash';

import * as actionCreators from '../../actions/card';
import GoogleMapSearchBox from '../../components/googleMapSearchBox';


const FIELDS_DEADLINE_DATE = {
    deadlineDate: {
        tag: 'input',
        type: 'date',
        className: 'form-control input-md self-cardwrite-deadline text-center',
    },
};


const FIELDS_DEADLINE_TIME = {
    deadlineTime: {
        tag: 'input',
        type: 'time',
        className: 'form-control input-md self-cardwrite-deadline text-center',
    },
};


const FIELDS_CONTENTS = {
    contents: {
        tag: 'textarea',
        className: 'form-control',
        placeholder: 'Write down your contents',
        rows: 4,
    },
};


const FIELDS_VIDEO = {
    videoName: {
        tag: 'input',
        type: 'text',
        className: 'form-control input-sm',
        placeholder: 'Youtube video-ID'
    },
};


const FIELDS_MEET_DATE = {
    meetDate: {
        tag: 'input',
        type: 'date',
        className: 'form-control input-sm',
    },
};


const FIELDS_MEET_TIME = {
    meetTime: {
        tag: 'input',
        type: 'time',
        className: 'form-control input-sm',
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
            cardList: PropTypes.func.isRequired,
        }).isRequired,
    }

    constructor() {
        super();

        this.state = {
            mapToggle: false
        };
    }

    onSubmit = (values) => {
        const contents = values.contents;
        const videoName = values.videoName;
        const videoYn = !!values.videoName;
        const imageFile = values.imageFile ? values.imageFile[0] : null;
        const imageYN = !!values.imageFile;
        const meetDate = values.meetDate;
        const meetTime = values.meetTime;
        const deadlineDate = values.deadlineDate;
        const deadlineTime = values.deadlineTime;

        const location = document.getElementsByClassName('searchBox')[0].value;
        const lat = document.getElementsByClassName('lat')[0].value;
        const lng = document.getElementsByClassName('lng')[0].value;

        this.props.actions.cardPost(
            contents,
            videoName,
            videoYn,
            imageFile,
            imageYN,
            meetDate,
            meetTime,
            deadlineDate,
            deadlineTime,
            location,
            lat,
            lng
        ).then(() => {
            this.props.actions.cardList();
        });
    }

    handleClickImage = () => {
        document.getElementsByClassName('hide')[0].click();
    }

    handleClickMap = () => {
        this.setState({
            mapToggle: !this.state.mapToggle
        });
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
                            <div className="row">
                                <div className="col-xs-5">
                                    <h4 className="text-danger text-center self-cardwrite-deadlineTitle">▧ DEADLINE</h4>
                                </div>
                                <div className="col-xs-4">
                                    {_.map(FIELDS_DEADLINE_DATE, this.renderField)}
                                </div>
                                <div className="col-xs-3">
                                    {_.map(FIELDS_DEADLINE_TIME, this.renderField)}
                                </div>
                            </div>
                            {_.map(FIELDS_CONTENTS, this.renderField)}
                            <div className="row">
                                <div className="col-xs-7">
                                    <p>▧ Video & Image</p>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <span className="glyphicon glyphicon-facetime-video" />
                                            </div>
                                            {_.map(FIELDS_VIDEO, this.renderField)}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <a onClick={this.handleClickImage}>
                                                    <i className="glyphicon glyphicon-picture" />
                                                </a>
                                            </div>
                                            {_.map(FIELDS_IMAGE, this.renderField)}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-5">
                                    <p> ▧ Meet Date</p>
                                    <div className="form-group self-calender">
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <span className="glyphicon glyphicon-calendar" />
                                            </div>
                                            {_.map(FIELDS_MEET_DATE, this.renderField)}
                                            {_.map(FIELDS_MEET_TIME, this.renderField)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {this.state.mapToggle ?
                                <div className="self-card-map">
                                    <GoogleMapSearchBox />
                                </div>
                                :
                                undefined
                            }
                            <div className="row">
                                <div className="col-xs-5 text-left">
                                    <a onClick={this.handleClickMap} className="self-mapToggle">
                                        {this.state.mapToggle ?
                                            <i className="glyphicon glyphicon-collapse-up" />
                                            :
                                            <i className="glyphicon glyphicon-collapse-down" />
                                        }
                                    </a>
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

    _.each(FIELDS_CONTENTS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter the ${field}`;
        }
    });
    return errors;
}


const mapStateToProps = (state) => {
    return {
        dataSet: state.card.dataSet
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch),
    };
};


export default reduxForm({
    form: 'CardPostViewForm',
    fields: _.keys(FIELDS_DEADLINE_DATE)
        .concat(_.keys(FIELDS_DEADLINE_TIME))
        .concat(_.keys(FIELDS_CONTENTS))
        .concat(_.keys(FIELDS_VIDEO))
        .concat(_.keys(FIELDS_MEET_DATE))
        .concat(_.keys(FIELDS_MEET_TIME))
        .concat(_.keys(FIELDS_IMAGE)), // ['contents', 'videoid', ... ]
    validate,
})(connect(mapStateToProps, mapDispatchToProps)(CardWriteView));
export { CardWriteView as CardWriteViewNotConnected };

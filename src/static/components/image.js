import React from 'react';
import PropTypes from 'prop-types';

import { SERVER_URL } from '../utils/config';


class Image extends React.Component {
    static propTypes = {
        imagePath: PropTypes.string.isRequired,
    }

    render() {
        const imageRoot = `${SERVER_URL}/imageStorage/`;
        const imageSrc = imageRoot + this.props.imagePath;
        const showImage = (
            <img className="self-card-body img-rounded img-responsive" src={imageSrc} alt="" />
        );

        return (
            <div className="self-card-body">
                {this.props.imagePath !== undefined ? showImage : ''}
            </div>
        );
    }
}


export default Image;

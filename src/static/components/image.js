import React from 'react';
import PropTypes from 'prop-types';


class Image extends React.Component {
    static propTypes = {
        imageRoot: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
    }
    
    render() {
        const showImage = (
            <img src={this.state.imageRoot + this.state.imagePath} />
        );

        return (
            <div>
                {this.props.imagePath !== undefined ? showImage : ''}
            </div>

        );
    }
}


export default Image;

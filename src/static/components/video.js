import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';


class Video extends React.Component {
    static propTypes = {
        videoName: PropTypes.string.isRequired,
    }

    onReady = (e) => {
        e.target.pauseVideo();
    }

    render() {
        const opts = {
            height: '100%',
            width: '100%',
            playerVar: {
                autoplay: 1
            }
        };

        const video = (
            <YouTube videoId={this.props.videoName}
                opts={opts}
                onReady={this.onReady}
            />
        );

        return (
            <div className="self-card-body">
                {this.props.videoName !== '' ? video : ''}
            </div>
        );
    }
}


export default Video;

import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';


class Video extends React.Component {
    static propTypes = {
        videoid: PropTypes.string.isRequired,
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
            <YouTube videoId={this.props.videoid}
                opts={opts}
                onReady={this.onReady}
            />
        );

        return (
            <div className="slef-card-body">
                {this.props.videoid !== '' ? video : ''}
            </div>
        );
    }
}


export default Video;

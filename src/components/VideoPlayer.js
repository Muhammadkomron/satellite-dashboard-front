import ReactPlayer from 'react-player';

const REACT_APP_RTMP_URL = process.env.REACT_APP_RTMP_URL;

const VideoPlayer = () => {
    return (
        <div className="video-player">
            <ReactPlayer url={REACT_APP_RTMP_URL} playing={true} controls/>
        </div>
    );
};

export default VideoPlayer;

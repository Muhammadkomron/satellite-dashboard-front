import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const REACT_APP_VIDEO_URL = process.env.REACT_APP_VIDEO_URL;

const WebRTCPlayer = () => {
    const videoRef = useRef(null);
    const [pc, setPC] = useState(null);
    const [stream, setStream] = useState(null);

    const startPlaying = React.useCallback(async () => {
        const peerConnection = new RTCPeerConnection(null);
        console.log('peerConnection', peerConnection);
        setPC(peerConnection);

        peerConnection.addEventListener('iceconnectionstatechange', event => {
            console.log(`event iceconnectionstatechange: ${JSON.stringify(event)}`);
        });

        peerConnection.addTransceiver('audio', { direction: 'recvonly' });
        peerConnection.addTransceiver('video', { direction: 'recvonly' });

        const mediaStream = new MediaStream();
        peerConnection.addEventListener('track', event => {
            console.log(`event track: streams=${event.streams.length}, track=${event.track.id} ${event.track.kind} ${event.track.label}`);
            mediaStream.addTrack(event.track);
            setStream(mediaStream);
        });

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log(`offer ${offer.type} created, sdp: ${offer.sdp}`);

        const response = await fetch(
            REACT_APP_VIDEO_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/sdp' },
                body: offer.sdp,
            }
        );
        if (!response.ok) {
            console.error(`failed to fetch: ${response.status} ${response.statusText}`);
            return;
        }

        const answerSDP = await response.text();
        console.log(`answer sdp: ${answerSDP}`);

        await peerConnection.setRemoteDescription(
            new RTCSessionDescription({ type: 'answer', sdp: answerSDP })
        );
        console.log(`set answer sdp ok`);
    }, [setStream, setPC]);

    const stopPlaying = React.useCallback(async () => {
        if (pc) {
            pc.close();
            console.log(`pc closed`);
        }

        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop();
                console.log(`track ${track.id} ${track.kind} stopped`);
            });
            console.log(`stream closed`);
        }

        setStream(null);
        setPC(null);
    }, [stream, pc]);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="webRTCContainer">
            {!stream && <button className="webRTCButton startButton" onClick={startPlaying}>Start</button>}
            {stream && <button className="webRTCButton stopButton" onClick={stopPlaying}>Stop</button>}
            <div className="videoContainer">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="videoElement"
                />
            </div>
        </div>
    );
};

export default WebRTCPlayer;

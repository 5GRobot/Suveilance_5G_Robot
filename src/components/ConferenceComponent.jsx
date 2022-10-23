import React, { useState, useEffect, useRef, } from 'react'
import { useParams } from 'react-router-dom'
import CommentComponent from './CommentComponent'
import { updateCaller, endCaller } from '../services/CallerAPI'
import MultiStreamRecorder from '../services/Media'
import MicIcon from '@mui/icons-material/Mic';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import io from 'socket.io-client'
import WebRTC from '../services/WebRTC'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../styles/conference.css'
const ConferenceComponent = () => {
    const conferenceId = useParams();
    const localVideo = useRef();
    // const [localVideo, setLocalVideo] = useState(document)
    const [videoGrid, setVideoGrid] = useState(document)
    const [notification, setNotification] = useState(document)
    const [roomInput, setRoomInput] = useState(document)
    const [joinBtn, setJoinBtn] = useState(document)
    const [leaveBtn, setLeaveBtn] = useState(document)
    const [kickBtns, setKickBtns] = useState(document)
    const [mic, setMic] = useState(document)
    const [camera, setCamera] = useState(document)
    const [stateCamera, setStateCamera] = useState(false)

    const [recordBtn, setRecordBtn] = useState(document)
    const [recordedVideo, setRecordedVideo] = useState(document)
    const [playBtn, setPlayBtn] = useState(document)
    const [downloadBtn, setDownloadBtn] = useState(document)
    let mediaRecorder;
    let recordedBlobs;


    const notify = (message) => {
        notification.innerHTML = message;
    };
    const socket = io.connect(`${import.meta.env.VITE_SERVER_IO}`)
    const pcConfig = {
        iceServers: [
            {
                urls: [
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun3.l.google.com:19302',
                    'stun:stun4.l.google.com:19302',
                ],
            },
            {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com',
            },
            {
                urls: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com',
            },
            {
                urls: 'turn:192.158.29.39:3478?transport=udp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808',
            },
        ],
    };

    /**
     * Initialize webrtc
     */
    const [webrtc, setWebrtc] = useState(null);

    useEffect(() => {
        setVideoGrid(document.querySelector('#videoGrid'));
        setNotification(document.querySelector('#notification'));
        // setLocalVideo(document.querySelector('#localVideo-container'));
        setRoomInput(document.querySelector('#roomId'))
        setJoinBtn(document.querySelector('#joinBtn'))
        setLeaveBtn(document.querySelector('#leaveBtn'))
        setKickBtns(document.querySelector('#kick_btn'))
        setMic(document.querySelector('#audioBtn'))
        setCamera(document.querySelector('#cameraBtn'))
        setRecordBtn(document.querySelector('#recordBtn'))
        setRecordedVideo(document.querySelector('#recorded'))
        setPlayBtn(document.querySelector('#playBtn'))
        setDownloadBtn(document.querySelector('#downloadBtn'))
        setWebrtc(new WebRTC(socket, pcConfig, {
            log: true,
            warn: true,
            error: true,
        }))
    }, []);

    const fetchData = async () => {
        updateCaller(conferenceId.id)
    }

    const fetchEnd = async () => {
        endCaller(conferenceId.id)
    }
    function getSupportedMimeTypes() {
        const possibleTypes = [
            'video/webm;codecs=vp9,opus',
            'video/webm;codecs=vp8,opus',
            'video/webm;codecs=h264,opus',
            'video/mp4;codecs=h264,aac',
        ];
        return possibleTypes.filter(mimeType => {
            return MediaRecorder.isTypeSupported(mimeType);
        });
    }
    function handleDataAvailable(blob) {
        // console.log('handleDataAvailable', event);
        // if (event.data && event.data.size > 0) {
        //     recordedBlobs.push(event.data);
        // }

        var blobURL = URL.createObjectURL(blob);

        // var reader = new FileReader();
        // reader.readAsDataURL(blob);
        // reader.onloadend = function () {
        //     var base64data = reader.result;
        //     console.log(base64data);
        //     axios.put(`${import.meta.env.VITE_API}/googleupload`, {base64data})
        //         .then(res => { console.log(res) })
        // }
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobURL;
        a.download = `${Date.now()}.mp4`;
        document.body.appendChild(a);

        // a.click();


        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(blobURL);
            // window.location.reload();
        }, 100);
    }

    function startRecording() {

        console.log(document.querySelector('video.user'));
        if (document.querySelector('video.user')) {
            const videoUser = document.querySelector('video.user');
            const videoLocal = localVideo.current.srcObject;

            recordedBlobs = [];

            const mimeType = getSupportedMimeTypes()[0];
            const options = { mimeType };

            try {
                var arrayOfStreams = [videoUser.srcObject, videoLocal]
                // mediaRecorder = new MediaRecorder(video.srcObject, options);
                mediaRecorder = new MultiStreamRecorder(arrayOfStreams);
            } catch (e) {
                console.error('Exception while creating MediaRecorder:', e);
                // errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
                return;
            }

            // console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
            recordBtn.textContent = 'Stop Recording';
            playBtn.disabled = true;
            downloadBtn.disabled = true;

            // mediaRecorder.onstop = (event) => {
            //     console.log('Recorder stopped: ', event);
            //     console.log('Recorded Blobs: ', recordedBlobs);
            // };
            mediaRecorder.ondataavailable = handleDataAvailable;

            mediaRecorder.start();
            // console.log('MediaRecorder started', mediaRecorder);
        }
    }

    function stopRecording() {
        mediaRecorder.stop();
    }


    /**
     * Create or join a room
     */
    if (webrtc !== null) {
        downloadBtn.addEventListener('click', () => {
            const blob = new Blob(recordedBlobs, { type: 'video/webm' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'test.webm';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        });

        recordBtn.addEventListener('click', () => {
            if (recordBtn.textContent === 'Start Recording') {
                startRecording();
            } else {
                stopRecording();
                recordBtn.textContent = 'Start Recording';
                playBtn.disabled = false;
                downloadBtn.disabled = false;
            }
        })
        playBtn.addEventListener('click', () => {
            const mimeType = getSupportedMimeTypes()[0].split(';', 1)[0];
            const superBuffer = new Blob(recordedBlobs, { type: mimeType });
            recordedVideo.src = null;
            recordedVideo.srcObject = null;
            recordedVideo.src = window.URL.createObjectURL(superBuffer);
            recordedVideo.controls = true;
            recordedVideo.play();
        });

        roomInput.value = 'robot';
        joinBtn.addEventListener('click', () => {
            fetchData();
            const room = roomInput.value;
            if (!room) {
                notify('Room ID not provided');
                return;
            }
            webrtc.joinRoom(room);
            joinBtn.style.display = 'none';
            leaveBtn.style.display = 'inline-block';
        });
        const setTitle = (status, e) => {
            const room = e.detail.roomId;

            console.log(`Room ${room} was ${status}`);

            notify(`Room ${room} was ${status}`);
            document.querySelector('h1').textContent = `Room: ${room}`;
            webrtc.gotStream();
        };

        webrtc.addEventListener('createdRoom', setTitle.bind(this, 'created'));
        webrtc.addEventListener('joinedRoom', setTitle.bind(this, 'joined'));
        console.log(webrtc)

        /**
         * Leave the room
         */
        leaveBtn.addEventListener('click', () => {
            webrtc.leaveRoom();
            fetchEnd();
        });

        camera.addEventListener('click', () => {
            const videoTrack = localVideo.current.srcObject.getTracks().find(track => track.kind === 'video');
            if (videoTrack.enabled) {
                videoTrack.enabled = false;
                // camera.innerHTML = 'Show'
                camera.style.background = 'red'
            }
            else {
                videoTrack.enabled = true;
                // camera.innerHTML = 'Hide'
                camera.style.background = 'var(--color-primary)'

            }
            { console.log(camera.innerHTML) }

        });

        mic.addEventListener('click', () => {
            const audioTrack = localVideo.current.srcObject.getTracks().find(track => track.kind === 'audio');
            if (audioTrack.enabled) {
                audioTrack.enabled = false;
                // mic.innerHTML = 'Show'
                mic.style.background = 'red'

            }
            else {
                audioTrack.enabled = true;
                // mic.innerHTML = 'Hide'
                mic.style.background = 'var(--color-primary)'

            }
            { console.log(mic.innerHTML) }

        });

        webrtc.addEventListener('leftRoom', (e) => {
            const room = e.detail.roomId;
            document.querySelector('h1').textContent = '';
            notify(`Left the room ${room}`);
        });

        /**
         * Get local media
         */
        webrtc
            .getLocalStream(true, { width: 640, height: 480 })
            .then((stream) => (localVideo.current.srcObject = stream));

        webrtc.addEventListener('kicked', () => {
            document.querySelector('h1').textContent = 'You were kicked out';
            videoGrid.innerHTML = '';
        });

        webrtc.addEventListener('userLeave', (e) => {
            console.log(`user ${e.detail.socketId} left room`);
        });

        /**
         * Handle new user connection
         */
        webrtc.addEventListener('newUser', (e) => {

            const socketId = e.detail.socketId;
            const stream = e.detail.stream;

            const videoContainer = document.createElement('div');
            videoContainer.setAttribute('class', 'grid-item-admin');
            videoContainer.setAttribute('id', socketId);

            const video = document.createElement('video');
            video.setAttribute('class', 'user');
            video.setAttribute('autoplay', true);
            video.setAttribute('muted', true); // set to false
            video.setAttribute('playsinline', true);
            video.srcObject = stream;

            const p = document.createElement('p');
            p.textContent = socketId;

            videoContainer.append(p);
            videoContainer.append(video);

            // If user is admin add kick buttons
            if (webrtc.isAdmin) {
                const kickBtn = document.createElement('button');
                kickBtn.setAttribute('class', 'kick_btn');
                kickBtn.textContent = 'Kick';

                kickBtn.addEventListener('click', () => {
                    webrtc.kickUser(socketId);
                });

                videoContainer.append(kickBtn);
            }
            videoGrid.append(videoContainer);
        });

        /**
         * Handle user got removed
         */
        webrtc.addEventListener('removeUser', (e) => {
            const socketId = e.detail.socketId;
            if (!socketId) {
                // remove all remote stream elements
                videoGrid.innerHTML = '';
                return;
            }
            document.getElementById(socketId).remove();
        });

        /**
         * Handle errors
         */
        webrtc.addEventListener('error', (e) => {
            const error = e.detail.error;
            console.error(error);

            notify(error);
        });

        /**
         * Handle notifications
         */
        webrtc.addEventListener('notification', (e) => {
            const notif = e.detail.notification;
            console.log(notif);

            notify(notif);
        });

    }


    return (
        <>
            <div className='row center' style={{ display: 'none' }}>
                <h1></h1>

                <div className='col-auto'>
                    <label htmlFor="roomId">Room ID</label>
                </div>
                <div className='col-md-3'>
                    <input className='form-control' id="roomId" type="text" />
                </div>
                <p id="notification"></p>
            </div>
            <div id="localVideo-container">
                <video autoPlay playsInline ref={localVideo} muted></video>
                <div className='bar center'>
                    <button className='btn btn-primary' id='cameraBtn'>
                        <CameraAltIcon />
                    </button>
                    <div className=''>
                        <button className='btn btn-primary m-1' id="joinBtn" >รับสาย</button>
                        <button className='btn btn-danger' id="leaveBtn" style={{ display: 'none' }}>วางสาย</button>
                    </div>
                    <button className='btn btn-primary' id='audioBtn' >
                        <MicIcon />
                    </button>

                </div>
            </div>
            <div className='grid-container-admin'>
                <div className='center' style={{ paddingLeft: '20px', background: '#f6f6f6' }}>
                    <div id="videos" >
                        <div id="videoGrid" >
                            <div className='grid-item-admin' >
                                <video className='user' autoPlay playsInline ref={localVideo} muted></video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='' style={{ padding: '0px 20px' }}>
                    <button className='btn btn-primary' id='recordBtn' >
                        Start Recording
                    </button>
                    <button className='btn btn-primary' id="playBtn" disabled>Play</button>
                    <button className='btn btn-primary' id="downloadBtn" disabled>Download</button>
                    <video width='200px' height='200px' style={{ display: 'none' }} id="recorded" playsInline loop></video>
                    {/* <CommentComponent /> */}
                </div>
                <div className='' style={{ padding: '0px 20px' }}>

                    <CommentComponent />
                </div>
            </div>
        </>
    )
}

export default ConferenceComponent
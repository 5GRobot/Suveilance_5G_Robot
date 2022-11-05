import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import WebRTC from '../services/WebRTC'
import '../styles/conference.css'
const UserConferenceComponent = () => {
    const [conferences, setConferences] = useState({
        caller: '633ae65bf2e8550e94337f95', accept: '633ae65bf2e8550e94337f95', status: false, start: Date.now(), end: '', difftime: 0
    })
    const [dot, setDot] = useState('...')
    const localVideo = useRef();
    // const [localVideo, setLocalVideo] = useState(document)
    const [videoGrid, setVideoGrid] = useState(document)
    const [notification, setNotification] = useState(document)
    const [roomInput, setRoomInput] = useState(document)
    const [joinBtn, setJoinBtn] = useState(null)
    const [leaveBtn, setLeaveBtn] = useState(document)
    const [kickBtns, setKickBtns] = useState(document)
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
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    useEffect(() => {
        setVideoGrid(document.querySelector('#videoGrid'));
        setNotification(document.querySelector('#notification'));
        // setLocalVideo(document.querySelector('#localVideo-container'));
        setRoomInput(document.querySelector('#roomId'))
        setJoinBtn(document.querySelector('#joinBtn'))
        setLeaveBtn(document.querySelector('#leaveBtn'))
        setKickBtns(document.querySelector('#kick_btn'))
        setWebrtc(new WebRTC(socket, pcConfig, {
            log: true,
            warn: true,
            error: true,
        }))
    }, []);


    /**
     * Create or join a room
     */
    if (webrtc !== null) {
        roomInput.value = 'robot';
        joinBtn.addEventListener('click', () => {
            console.log(`Created Room`);

            axios.post(`${import.meta.env.VITE_API}/cfr/postCaller`, conferences)
                .then(response => {
                    if (response.status === 200) {
                        const room = roomInput.value;
                        if (!room) {
                            notify('Room ID not provided');
                            return;
                        }
                        webrtc.joinRoom(room);
                        console.log(`Created Room`);
                    }
                    else console.log("error")
                }).catch(err => { console.log(err) })
        });

        const setTitle = (status, e) => {
            const room = e.detail.roomId;

            console.log(`Room ${room} was ${status}`);

            notify(`Room ${room} was ${status}`);
            document.querySelector('h1').textContent = `กำลังโทร ...`;
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
            document.querySelector('h1').textContent = '';
            videoGrid.innerHTML = '';
        });

        webrtc.addEventListener('userLeave', (e) => {
            console.log(`user ${e.detail.socketId} left room`);
            window.location.href = '/leave';
        });

        /**
         * Handle new user connection
         */
        webrtc.addEventListener('newUser', (e) => {

            const socketId = e.detail.socketId;
            const stream = e.detail.stream;

            const videoContainer = document.createElement('div');
            videoContainer.setAttribute('class', 'grid-item-user');
            videoContainer.setAttribute('id', socketId);

            const video = document.createElement('video');
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
                document.querySelector('h1').style.display = 'none';
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
            const cancel = e.detail.cancelNewUser
            console.log(cancel)
            notify(notif);
            notify(cancel);
        });

        webrtc.addEventListener('cancelNewUser', (e) => {
            const cancel = e.detail.cancelNewUser;
            console.log(cancel);
            if (cancel) {
                let timerInterval
                Swal.fire({
                    title: 'Auto close alert!',
                    html: 'I will close in <b></b> milliseconds.',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                    }
                })
            }
        });
        delay(1500);
        joinBtn.click();
    }


    // useEffect(() => {
    //     if (joinBtn !== null) {

    //     }
    // }, [joinBtn==null]);


    return (
        <>
            <div style={{ display: 'none' }}>
                <div className='row'>
                    <div className='col-auto'>
                        <label htmlFor="roomId">Room ID</label>
                    </div>
                    <div className='col-md-3'>
                        <input className='form-control' id="roomId" type="text" />
                    </div>
                    <div className='col-auto'>
                        <button className='btn btn-success' id="joinBtn">Join</button>
                    </div>
                    <div className='col-auto'>
                        <button className='btn btn-danger' id="leaveBtn">Leave</button>
                    </div>
                </div>

                <p id="notification"></p>
            </div>
            {/* <div id="localVideo-container">
                <video autoPlay playsInline ref={localVideo} muted></video>
            </div>

            <div id="videos">
                <div id="videoGrid" className="grid-container"></div>
            </div> */}

            <div id='myvideo'>
                {/* <div style={{ display: 'none' }}>
                    <h1></h1>
                    <label htmlFor="roomId">Room ID</label>
                    <input id="roomId" type="text" />
                    <button id="joinBtn">Join</button>
                    <button id="leaveBtn">Leave</button>
                </div> */}
                <div style={{ width: '100vw', height: '100vh', backgroundColor: '#19232D' }}>
                    <div className='center' style={{ width: '100vw', height: '100vh' }} >
                        <div id="videos center" style={{ zIndex: '0' }}>
                            <div id="videoGrid" className="grid-container" style={{ height: "100vh" }}>
                                {/* <div className='grid-item-user'>
                                    <video autoPlay playsInline ref={localVideo} muted></video>
                                </div> */}
                            </div>
                        </div>
                        <div className='center' style={{ width: '50%', height: '50%', backgroundColor: '#19232D' }}>
                            <h1 style={{ fontSize: '64px', color: '#ffffff' }}>กำลังโทร {dot} <button className='btn' id="kick_btn"></button> </h1>
                        </div>
                    </div>
                </div>
                <div id="localVideo-container">
                    <p id="notification" style={{ display: 'none' }}></p>
                    <video autoPlay playsInline ref={localVideo} muted></video>
                    {/* <video autoPlay playsInline muted style={{ width: 'calc(100%)', display: 'none' }}></video> */}
                </div>
            </div>
        </>
    )
}

export default UserConferenceComponent
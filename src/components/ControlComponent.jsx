import React, { useState, useEffect, useRef } from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Switch from "react-switch";
import { controlUp, controlDown, controlLeft, controlRight, controlStop } from '../services/controlRobot'
import { postMode } from '../services/MqttMode';
const ControlComponent = () => {
    const [checked, setChecked] = useState(false);
    const handleChange = nextChecked => {
        setChecked(nextChecked);
    };

    useEffect(() => {
        if (checked) {
            postMode(1)
        }
        else {
            postMode(0)
        }
    }, [checked])

    let controls = false
    window.addEventListener('keydown', e => {

        if (e.key === 'w' && controls === false) {
            controlUp()
            document.getElementById("top").disabled = false;
            document.getElementById("top").classList.add('hover');
            document.getElementById("top").classList.add('active');

            controls = true
            console.log('forword')
        }
        else if (e.key === 'a' && controls === false) {
            controlLeft()
            document.getElementById("left").disabled = false;
            document.getElementById("left").classList.add('hover');
            document.getElementById("left").classList.add('active');
            controls = true
        }
        else if (e.key === 's' && controls === false) {
            controlDown()
            document.getElementById("bottom").disabled = false;
            document.getElementById("bottom").classList.add('hover');
            document.getElementById("bottom").classList.add('active');
            controls = true

        }
        else if (e.key === 'd' && controls === false) {
            controlRight()
            document.getElementById("right").disabled = false;
            document.getElementById("right").classList.add('hover');
            document.getElementById("right").classList.add('active');
            controls = true
        }
        // else {
        //   const interval = setInterval(() => {
        //     
        //   }, 500);
        //   return () => clearInterval(interval);
        // }
    })
    window.addEventListener('keyup', e => {
        controls = false
        controlStop()
        document.getElementById("top").classList.remove('hover');
        document.getElementById("top").classList.remove('active');
        document.getElementById("left").classList.remove('hover');
        document.getElementById("left").classList.remove('active');
        document.getElementById("right").classList.remove('hover');
        document.getElementById("right").classList.remove('active');
        document.getElementById("bottom").classList.remove('hover');
        document.getElementById("bottom").classList.remove('active');

        document.getElementById("top").disabled = true;
        document.getElementById("left").disabled = true;
        document.getElementById("right").disabled = true;
        document.getElementById("bottom").disabled = true;
    })

    const myVideo = useRef()
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
            myVideo.current.srcObject = stream
        }).catch((err) => { console.log(err) })
    }
    return (
        <div className='controls-container '>
            <div className='center'>
                <video playsInline muted ref={myVideo} autoPlay style={{ width: '100%', height: '90%' }} />
            </div>

            <div className='controls-item center'>
                <div className='row'>
                    <div className='col-md-12 button'>
                        <div className=''>
                            <div className="row justify-content-around">
                                <div className="col-3 center">
                                    <div className='btn-top'>
                                        <button type="button" id='top' className="btn btn-primary" disabled style={{ width: '60px', height: '60px', textAlign: 'center' }}><ExpandLessIcon /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-4 center">
                                    <div className='btn-left'>
                                        <button type="button" id='left' className="btn btn-primary" disabled style={{ width: '60px', height: '60px', textAlign: 'center' }}>< ChevronLeftIcon /></button>
                                    </div>
                                </div>
                                <div className="col-4 center">
                                    <Switch
                                        onChange={handleChange}
                                        checked={checked}
                                        className="react-switch"
                                    />
                                </div>
                                <div className="col-4 center">
                                    <div className='btn-bottom'>
                                        <button type="button" id='right' className="btn btn-primary" disabled style={{ width: '60px', height: '60px', textAlign: 'center' }}><ChevronRightIcon /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-evenly">
                                <div className="col-3 center">
                                    <div className='btn-right'>
                                        <button type="button" id='bottom' className="btn btn-primary" disabled style={{ width: '60px', height: '60px', textAlign: 'center' }}><ExpandMoreIcon /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlComponent
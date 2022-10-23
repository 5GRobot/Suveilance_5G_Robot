import React, { useEffect, useState, useRef } from 'react'

const Streaming = () => {
    const myVideo = useRef()
    const startVideo = async () => {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {
            await navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
                myVideo.current.srcObject = stream
            }).catch((err) => { console.log(err) })
        }
    }

    useEffect(() => {
        startVideo();
    }, [])

    return (
        <video playsInline muted ref={myVideo} autoPlay style={{ width: '32vw', height: 'auto' ,borderRadius: '32px'}} />
    )
}

export default Streaming
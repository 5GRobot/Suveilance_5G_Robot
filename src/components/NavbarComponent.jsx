import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import DashboardAdmin from '../pages/admin/DashboardAdmin'
import SuveillanceAdmin from '../pages/admin/SuveillanceAdmin'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CallIcon from '@mui/icons-material/Call';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Battery from '../services/battery'
import Ringtone from '../assets/ringtone.mp3'
import { getSensor } from '../services/MqttSensorAPI'
import { getCaller } from '../services/CallerAPI';
import '../styles/sidebar.css'
const NavbarComponent = () => {
    const navigate = useNavigate();
    const [message, setMessages] = useState([])
    const [conferences, setConferences] = useState()
    const [audioRingtone, setAudioRingtone] = useState(null)
    const [call, setCall] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(interval);
        // getMqtt()
    }, []);

    useEffect(() => {
        var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
        dataSpyList.forEach(function (dataSpyEl) {
            bootstrap.ScrollSpy.getInstance(dataSpyEl)
                || new bootstrap.ScrollSpy(dataSpyEl, {
                    target: dataSpyEl.getAttribute('data-bs-target') || '#list-example'
                })
        })
    },[])

    useEffect(() => {
        // console.log(conferences !== undefined && conferences.conference[0].status)
        conferences !== undefined && conferences.conference.length !== 0 && conferences.conference[0].status === false ? setCall(true) : setCall(false)
        call ? playAudio() : stopAudio()
    })

    useEffect(() => {
        setAudioRingtone(document.querySelector('#myRingtone'))
    }, [])

    const playAudio = () => {
        if (audioRingtone !== null) {
            audioRingtone.play();
        }
    }
    const stopAudio = () => {
        if (audioRingtone !== null) {
            // console.log('pause audio')
            audioRingtone.pause();
        }
    }

    const fetchData = async () => {
        getSensor().then(response => {
            if (response.data !== ' ') { setMessages(response.data) } else { setMessages([]) }
        }).catch(err => { console.log(err) });
        
        getCaller().then(response => { setConferences(response.data) })
            .catch(err => { console.log(err) });
    }

    return (
        <>
            <div className="container">
                <aside>
                    <div className="top">
                        <nav className="navbar fixed-top navbar-light">
                            <div>
                                <div className="logo">
                                    {/* <img src={logo} alt='Logo' /> */}
                                    <div className='text-muted'>Surveillance <span className="danger">5G</span> Robot</div>
                                </div>
                            </div>
                            <div>
                                {/* {console.log(call)} */}

                                <a href={`/con-admin/${call && conferences.conference[0]._id}`}>
                                    {call && <div className='callOn'>  <CallIcon /> </div>}
                                    <audio id='myRingtone'>
                                        {
                                            call && <> <source src={Ringtone} type='audio/mpeg' /></>
                                        }
                                    </audio>

                                </a>
                            </div>
                            {/* <div style={{ float: 'right', color: 'black' }}>ความแรงของสัญญาณ = {message.Voltage} Mpbs</div> */}
                            <div style={{ float: 'right', color: 'black' }}>
                                {/* {console.log(message[1] !== undefined ? message[1].status ? message[0].Battery : null : null)} */}
                                {message.length > 0 ? <Battery percentage={message.Pzem_B} /> : <Battery percentage={0} />}
                            </div>
                        </nav>
                        {/* <div className="logo">
                        <img src={logo} alt='Logo' />
                        <h2 className='text-muted'>Surveillance <span className="danger">5G</span> Robot</h2>
                    </div> */}
                    </div>

                    <div className="sidebar" >
                        <ul className="nav-links">
                            <li>
                                <div id='Links'>
                                    <span><AdminPanelSettingsIcon /></span>
                                    <h3>Admin</h3>
                                    <KeyboardArrowRightIcon />
                                </div>
                                <ul className="sub-menu">
                                    {/* <li><a className="list-group-item list-group-item-action" href="#list-item-1">Test</a></li> */}
                                    <li><a href="/admin/dashboard">Dashboard</a></li>
                                    <li><a href="/admin/suveillance">Suveillance</a></li>

                                    {/* <li><a className="list-group-item list-group-item-action" href="#list-item-1">Dashboard</a></li>
                                    <li><a className="list-group-item list-group-item-action" href="#list-item-2">Suveillance</a></li> */}
                                    {/* <li><a href="/admin/controller">Controller</a></li> */}
                                    <li><a href="/admin/account">Account</a></li>
                                    <li><a href="/admin/meeting">Meeting</a></li>
                                    <li><a href="/admin/device">Device</a></li>
                                    <li><a href="/admin/report">Report</a></li>
                                    {/* <li><a href="/test">Test</a></li> */}
                                    {/* <li><a href="/con-robot">Robot Video Call</a></li> 
                                <li><a href="/con-admin">Admin Video Call</a></li> */}
                                    {/* <li><a href="/adminCon">การสนทนา</a></li> */}
                                    {/* <li><a href="/manage-user">บัญชีผู้ใช้</a></li>
                                <li><a href="/equipment">สถานะอุปกรณ์</a></li>
                                <li><a href="/report-repair">แจ้งปัญหาอุปกรณ์</a></li>
                                <li><a href="/con-admin">Admin Video Call</a></li>
                                <li><a href="/con-robot">Robot Video Call</a></li> */}
                                </ul>
                            </li>
                            <li>
                                <div id='Links'>
                                    <span><SettingsIcon /></span>
                                    <h3>Technical</h3>
                                    <KeyboardArrowRightIcon />
                                </div>
                                <ul className="sub-menu">
                                    <li><a href="/dashboard">Dashboard</a></li>
                                    <li><a href="/admin/suveillance">Control</a></li>
                                    <li><a href="/admin/meeting">Meeting</a></li>
                                    <li><a href="/dashboard-tech">Device</a></li>
                                    <li><a href="/report-repair-tech">Report</a></li>
                                    {/* <li><a href="/technical">ควบคุมหุ่นยนต์</a></li> */}
                                    {/* <li><a href="/equipment">สถานะอุปกรณ์</a></li> */}
                                </ul>
                            </li>
                            <li>
                                <div id='Links'>
                                    <span><SecurityIcon /></span>
                                    <h3>Security</h3>
                                    <KeyboardArrowRightIcon />
                                </div>
                                <ul className="sub-menu">
                                    <li><a href="/dashboard">Dashboard</a></li>
                                    <li><a href="/admin/suveillance">Suveillance</a></li>
                                    <li><a href="/admin/meeting">Meeting</a></li>
                                    <li><a href="/dashboard-tech">Device</a></li>
                                    <li><a href="/report-repair">Report</a></li>
                                    {/* <li><a href="/security">ประวัติ</a></li> */}
                                </ul>
                            </li>

                        </ul>
                        {/* {
                        !getUser() ? (
                            navigate("/")
                        ) :
                            <Link id='Links' to='#' onClick={() => logout(() => navigate("/"))} style={{}}>
                                <span><LogoutIcon /></span>Logout
                            </Link>
                    } */}

                    </div>
                </aside>
            </div>
            {/* <div className='main'>
                <main>
                    <div>
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" className="scrollspy-example" >
                            <div id="list-item-1" className='mt-2'>
                                <div></div>
                                <DashboardAdmin />
                            </div>
                            <div id="list-item-2" className='mt-2'>
                                <SuveillanceAdmin />
                            </div>
                        </div>
                    </div>
                </main>
            </div> */}
        </>

    )
}

export default NavbarComponent;
import React, { useEffect, useState, useRef } from 'react'
import axios from "axios"
import NavbarComponent from '../../components/NavbarComponent'
import MasksIcon from '@mui/icons-material/Masks';
import PersonIcon from '@mui/icons-material/Person';
import ChartAdmin from '../../services/ChartAdmin'
import Streaming from '../../services/Streaming';
import { RadialGauge } from 'react-canvas-gauges';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Switch from "react-switch";
import { controlUp, controlDown, controlLeft, controlRight, controlStop } from '../../services/controlRobot'
import { postMode } from '../../services/MqttMode';

const SuveillanceAdmin = () => {
    const [intervals, setIntervals] = useState(undefined)
    const [masks, setMasks] = useState(undefined)
    const [sensors, setSensors] = useState(undefined)

    useEffect(() => {
        // const interval = setInterval(() => {
        //     fetchData();
        // }, 1000);
        // return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_API}/mqtt/Interval`)
            .then(response => {
                response.status === 200 ? setIntervals(response.data) : console.log("error")
            }).catch((err) => { console.log("Not Working") })

        await axios.get(`${import.meta.env.VITE_API}/mqtt/Mask`)
            .then(response => {
                response.status === 200 ? setMasks(response.data) : console.log("error")
            }).catch((err) => { console.log("Not Working") })

        await axios.get(`${import.meta.env.VITE_API}/mqtt/Sensor`)
            .then(response => {
                response.status === 200 ? setSensors(response.data) : console.log("error")
            }).catch((err) => { console.log("Not Working") })
    }

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
            console.log(controls)
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
    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main>
                    <div className='dashboard-container'>
                        <div className='dashboard-item-mask'>
                            {/* <div className='row not-merge'>
                                <div className='col-md'>
                                    <div>
                                        <div className=''>
                                            <div>
                                                <Streaming />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className='row merge'>
                                <div className='col-md'>
                                    <div>
                                        <div className='insights'>
                                            <div >
                                                <MasksIcon className='progress' />
                                            </div>
                                            <div>
                                                <h1 style={{ textAlign: 'center' }}> {masks !== undefined ? masks.Count_Mask : 0} <PersonIcon /></h1>
                                                <h3>ใส่แมส (ถูกต้อง)</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md '>
                                    <div className='insights'>
                                        <div >
                                            <MasksIcon className='progress' />
                                        </div>
                                        <div>
                                            <h1 style={{ textAlign: 'center' }}>{masks !== undefined ? masks.Count_Nomask : 0} <PersonIcon /></h1>
                                            <h3>ไม่ใส่แมส</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md'>
                                    <div className='insights'>
                                        <div >
                                            <MasksIcon className='progress' />
                                        </div>
                                        <div>
                                            <h1 style={{ textAlign: 'center' }}>{masks !== undefined ? masks.Count_Wrongmask : 0} <PersonIcon /></h1>
                                            <h3>ใส่แมส (ไม่ถูกต้อง)</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row not-merge'>
                                <div className='col-md'>
                                    <div>
                                        <h3>จำนวนคนในขณะนี้</h3>
                                        <h1 id='data-count'>{masks !== undefined ? masks.Count_Density : 0}</h1>
                                    </div>
                                </div>
                                <div className='col-md'>
                                    <div>
                                        <h3>จำนวนคนทั้งหมด</h3>
                                        <h1 id='data-count'>{masks !== undefined ? masks.Count_Person : 0}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='row not-merge'>
                                <div className='col-md' >
                                    <div >
                                        <h3>ความหนาแน่นของคน</h3>
                                        <h1 id='data-count'>{masks !== undefined ? masks.Density : 0}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='row not-merge'>
                                <div className='col-md'>
                                    <ChartAdmin />
                                </div>
                            </div>
                        </div>
                        <div className='controls-container'>
                            <div className='dashboard-item-mask'>
                                <div className='row not-merge'>
                                    <div className='col-md center'>
                                        <div>
                                            <div className=''>
                                                <div>
                                                    <Streaming />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='controls-item center'>
                                <div className='center'>
                                    <RadialGauge
                                        units='cm/s'
                                        title='Speed'
                                        value={intervals !== undefined ? intervals.SR : 0}
                                        minValue={0}
                                        maxValue={100}
                                        majorTicks={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                                        minorTicks={2}
                                    />
                                </div>
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
                                <div className='center'>
                                    <RadialGauge
                                        units='°C'
                                        title='Temp'
                                        value={sensors !== undefined ? sensors.TB : 0}
                                        minValue={0}
                                        maxValue={360}
                                        majorTicks={['0', '5', '15', '20', '25', '30', '35', '40', '45', '50']}
                                        minorTicks={2}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className='dashboard-item-mask'>
                            <div className='row not-merge'>
                                <div className='col-md'>
                                    <div className='center'>
                                    </div>
                                </div>
                            </div>
                            <div className='row not-merge'>
                                <div className='col-md'>
                                    <div>
                                        <h3>ความเร็ว</h3>
                                        <div className='center'>
                                            <RadialGauge
                                                units='cm/s'
                                                title='Speed'
                                                value={intervals !== undefined ? intervals.SR : 0}
                                                minValue={0}
                                                maxValue={100}
                                                majorTicks={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                                                minorTicks={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md'>
                                    <div>
                                        <h3>อุณหภูมิ</h3>
                                        <div className='center'>
                                            <RadialGauge
                                                units='°C'
                                                title='Temperature'
                                                value={sensors !== undefined ? sensors.TB : 0}
                                                minValue={0}
                                                maxValue={360}
                                                majorTicks={['0', '5', '15', '20', '25', '30', '35', '40', '45', '50']}
                                                minorTicks={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </main>
            </div >
        </>
    )
}

export default SuveillanceAdmin;
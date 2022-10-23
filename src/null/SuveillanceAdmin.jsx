import React, { useEffect, useState, useRef } from 'react'
import axios from "axios"
import NavbarComponent from '../../components/NavbarComponent'
import MasksIcon from '@mui/icons-material/Masks';
import PersonIcon from '@mui/icons-material/Person';
import ChartAdmin from '../../services/ChartAdmin'
import Streaming from '../../services/Streaming';
import { RadialGauge } from 'react-canvas-gauges';

import '../../styles/dashboard.scss'
const SuveillanceAdmin = () => {
    const [intervals, setIntervals] = useState(undefined)
    const [masks, setMasks] = useState(undefined)
    const [sensors, setSensors] = useState(undefined)

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(interval);
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


    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main>
                    <div className='dashboard-container'>
                        <div className='dashboard-item-mask'>
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
                                    <ChartAdmin />
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
                            <div className='row not-merge' style={{ height: 'calc(10% + 97px)' }}>
                                <div className='col-md' >
                                    <div >
                                        <h3>ความหนาแน่นของคน</h3>
                                        <h1 id='data-count'>{masks !== undefined ? masks.Density : 0}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='dashboard-item-mask'>
                            <div className='row not-merge'>
                                <div className='col-md'>
                                    <div className='center'>
                                        <Streaming />
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
                        </div>
                    </div>
                </main>
            </div >
        </>
    )
}

export default SuveillanceAdmin;
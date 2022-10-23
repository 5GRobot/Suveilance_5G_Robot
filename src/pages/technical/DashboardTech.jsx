import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarComponent from '../../components/NavbarComponent'
import { getMqttInterval } from '../../services/MqttInterval'
import { getSensor } from '../../services/MqttSensorAPI'
import Jetson from '../../images/Jetson.png'
import MiniPC from '../../images/Mini.png'
import Mega from '../../images/Mega.png'
const DashboardTech = () => {
    const [intervals, setIntervals] = useState([])
    const [sensors, setSensors] = useState([])
    const fetchData = async () => {
        getMqttInterval().then((res) => {
            setIntervals(res.data)
            // console.log(res.data)
        }).catch((err) => { console.log(err) })
        getSensor().then((res) => {
            setSensors(res.data)
            console.log(res.data)
        }).catch((err) => { console.log(err) })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(interval);
    });

    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className=''>
                    <div className='p-2' >
                        <div style={{ padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <div className='dashboard-tech container-fluid'>
                                <div>
                                    <div className='title'>อุปกรณ์หลัก (Controller)</div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3 style={{ position: 'relative', textAlign: 'left' }}>Mega<div style={{ position: 'absolute', top: 0, right: 0, color: 'green' }}>Online</div></h3>
                                                    <div className='center'>
                                                        <div className='progress'>
                                                            <img src={Mega} alt='Mega' style={{ width: '100%' }} />
                                                        </div>
                                                    </div>
                                                    {/* <h3>Voltage</h3> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3 style={{ position: 'relative', textAlign: 'left' }}>Mini PC
                                                        <div style={{ position: 'absolute', top: 0, right: 0, color: 'green' }}>
                                                            {/* {console.log(message)} */}
                                                            {/* {message[1] !== undefined ? message[1].status ? <>Online</> : <>Offline</> : <>Offline</>} */}
                                                            Online
                                                        </div>
                                                    </h3>
                                                    <div className='center'>
                                                        <div className='progress center'>
                                                            <img src={MiniPC} alt='MiniPC' style={{ width: '100%' ,height: '50%'}} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3 style={{ position: 'relative', textAlign: 'left' }}>Jetson 1<div style={{ position: 'absolute', top: 0, right: 0, color: 'green' }}>Online</div></h3>
                                                    <div className='center'>
                                                        <div className='progress'>
                                                            <img src={Jetson} alt='Jetson' style={{ width: '100%' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3 style={{ position: 'relative', textAlign: 'left' }}>Jetson 2<div style={{ position: 'absolute', top: 0, right: 0, color: 'green' }}>Online</div></h3>
                                                    <div className='center'>
                                                        <div className='progress'>
                                                            <img src={Jetson} alt='Jetson' style={{ width: '100%' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='title'>อุปกรณ์เสริม (Modules/Sensors)</div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Odrive 1</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.VO1}</h1>
                                                        {/* <div className='progress center'>
                                                        </div> */}
                                                    </div>
                                                    <h3>Voltage</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Odrive 2</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.VO2}</h1>
                                                    </div>
                                                    <h3>Voltage</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3 ms-md-auto'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Ultrasonic (Front)</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.USF}</h1>
                                                    </div>
                                                    <h3>mm</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3 ms-md-auto'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Ultrasonic (Back)</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.USR}</h1>
                                                    </div>
                                                    <h3>mm</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Wheel 1 (front-left)</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.VFL}</h1>
                                                    </div>
                                                    <h3>cm/r</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Wheel 2 (front-right)</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.VFR}</h1>
                                                    </div>
                                                    <h3>cm/r</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3 ms-md-auto'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Wheel 3 (back-left)</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.VRL}</h1>
                                                    </div>
                                                    <h3>cm/r</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3 ms-md-auto'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>Wheel 4 (back-right)</h3>
                                                    <div className='center'>
                                                        <h1 className='p-2'>{intervals.VRR}</h1>
                                                    </div>
                                                    <h3>cm/r</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-3'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>DHT 1 (in Battery)</h3>
                                                    <div className='space '>
                                                        <div></div>
                                                        <div>
                                                            <div className='center'>
                                                                <h1 className='p-2' style={{ display: 'flex' }}>{sensors.TB}</h1><h5>&#8451;</h5>
                                                            </div>
                                                            <h3>Temp</h3>
                                                        </div>
                                                        <div>
                                                            <div className='center'>
                                                                <h1 className='p-2'>{sensors.HB}%</h1>
                                                            </div>
                                                            <h3>Humid</h3>
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3>DHT 2 (in Robot)</h3>
                                                    <div className='space '>
                                                        <div></div>
                                                        <div>
                                                            <div className='center'>
                                                                <h1 className='p-2' style={{ display: 'flex' }}>{sensors.TR}</h1><h5>&#8451;</h5>
                                                            </div>
                                                            <h3>Temp</h3>
                                                        </div>
                                                        <div>
                                                            <div className='center'>
                                                                <h1 className='p-2'>{sensors.HR}%</h1>
                                                            </div>
                                                            <h3>Humid</h3>
                                                        </div>
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3 >PZEM-017</h3>
                                                    <div className='space'>
                                                        <div >
                                                            <div className='center'>
                                                                <h1 className='p-2'>{sensors.Pzem_V}</h1>
                                                            </div>
                                                            <h3>Voltage</h3>
                                                        </div>
                                                        <div>
                                                            <div className='center'>
                                                                <h1 className='p-2'>{sensors.Pzem_A}</h1>
                                                            </div>
                                                            <h3>Amp</h3>
                                                        </div>
                                                        <div>
                                                            <div className='center'>
                                                                <h1 className='p-2'>{sensors.Pzem_W}</h1>
                                                            </div>
                                                            <h3>Watt</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='dashboard-card'>
                                                <div>
                                                    <h3 >IMU</h3>
                                                    <div className='space'>
                                                        <div >
                                                            <div className='center'>
                                                            <h1 className='p-2'>{intervals.Imu_X}</h1>
                                                            </div>
                                                            <h3>X</h3>
                                                        </div>
                                                        <div>
                                                            <div className='center'>
                                                            <h1 className='p-2'>{intervals.Imu_Y}</h1>
                                                            </div>
                                                            <h3>Y</h3>
                                                        </div>
                                                        <div>
                                                            <div className='center'>
                                                            <h1 className='p-2'>{intervals.Imu_Z}</h1>
                                                            </div>
                                                            <h3>Z</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default DashboardTech
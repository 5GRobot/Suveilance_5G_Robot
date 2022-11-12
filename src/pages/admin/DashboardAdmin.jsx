import React, { useEffect, useState } from 'react';
import NavbarComponent from '../../components/NavbarComponent'
import io from 'socket.io-client'
const DashboardAdmin = () => {
    const socket = io.connect(`${import.meta.env.VITE_SERVER_IO}`)
    const [intervals, setIntervals] = useState([])
    const [sensor, setSensor] = useState([])
    const [mask, setMask] = useState([])
    socket.on("Robot5G_Control_Interval", (intervals) => {
        setIntervals(intervals)
    })
    socket.on("Robot5G_MPC_Sensor", (sensor) => {
        setSensor(sensor)
    })
    socket.on("Robot5G_Jetson2_Mask", (mask) => {
        setMask(mask)
    })

    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className=''>
                    <h1>Interval</h1>
                    <div>
                        <p>{JSON.stringify(intervals)}</p>
                    </div>
                    <h1>Sensor</h1>
                    <div>
                        <p>{JSON.stringify(sensor)}</p>
                    </div>
                    <h1>Mask</h1>
                    <div>
                        <p>{JSON.stringify(mask)}</p>
                    </div>

                    {/* <div className='' style={{ padding: '0px 10pxz' }} >
                        <div style={{ borderRadius: '30px', marginBottom: '10px' }}>
                            <div className=''>
                                <span><h6></h6></span>
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                                ข้อมูล Detect Mask
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                            <div className="accordion-body">
                                                <div className='data-dashboard'>
                                                    <div>
                                                        <div className='data center'>
                                                            <div className='row'>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                                                ข้อมูล Navigation
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                            <div className="accordion-body">
                                                <div className="accordion-body">
                                                    <div className='data-dashboard'>
                                                        <div>
                                                            <div className='data center'>
                                                                <div className='row'>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                                                ข้อมูล Bettery & Temperature
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                            <div className="accordion-body">
                                                <div className="accordion-body">
                                                    <div className='data-dashboard'>
                                                        <div>
                                                            <div className='data center'>
                                                                <div className='row'>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
                                                ข้อมูล Mode & Control
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                            <div className="accordion-body">
                                                <div className="accordion-body">
                                                    <div className='data-dashboard'>
                                                        <div>
                                                            <div className='data center'>
                                                                <div className='row'>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                    <div className='col-md'>
                                                                        
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className='data'>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="true" aria-controls="panelsStayOpen-collapseFive">
                                                ข้อมูล Metting
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                            <div className="accordion-body">
                                                <div className='data-dashboard'>
                                                    <div>
                                                        <div className='data center'>
                                                            <div className='row'>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingSix">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="true" aria-controls="panelsStayOpen-collapseSix">
                                                ข้อมูล Account
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseSix" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                                            <div className="accordion-body">
                                                <div className='data-dashboard'>
                                                    <div>
                                                        <div className='data center'>
                                                            <div className='row'>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                                <div className='col-md'>
                                                                    
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='data'>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="panelsStayOpen-headingSeven">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="true" aria-controls="panelsStayOpen-collapseSeven">
                                                ข้อมูล Report
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseSeven" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSeven">
                                            <div className='data-dashboard'>
                                                <div>
                                                    <div className='data center'>
                                                        <div className='row'>
                                                            <div className='col-md'>
                                                                
                                                                
                                                            </div>
                                                            <div className='col-md'>
                                                                
                                                                
                                                            </div>
                                                            <div className='col-md'>
                                                                
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='data'>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='data'>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='data'>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='data'>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='data'>

                                                    </div>
                                                </div>
                                                <div>
                                                    <div className='data'>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </main>
            </div>
        </>
    )
}

export default DashboardAdmin
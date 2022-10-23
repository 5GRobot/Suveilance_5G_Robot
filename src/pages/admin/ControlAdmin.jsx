import React from 'react'
import ControlComponent from '../../components/ControlComponent'
import NavbarComponent from '../../components/NavbarComponent'
const ControlAdmin = () => {
    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className='container'>
                    <div className=''>
                        <div style={{ borderRadius: '30px', padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <div className='manage-users'>
                                <ControlComponent />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default ControlAdmin
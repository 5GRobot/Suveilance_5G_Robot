import React from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import MeetingComponent from '../../components/MeetingComponent'
const MeetingAdmin = () => {
    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className=''>
                    <div className='container p-4' >
                        <div style={{ borderRadius: '30px', padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <div className='manage-users'>
                                <MeetingComponent />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default MeetingAdmin
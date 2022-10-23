import React from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import ConferenceComponent from '../../components/ConferenceComponent'
const ConferenceAdmin = () => {
    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className='container'>
                    <div className=''>
                        <div style={{ borderRadius: '30px', padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <div className='manage-users'>
                                <ConferenceComponent />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default ConferenceAdmin
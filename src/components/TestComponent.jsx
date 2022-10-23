import React from 'react'
import NavbarComponent from './NavbarComponent'
const TestComponent = () => {
    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className='container'>
                    <div className=''>
                        <div style={{ borderRadius: '30px', padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <iframe src='https://drive.google.com/drive/folders/1kWA63YONK_uP1Hi3_8iDf-KvN1RWr1tZ?usp=sharing' width='1000px' height='1000px'></iframe>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default TestComponent
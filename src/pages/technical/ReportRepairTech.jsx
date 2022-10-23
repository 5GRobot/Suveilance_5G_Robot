import React from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import TableReportRepairTech from '../../services/TableReportRepairTech'
const ReportRepairTech = () => {
    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className=''>
                    <div className='container p-4' >
                        <div style={{ borderRadius: '30px', padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <div className='manage-users'>
                                <TableReportRepairTech />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default ReportRepairTech
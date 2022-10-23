import React from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import ModelReportRepairComponent from '../../components/ModelReportRepairComponent'
import TableReportRepair from '../../services/TableReportRepair'
const ReportRepair = () => {
 
  return (
    <>
            <NavbarComponent />
            <div className='main'>
                <main className=''>
                    <div className='container p-4' >
                        <div style={{ borderRadius: '30px', padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <div className='manage-users'>
                                <TableReportRepair />
                            </div>
                            <div className='center'>
                                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#ReportRepairModal">แจ้งปัญหาอุปกรณ์</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
    <ModelReportRepairComponent />
    </>
  )
}

export default ReportRepair
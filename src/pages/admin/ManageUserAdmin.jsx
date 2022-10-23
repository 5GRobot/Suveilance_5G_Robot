import React from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import ModelUserComponent from '../../components/ModelUserComponent'
import TableUser from '../../services/TableUser'

const ManageUserAdmin = () => {
    return (
        <>
            <NavbarComponent />
            <div className='main'>
                <main className=''>
                    <div className='container' >
                        <div  style={{ height: '90vh', borderRadius: '30px', padding: '20px', background: 'white', marginBottom: '10px' }}>
                            <div className='manage-users'>
                                <TableUser />
                            </div>
                            <div className='center'>
                                <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#UserModal">เพิ่มผู้ใช้งาน</button>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
            <ModelUserComponent />
        </>
    )
}

export default ManageUserAdmin
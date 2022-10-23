import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const ModelReportRepairComponent = () => {
    const [listEquipment, setListEquipment] = useState([]);
    const [reportRepair, setReportRepair] = useState({
        description: '',
        status: 'รอตรวจสอบ',
        addedBy: '@Nut',
        equipment_id: '',
    })
    const { description, status, equipment_id } = reportRepair
    const inputValue = name => event => {
        setReportRepair({ ...reportRepair, [name]: event.target.value })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_API}/equipments/getEquipment`)
            .then(response => {
                response.status === 200 ? setListEquipment(response.data) : console.log("error")
            })
            .catch((err) => { console.log("Not Working") })
    }

    const submitForm = (e) => {
        // e.preventDefault();
        // console.log({  email, password, repassword, nickname, fname, lname, addedBy, acc_id })
        axios.post(`${import.meta.env.VITE_API}/reports/postReportRepair`, reportRepair)
            .then(response => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
            }).catch(err => { console.log(err) })
    }
    return (
        <>
            <form onSubmit={submitForm} className="modal fade" id="ReportRepairModal" aria-hidden="true" aria-labelledby="ReportRepairModalToggleLabel" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ReportRepairModalToggleLabel">Report</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">อุปกรณ์ : </label>
                                </div>
                                <div className="col-auto">
                                <select className="form-select" value={equipment_id} onChange={inputValue('equipment_id')} required>
                                        <option defaultValue=''>อุปกรณ์</option>
                                        {
                                            listEquipment.map(option => (
                                                <option key={option._id} value={option._id}>{option.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <span className="form-text">
                                        อุปกรณ์ที่ต้องการแจ้งปัญหา.
                                    </span>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">ปัญหา : </label>
                                </div>
                                <div className="col-auto">
                                    <textarea type="text" style={{height: '150px'}} value={description} onChange={inputValue('description')} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span className="form-text">
                                        ปัญหาที่เกิดขึ้น.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" >Create</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ModelReportRepairComponent
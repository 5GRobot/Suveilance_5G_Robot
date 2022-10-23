import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const ModelReportRepairTechComponent = (props) => {
    const [description_tech, setDescription_tech] = useState('');
    const submitForm = (e) => {
         e.preventDefault();
        // console.log(description_tech)
        axios.put(`${import.meta.env.VITE_API}/reports/updateReportRepair`, { data: { id: props.onId, status: 'เสร็จสิ้น', description_tech: description_tech } })
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
                                    <h5><label className="col-form-label">สาเหตุ : </label></h5>

                                </div>
                                <div className="col-auto">
                                    <textarea type="text" style={{ height: '150px' }} value={description_tech} onChange={(e) => { setDescription_tech(e.target.value) }} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span className="form-text">
                                        <h5>ปัญหาเกิดจากอะไร.</h5>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" >เสร็จสิ้น</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ModelReportRepairTechComponent
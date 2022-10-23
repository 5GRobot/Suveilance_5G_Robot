import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
const ModelUserComponent = () => {
    const [listAccount, setListAccount] = useState([]);
    const [user, setUser] = useState({
        email: '',
        password: '',
        repassword: '',
        nickname: '',
        fname: '',
        lname: '',
        addedBy: '@Nut',
        acc_id: '',
    })
    const { email, password, repassword, nickname, fname, lname, addedBy, acc_id } = user
    const inputValue = name => event => {
        setUser({ ...user, [name]: event.target.value })
    }

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async() =>{
        await axios.get(`${import.meta.env.VITE_API}/accounts/getAccount`)
        .then(response => {
            response.status === 200 ? setListAccount(response.data) : console.log("error")
        })
        .catch((err) => { console.log("Not Working") })
    }

    const submitForm = (e) => {
        // console.log({  email, password, repassword, nickname, fname, lname, addedBy, acc_id })
        axios.post(`${import.meta.env.VITE_API}/users/signup`, user)
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
            <form onSubmit={submitForm} className="modal fade" id="UserModal" aria-hidden="true" aria-labelledby="UserModalToggleLabel" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="UserModalToggleLabel">Signup</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">Email : </label>
                                </div>
                                <div className="col-auto">
                                    <input type="email" value={email} onChange={inputValue('email')} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span className="form-text">
                                        อีเมลผู้ใช้งาน.
                                    </span>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">Password : </label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" value={password} onChange={inputValue('password')} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span className="form-text">
                                        อย่างน้อย 8 ตัวอักษร.
                                    </span>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">Password again : </label>
                                </div>
                                <div className="col-auto">
                                    <input type="password" value={repassword} onChange={inputValue('repassword')} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span  className="form-text">
                                        ป้อนรหัสผ่านอีกครั้ง.
                                    </span>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">Nickname : </label>
                                </div>
                                <div className="col-auto">
                                    <input type="text" value={nickname} onChange={inputValue('nickname')} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span  className="form-text">
                                        ชื่อเล่น
                                    </span>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">Fristname : </label>
                                </div>
                                <div className="col-auto">
                                    <input type="text" value={fname} onChange={inputValue('fname')} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span  className="form-text">
                                        ชื่อจริง
                                    </span>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">Lastname : </label>
                                </div>
                                <div className="col-auto">
                                    <input type="text" value={lname} onChange={inputValue('lname')} className="form-control" required />
                                </div>
                                <div className="col-auto">
                                    <span  className="form-text">
                                        นามสกุล
                                    </span>
                                </div>
                            </div>
                            <div className="row g-3 align-items-center" style={{ alignItems: 'center', textAlign: 'center', margin: '5px' }}>
                                <div className="col-auto">
                                    <label className="col-form-label">Account : </label>
                                </div>
                                <div className="col-auto">
                                    {/* <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" /> */}
                                    <select className="form-select" value={acc_id} onChange={inputValue('acc_id')} required>
                                        <option defaultValue=''>ประเภทบัญชี</option>
                                        {
                                            listAccount.map(option => (
                                                <option key={option._id} value={option._id}>{option.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <span id="passwordHelpInline" className="form-text">
                                        {/* Must be 8-20 characters long. */}
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

export default ModelUserComponent
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
const TableUser = () => {
    const [listUser, setListUser] = useState([]);
    const [deleteUser, setDeleteUser] = useState(false)

    useEffect(() => {
        fetchUser();
        setDeleteUser(false)
    }, [deleteUser]);

    const fetchUser = async () => {
        await axios.get(`${import.meta.env.VITE_API}/users/getUser`)
            .then(response => {
                response.status === 200 ? setListUser(response.data) : console.log("error")
            })
            .catch((err) => { console.log("Not Working") })
    }
    const handleDeleteUser = (id) => {
        axios.delete(`${import.meta.env.VITE_API}/users/deleteUser`, { data: { id: id } })
            .then(response => {
                response.status === 200 ? setDeleteUser(true) : console.log("error")
                    .catch((err) => { console.log("Not Working") })
            })
    }
    const columns = [
        {
            name: 'อีเมล',
            selector: row => row.email,
            sortable: true,
            width: '180px',
            // center: true,
        },
        {
            name: 'ชื่อเล่น',
            selector: row => row.nickname,
            sortable: true,
            width: '100px',
            // center: true,
        },
        {
            name: 'ชื่อจริง',
            selector: row => row.fname,
            sortable: true,
            width: '120px',
            // center: true,
        },
        {
            name: 'นามสกุล',
            selector: row => row.lname,
            sortable: true,
            width: '120px',
            // center: true,
        },
        {
            name: 'วันที่สร้าง',
            selector: row => row.createdAt,
            sortable: true,
            width: '140px',
            // center: true,
        },
        {
            name: 'วันที่อัปเดต',
            selector: row => row.updatedAt,
            sortable: true,
            width: '120px',
            // center: true,
        },
        {
            name: 'เพิ่มโดย',
            selector: row => row.addedBy,
            sortable: true,
            width: '90px',
            // center: true,
        },
        {
            name: 'ประเภทบัญชี',
            selector: row => row.acc_id,
            sortable: true,
            maxWidth: 'auto',
            // center: true,
        },
        // {
        //     name: ' ',
        //     selector: row => row.buttons1,
        //     button: true,
        //     // center: true,
        // },
        {
            name: ' ',
            selector: row => row.buttons2,
            button: true,
            // center: true,
        },
        {
            name: ' ',
            selector: row => row.buttons3,
            button: true,
            // center: true,
        },
    ];
    const date = (date) => {
        return date.split('-')[2] + "-" + date.split('-')[1] + "-" + date.split('-')[0];
    }
    return (
        <>
            <DataTable
                title='จัดการผู้ใช้งาน'
                columns={columns}
                data={listUser.map((item, index) => {
                    return {
                        no: index + 1,
                        email: <div href="#" data-mdb-toggle="tooltip" title={item.email}>{item.email}</div>,
                        nickname: <div href="#" data-mdb-toggle="tooltip" title={item.nickname}>{item.nickname}</div>,
                        fname: item.fname,
                        lname: item.lname,
                        addedBy: item.addedBy,
                        createdAt: date(item.createdAt.split('T')[0]),
                        updatedAt: date(item.updatedAt.split('T')[0]),
                        acc_id: item.acc_id.name,
                        buttons2: <button className='btn btn-warning'>แก้ไข</button>,
                        buttons3: <button onClick={() => handleDeleteUser(item._id)} className='btn btn-danger'>ลบ</button>,
                    }
                })}
                pagination />
        </>
    )
}

export default TableUser
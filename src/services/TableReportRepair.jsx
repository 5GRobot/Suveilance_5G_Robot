import React, {useState,useEffect} from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
const TableReportRepair = () => {
    const [listReportRepair, setListReportRepair] = useState([]);
    const [deleteReportRepair, setDeleteReportRepair] = useState(false)

    useEffect(() => {
        fetchData();
        setDeleteReportRepair(false);
    }, [deleteReportRepair]);

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_API}/reports/getReportRepair`)
            .then(response => {
                response.status === 200 ? setListReportRepair(response.data) : console.log("error")
            })
            .catch((err) => { console.log("Not Working") })
    }
    const handleDeleteReportRepair = (id) => {
        axios.delete(`${import.meta.env.VITE_API}/reports/deleteReportRepair`, { data: { id: id } })
            .then(response => {
                response.status === 200 ? setDeleteReportRepair(true) : console.log("error")
                    .catch((err) => { console.log("Not Working") })
            })
    }
    const columns = [
        {
            name: 'อุปกรณ์',
            selector: row => row.equipment_id,
            sortable: true,
            width: '170px',
            // center: true,
        },
        {
            name: 'ปัญหา',
            selector: row => row.description,
            sortable: true,
            width: 'auto',
            wrap: true,
            // center: true,
        },
        {
            name: 'สาเหตุ',
            selector: row => row.description_tech,
            sortable: true,
            width: 'auto',
            wrap: true,
            // center: true,
        },
        {
            name: 'สถานะ',
            selector: row => row.status,
            sortable: true,
            width: 'auto',
            // center: true,
        },
        {
            name: 'วันที่สร้าง',
            selector: row => row.createdAt,
            sortable: true,
            width: 'auto',
            // center: true,
        },
        {
            name: 'วันที่อัปเดต',
            selector: row => row.updatedAt,
            sortable: true,
            width: 'auto',
            // center: true,
        },
        {
            name: 'ผู้แจ้ง',
            selector: row => row.addedBy,
            sortable: true,
            width: '90px',
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
                title='รายงานแจ้งซ่อม'
                columns={columns}
                data={listReportRepair.map((item, index) => {
                    return {
                        no: index + 1,
                        equipment_id: <div href="#" data-mdb-toggle="tooltip" title={item.equipment_id.name}>{item.equipment_id.name}</div>,
                        description: <div href="#" data-mdb-toggle="tooltip" title={item.description}>{item.description}</div>,
                        description_tech:  <div href="#" data-mdb-toggle="tooltip" title={item.description_tech}>{item.description_tech}</div>,
                        status: item.status === 'รอตรวจสอบ' ? <div style={{color:'red'}}>{item.status}</div>: item.status === 'กำลังดำเนินการ'?<div style={{color:'yellow'}}>{item.status}</div> : <div style={{color:'green'}}>{item.status}</div>   ,
                        addedBy: item.addedBy,
                        createdAt: date(item.createdAt.split('T')[0]),
                        updatedAt: date(item.updatedAt.split('T')[0]),
                        buttons2: <button className='btn btn-warning'>แก้ไข</button>,
                        buttons3: <button onClick={() => handleDeleteReportRepair(item._id)} className='btn btn-danger'>ลบ</button>,
                    }
                })}
                pagination />
        </>
  )
}

export default TableReportRepair
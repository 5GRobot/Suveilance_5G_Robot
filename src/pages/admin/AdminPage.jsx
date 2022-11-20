import React, { useEffect } from 'react'
import NavbarComponent from '../../components/NavbarComponent'
import DashboardAdmin from './DashboardAdmin'
const AdminPage = () => {
    useEffect(() => {
        var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
        dataSpyList.forEach(function (dataSpyEl) {
            bootstrap.ScrollSpy.getInstance(dataSpyEl)
                || new bootstrap.ScrollSpy(dataSpyEl, {
                    target: dataSpyEl.getAttribute('data-bs-target') || '#list-example'
                })
        })
    }, [])

    return (
        <>
            {/* <NavbarComponent /> */}
            <div id="list-example" className="list-group" >
                <a className="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
                <a className="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
                <a className="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
                <a className="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
            </div>

            <div className='main'>
                <main className='container'>
                    <div className=''>
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" className="scrollspy-example" >
                            <div id="list-item-1" className='mt-5'>
                                <div></div>
                                <DashboardAdmin />
                                {/* <div>Item 1</div> */}

                            </div>
                            <div id="list-item-2" className='mt-5'>
                                {/* <DashboardAdmin /> */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AdminPage
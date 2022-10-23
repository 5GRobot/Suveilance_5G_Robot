import React from 'react'
import NavbarComponent from './NavbarComponent'
import ImgRobot from '../images/Robot.png'

const EquipmentComponent = () => {
  return (
    <>
      <NavbarComponent />
      <div>EquipmentComponent</div>
      <div className='main'>
        <main>
          <div className='equipment-container'>
            <div className='container image-robot'>
              <div className='center'>
                <img src={ImgRobot} alt='' />
              </div>
              <div className='maintenance'>
                <div className="row justify-content-between">
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 1</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 2</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-3">
                    <div className='status-offline'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'red' }}>Offline</h1> </h1>
                        <h3>อุปกรณ์ที่ 3</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 4</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 5</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 6</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 7</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className='status-offline'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'red' }}>Offline</h1> </h1>
                        <h3>อุปกรณ์ที่ 8</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 9</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className='status-online'>
                      <div className='status-show'>
                        <h1 className='status-value'>Status :&nbsp;<h1 style={{ color: 'green' }}>Online</h1> </h1>
                        <h3>อุปกรณ์ที่ 10</h3>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>


          </div>

        </main>
      </div >
    </>
  )
}

export default EquipmentComponent
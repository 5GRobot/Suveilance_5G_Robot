import * as React from 'react';
import './App.css'
// import LoginComponent from './components/Login/LoginConponent';
import DashboardAdmin from './pages/admin/SuveillanceAdmin'
import Login from './Login'
import './styles/dashboard.scss'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <React.Fragment>
      {/* <LoginComponent /> */}
      <DashboardAdmin/>
      {/* <Login/> */}
    </React.Fragment>
  )
}

export default App

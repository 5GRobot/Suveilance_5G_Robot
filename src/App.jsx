import * as React from 'react';
import './App.css'
// import LoginComponent from './components/Login/LoginConponent';
import DashboardAdmin from './pages/admin/SuveillanceAdmin'
import Login from './Login'
import './styles/dashboard.scss'
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

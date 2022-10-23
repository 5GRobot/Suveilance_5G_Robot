import React, {useEffect,useState} from 'react'
import './styles/login.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';

const Login = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const { username, password } = state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value })
    }
    const submitForm = (e) => {
        e.preventDefault();
       
    }
  return (
    <>
     <div className='background-login'>
                <div className="container-login">
                    <div className="conic">

                        <div className="form-box">
                            <div className="header-form">
                                <h4 className="text-primary text-center"><i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i></h4>
                                <div className="image">
                                </div>
                            </div>

                            <form onSubmit={submitForm}>
                                <div className="body-form">
                                    <div className="form-input-login">
                                        <div className="input-group mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><AccountCircleIcon /></span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Username" value={username}
                                                onChange={inputValue('username')} />
                                        </div>
                                        <div className="input-group mb-1">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><HttpsIcon /></span>
                                            </div>
                                            <input type="password" className="form-control" placeholder="Password" value={password}
                                                onChange={inputValue('password')} />
                                        </div>
                                    </div>
                                    {/* <div className="message">
                                <div><input type="checkbox" /> Remember ME</div>
                                <div><a href="#">Forgot your password</a></div>
                            </div> */}
                                </div>
                                <div className='form-submit'>
                                    <button type="submit" className="btn btn-secondary btn-block">LOGIN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </>
  )
}

export default Login
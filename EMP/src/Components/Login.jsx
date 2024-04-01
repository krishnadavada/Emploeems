import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Css/Login.css'

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        console.log('Submitting login form...');
    
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                localStorage.setItem('userId', result.data.id);
                localStorage.setItem('email', values.email);
                localStorage.setItem('password', values.password);
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => {
            console.error('Error occurred during login:', err);
            setError('An error occurred during login. Please try again later.');
        });

    }
    
    

  return (
    <div className="login">
    <div className="login-container">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" onChange={(e) => setValues({...values, email : e.target.value})} className="form-control" placeholder="Email" />
            <input type="password" onChange={(e) => setValues({...values, password : e.target.value})} className="form-control" placeholder="Password" />
            <button className="btn btn-info">Login</button>
        </form>
    </div>
</div>
  )
}

export default Login
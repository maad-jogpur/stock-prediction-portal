import React, { useContext, useState } from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../AuthProvider'


const Login = () => {

  const[username,setUsername] = useState('')
  const[password,setPassword] = useState('')
  const[loading,setLoading] = useState(false)
  const[errors,setErrors] = useState('')
  const navigate = useNavigate()
  const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)

  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault()

    const userData = {username,password}
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/token/',userData)
      localStorage.setItem('accessToken',response.data.access)
      localStorage.setItem('refreshToken',response.data.refresh)
      console.log("Login Successful!")
      setIsLoggedIn(true)
      setErrors('')
      navigate('/dashboard')
    } catch (error) {
      setErrors('Invalid Credentials!')
      console.log("Login Error====>",error.response.data)

    } finally{
      setLoading(false)
    }
  }
  return (
    <>
      <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 bg-light-dark p-5 rounded">
              <h1 className='text-light text-center mb-3'>Login to our portal</h1>
              {errors && <div className="alert alert-danger m-4">{errors}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e) => (setUsername(e.target.value))} required />
                </div>

                <div className="mb-3">
                  <input type="password" className='form-control' placeholder='Password' value={password} onChange={(e) => (setPassword(e.target.value))} required />
                  <div className="mb-3"></div>
                  {/* {success && <div className='alert alert-success'>Registration Successful!</div> } */}
                </div>
                
                {loading?(
                  <button type="submit" className='btn btn-info center d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>  Logging in...</button>
                ):(
                  <button type="submit" className='btn btn-info center d-block mx-auto'>Submit</button>
                )}
                
            
              </form>
            </div>
          </div>
        </div>
        
    </>
  )
}

export default Login
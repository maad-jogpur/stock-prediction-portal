import React, { useState } from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'





const Register = () => {
    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const [success,setSuccess] = useState(false)
    const [errors,setErrors] = useState({})
    const[loading,setLoading] = useState(false)

    const handleRegistration = async (e) => {
        setLoading(true)
        e.preventDefault()
        const userData = {username,email,password}
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
            console.log('Response========>',response.data)
            console.log('Registration successful')
            setSuccess(true)
            setErrors({})
            
        } catch (error) {
            setSuccess(false)
            setErrors(error.response.data)
            console.error('Registration error: ',error.response.data)
        } finally{
            setLoading(false)
        }
    }

  return (
    <>
        
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-light-dark p-5 rounded">
                    <h1 className='text-light text-center mb-3'>Create an Account</h1>
                    <form onSubmit={handleRegistration}>
                        <div className="mb-3">
                            <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e)=>(setUsername(e.target.value))} required />
                            <small>{errors.username && <div className='text-danger'>{errors.username}</div>}</small>
                        </div>

                        <div className="mb-3">
                            <input type="email" className='form-control' placeholder='Email address' value={email} onChange={(e)=>(setEmail(e.target.value))} required />
                            <small>{errors.email && <div className='text-danger'> {errors.email}</div> }</small>
                        </div>

                        <div className="mb-3">
                            <input type="password" className='form-control' placeholder='Set Password' value={password} onChange={(e)=>(setPassword(e.target.value))} required />
                            <small>{errors.password && <div className='text-danger'>{errors.password}</div> }</small>
                            <div className="mb-3"></div>
                            {success && <div className='alert alert-success'>Registration Successful!</div> }

                        </div>
                        {loading? (
                            <button type="submit" className='btn btn-info center d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Please wait...</button>
                        ) : (
                            <button type="submit" className='btn btn-info center d-block mx-auto'>Submit</button>
                        ) }
                        
                    </form>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Register
import axios from 'axios'
import React, { useEffect } from 'react'
import axiosInstance from '../../axiosInstance'

const Dashboard = () => {
    useEffect(()=> {
        const fetchProtectedData = async () =>{
            try {
                const response = await axiosInstance.get('protected_view/');

                console.log('Success: ', response.data)
            } catch (error) {
                console.error('Error fetching data====',error)
            }
        }
        fetchProtectedData()
    },[])
    
  return (
    <>
        <div className='text-light container'>Dashboard</div>
        {/* <button onClick={fetchProtectedData}>Click to fetch</button> */}
    
    </>
    
  )
}

export default Dashboard
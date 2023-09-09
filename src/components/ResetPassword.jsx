import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_API } from '../config'
const ResetPassword = () => {
  const [password, setPassword]=useState({})
  const navigate=useNavigate()
  const[isValid,setIsValid]=useState(null)
  const {resetToken}=useParams()
  function handleChange(e)
  {
    setPassword({
      ...password,
      [e.target.name]:e.target.value
    })
  }
  async function handleSubmit(e)
  {
    e.preventDefault()
    try {
      const res=await axios.post(`${BACKEND_API}/auth/reset-password/${resetToken}`,password)
      setIsValid(true)
      navigate('/')
    } catch (error) {
      console.log(error.response)
      if(error.response)
      {
        const {status,data}=error.response
        if(status===400 && data.message ==="Invalid or expired token")
        {
          setIsValid(false)
        }
      }
    }
  }
  return (
    <div className='h-screen'>
    <div className="flex justify-center mt-10">
      <div className="bg-[#2E2E2E] drop-shadow-2xl rounded-md p-10 flex">
        <form onSubmit={handleSubmit}>
          <p className='text-xl'>Reset your password</p>
          <div className='mt-3'>
              <label htmlFor="password" className="block text-sm">
                New Password
              </label>
              <input type="password" placeholder="• • • • • • • • " name="password" id="password" className='bg-[#1d1b1b] px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required/>
            </div>
            {isValid===true && <span className='text-xs text-green-500'>Password updated successfully.</span>}
            {isValid===false && <span className='text-xs text-red-500'>Link is expired please reset password again.</span>}
          <div className="mt-4 flex flex-col items-center justify-center">
        <button type="submit" className="mt-4 px-6 py-3 bg-blue-500 text-[#FFFFFF] rounded-lg hover:bg-blue-600 w-full">Change Password</button>
          </div>
         
        </form>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword
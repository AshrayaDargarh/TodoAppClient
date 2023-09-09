import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_API } from '../config';
const Register = () => {
  const [user,setUser]=useState({})
  const navigate=useNavigate()
  function handleChange(e)
  {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  async function handleSubmit(e)
  {
    e.preventDefault()
    try
    {
      const res= axios.post(`${BACKEND_API}/auth/signUp`,user)
      toast.promise(res, {
        pending: "Please wait your profile is being created...",
        success: "Account created successfully", 
        error: "user already exist or invalid credentials!", 
      }).then(()=>{
        navigate('/')
      })
     
    }catch(error)
    {
      if(error.response)
      {
        navigate('/error')
      }
    }
  }
 
  return (
    <div className="flex items-center justify-center mt-14 mb-8">
    <div className="bg-[#2E2E2E] p-8 rounded-lg shadow-lg max-w-md">
      <h3 className="text-2xl font-bold text-[#FFFFFF] text-center">Create your account</h3>
      <form className="mt-4" onSubmit={handleSubmit}>

        <div className="flex flex-col space-y-2">
          <label htmlFor="userName" className=" text-[#FFFFFF]">User Name</label>
          <input type="text"  placeholder='Enter user name' name="userName" id="userName" className="px-4 py-2 border bg-[#1d1b1b] border-gray-300 rounded-lg"  onChange={handleChange} required/>
        </div>

        <div className="flex flex-col space-y-2 mt-2">
              <label htmlFor="firstName" className=" text-[#FFFFFF]">
                First Name
              </label>
              <input type="text" placeholder='Enter your first name' name="firstName" id="firstName" className="px-4 py-2 border  bg-[#1d1b1b] border-gray-300 rounded-lg"   onChange={handleChange}  required/>
            </div>

            <div className="flex flex-col space-y-2 mt-2">
              <label htmlFor="lastName"  className=" text-[#FFFFFF]">
                Last Name
              </label>
              <input type="text" placeholder='Enter your last name' name="lastName" id="lastName" className="px-4 py-2 border bg-[#1d1b1b] border-gray-300 rounded-lg" onChange={handleChange} required/>
            </div>

            <div className="flex flex-col  space-y-2 mt-2">
              <label htmlFor="email" className=" text-[#FFFFFF]">
                Your email
              </label>
              <input type="text" placeholder='name@company.com' name="email" id="email" className="px-4 py-2 border bg-[#1d1b1b] border-gray-300 rounded-lg" onChange={handleChange} required/>
            </div>
           

        <div className="flex flex-col space-y-2 mt-2">
          <label htmlFor="password" className="text-[#FFFFFF]">Password</label>
          <input type="password" placeholder="• • • • • • • • "  id="password" name="password" className="px-4 py-2 border bg-[#1d1b1b]  border-gray-300 rounded-lg"  onChange={handleChange} required/>
        </div>
        
        <button type="submit" className="mt-4 px-6 py-3 bg-blue-500 text-[#FFFFFF] rounded-lg hover:bg-blue-600 w-full">Sign up</button>
      </form>
      <p className="mt-4 text-gray-300 text-center">Already have an account?  <Link to="/" className=" text-[#64B5F6] hover:text-[#FFFFFF]">Sign in</Link></p>
    </div>
    <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
  </div>
   
  )
}

export default Register
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BACKEND_API } from '../config';

const Login = () => {
  const[user,setUser]=useState({})
  const[isValid,setIsValid]=useState(true)

  const {login}=useAuth()
  const navigate=useNavigate()
  
  function handleChange(e)
  {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  async function  handleSubmit(e)
  {
    e.preventDefault()
    try
    {
      const res= axios.post(`${BACKEND_API}/auth/login`,user)
      toast.promise(res, {
        pending: "Please wait for a while...",
        error: "Invalid credentials or user does not exist!", 
      }).then((res)=>{
        if(res.data.doc)
        {
         setIsValid(true)
          login(res.data.token)
         navigate('/create')  
        }
      })    
    }
    catch(err)
    {
      if(err.response)
      {
        const {status}=err.response

        if(status===400)
        {
          setIsValid(false)
        }
      }
    }
  }
  return (
    <div className=''>
      <div className="flex items-center justify-center mt-20">
      <div className="bg-[#2E2E2E] p-8 rounded-lg shadow-lg max-w-md">
        <h3 className="text-2xl font-bold text-[#FFFFFF] text-center">Sign in to your account</h3>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="emailOrUsername" className=" text-[#FFFFFF]">Your email or username</label>
            <input type="text" placeholder='name@company.com' id="emailOrUsername" name="emailOrUsername" className="px-4 py-2 border bg-[#1d1b1b] border-gray-300 rounded-lg"  onChange={handleChange} required/>
          </div> 
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="password" className="text-[#FFFFFF]">Password</label>
            <input type="password" placeholder="• • • • • • • • "  id="password" name="password" className="px-4 py-2 border bg-[#1d1b1b] border-gray-300 rounded-lg"  onChange={handleChange} required/>
          </div>
          <div className="flex items-center justify-end mt-2">
            <Link to='/forgotpassword'  className="text-[#64B5F6] hover:text-[#FFFFFF]">Forgot password?</Link>
          </div>
          <div className='mt-2'>
              <span className='text-xs text-red-500'>{isValid?'':'Please enter correct email or password'}</span>
            </div>
            
          <button type="submit" className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-[#FFFFFF] rounded-lg  w-full">Sign in</button>
        </form>
        <p className="mt-4 text-gray-300 text-center">Don't have an account yet? <Link to='/signup' className=" text-[#64B5F6] hover:text-[#FFFFFF]">Sign up</Link></p>
      </div>
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
  );
}

export default Login
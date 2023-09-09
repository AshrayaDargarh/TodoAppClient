import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin, Triangle } from "react-loader-spinner";
import { BACKEND_API } from "../config";
const initialState={
  userName:'',
  firstName:'',
  lastName:'',
  email:'',
  password:''
}
const Profile = () => {
  const [user, setUser] = useState(initialState);
  const [logo, setLogo] = useState("");
  const {logout}=useAuth()
  const navigate=useNavigate()
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_API}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({_id:res.data._id,userName:res.data.userName,firstName:res.data.firstName,lastName:res.data.lastName,email:res.data.email,password:''});
      setLogo(res.data.firstName[0].toUpperCase());
    } catch (error) {
      logout()
      navigate('/unauthorized')
    }
  }
  async function handleSubmit(e)
  {
    e.preventDefault()
    try{
      const token=localStorage.getItem('token')
      if(user.password==='')
      {
        delete user.password
      }
      const res=await axios.patch(`${BACKEND_API}/user/${user._id}`,user,{headers:{Authorization:`Bearer ${token}`}})
      if(res.data)
      {
        toast.success('Profile updated successfully');
      }
    }catch(error)
    {
      console.log(error.response)
    }
  }
  function handleChange(e)
  {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  return user.email===''?<div className="h-screen flex justify-center"><TailSpin
  height="80"
  width="80"
  color="#64B5F6"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></div>:  (
      <div className="flex flex-col items-center  min-h-screen">
      <div className="flex items-center md:flex-row md:gap-0 gap-4 flex-col justify-center w-full h-32 ">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#09afd8e1]  text-6xl font-bold">
          {logo}
        </div>
        <div className="ml-4 text-gray-200 text-2xl font-semibold">
          Welcome, {user.firstName +" "+user.lastName}!
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 mt-8 bg-[#2E2E2E] rounded-lg shadow-lg">
        <div className="flex flex-col mb-4">
          <label htmlFor="userName" className="mb-2 text-gray-200 font-medium">Username</label>
          <input type="text" id="userName" name="userName" value={user.userName} onChange={handleChange}
          required
           className="p-2 bg-[#1d1b1b] rounded-md  border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1"/>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="firstName" className="mb-2 text-gray-200 font-medium">First Name</label>
          <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange}
          required
          className="p-2 bg-[#1d1b1b] rounded-md  border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1"/>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="lastName" className="mb-2 text-gray-200 font-medium">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange}
          required
          className="p-2 bg-[#1d1b1b] rounded-md  border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1"/>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-2 text-gray-200 font-medium">Email</label>
          <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="p-2 bg-[#1d1b1b] rounded-md  border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1" readOnly/>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="mb-2 text-gray-200 font-medium">Change Password</label>
          <input type="password" id="password" name="password"  onChange={handleChange} className="p-2 bg-[#1d1b1b] rounded-md  border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1"/>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium">Update Profile</button>
          <button type="button" onClick={logout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-medium">Logout</button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
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

export default Profile;

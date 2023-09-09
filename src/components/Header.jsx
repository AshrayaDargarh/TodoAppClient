import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CreateIcon from "../assets/icons/CreateIcon";
import ViewIcon from "../assets/icons/ViewIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import LoginIcon from "../assets/icons/LoginIcon";
const Header = () => {
  const { isLoggedIn,logout } = useAuth();
  return (
    <>
    {isLoggedIn?
    <div className="nav-times mb-8">
        <ul className="flex flex-wrap justify-center items-center sm:flex-row flex-col sm:gap-0 gap-3">
          <li className="px-6">
            <Link to='/create' className="flex items-center text-2xl font-bold gap-2 "><img src="../../logo.svg"/><span>TodoApp</span></Link> 
          </li>
         
          <li className="px-6">
            <Link to='/create'> <button className=" px-3 py-2 rounded-md ` bg-[#2E2E2E] hover:bg-[#1E1E1E]  hover:duration-300 transition-all flex justify-center gap-2 items-center "><CreateIcon /> Create</button></Link>
          </li>
          <li className="px-6">
            <Link to='/view'>
            <button className=" px-3 py-2 rounded-md  bg-[#2E2E2E]  hover:bg-[#1E1E1E] hover:duration-300 transition-all flex justify-center gap-2 items-center ">
             <ViewIcon/> View</button></Link>
          </li>
          <li className="px-6 ">
            <Link to='/profile'>
            <button className=" px-3 py-2 rounded-md  bg-[#2E2E2E]  hover:bg-[#1E1E1E] hover:duration-300 transition-all flex justify-center gap-2 items-center ">
             <ProfileIcon/> Profile</button></Link>
          </li>
        </ul>
    <div className='border border-gray-500 mt-2'></div>
      </div>:
      <div className="nav-times">
        <ul className="flex flex-wrap justify-center items-center sm:flex-row flex-col sm:gap-0 gap-3">
        <li className="">
            <Link to='/' className="flex items-center  text-2xl font-bold gap-2"><img src="../../logo.svg"/><span>TodoApp</span></Link> 
        </li>
        <li className="px-6">
            <Link to='/'>
            <button className=" px-3 py-2 rounded-md  bg-[#2E2E2E] hover:bg-[#1E1E1E] hover:duration-300 transition-all flex justify-center gap-2 items-center ">
            <LoginIcon/> Home</button></Link>
          </li>
        </ul>
      </div>}
    </>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_API } from "../config";
import { useAuth } from "../context/AuthContext";
const Create = () => {
  const [snippet, setSnippet] = useState({});
  const navigate = useNavigate();
  const {logout}=useAuth()

  async function getUser(token)
  {
    try
    {
      const res = await axios.get(`${BACKEND_API}/user`,{headers:{Authorization:`Bearer ${token}`}})
      if(res.data.userName)
      {
        const userName=res.data.userName
        setSnippet({userName:userName})
      }
    }
    catch(err)
    {
      if(err.response)
      {
        const {status,data}=err.response
        console.log(`Status ${status} + Data ${data}`)
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (!token) {
      navigate("/login");
    }
    else
    {
      getUser(token)
    }
  }, []);

  function handleChange(e) {
    setSnippet({
      ...snippet,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BACKEND_API}/todo`, snippet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Status=',res.data)
      if (res) {
        window.alert("Snippet Created Successfully.");
        navigate("/view");
      }
    } catch (err) {
    }
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-32  py-8 ">
     
      <div className="md:w-1/2">
        <h3 className="text-3xl font-bold text-FFFFFF ">Enter your task here</h3>
        <textarea
         name="data"
         id="data"
          className="bg-[#1d1b1b]  border-[#64B5F6] border-[2px] focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-2  mt-4 px-4 py-2 rounded-lg w-full h-[40rem] custom-shadow"
          placeholder="Enter your code here..."
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className=" mt-8 lg:mt-0">
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-lg text-FFFFFF">Enter the todo title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="px-4 py-2 border bg-[#1d1b1b]   border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1  rounded-lg"
            placeholder="Enter a title for your snippet..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col space-y-2 mt-2">
        <label htmlFor="title" className="text-lg text-FFFFFF">Select task status:</label>
          <select 
          name="taskStatus"
            className="px-4 py-2 border bg-[#1d1b1b]   border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1  rounded-lg"
          id="taskStatus"
          onChange={handleChange}
          >
            <option value={"Not Started"}>Not Started</option>
            <option value={"In Progress"}>In Progress</option>
            <option value={"Completed"}>Completed</option>
          </select>
        </div>
      
        <button
          className="mt-4 px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600 w-full"
        >
          Create Todo
        </button>
      </div>
      
    </div>
    </form>
    
  );
};

export default Create;

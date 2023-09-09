import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from "react-loader-spinner";
import { BACKEND_API } from "../config";


const TodoUpdate = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState({
    title: "",
    data: "",
    taskStatus: "",
    userName:''
  });
  const navigate = useNavigate();
  
  async function getSnippet(token) {
    try {
      console.log('Token=',token)
      console.log("Id is=",id)
      const res = await axios.get(`${BACKEND_API}/todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Got the snippets=",res.data)

      if(res.data)
      {
        setSnippet(res.data);
      }
    } catch (error) { 
      // navigate('/unauthorized')
    }
  }

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
    getSnippet(token);
    getUser(token);
  }, []);
  function handleChange(e) {
    setSnippet({
      ...snippet,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {

      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${BACKEND_API}/todo/${id}`,
        snippet,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Patch res',res.data)
      if(res.data)
      {
        toast.success('Snippet updated successfully.');
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      if (window.confirm("Do you really want to delete this?")) {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${BACKEND_API}/todo/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        navigate("/view");
      }
    } catch (error) {
        // navigate('/unauthorized')
    }
  }
 
  return  !snippet.userName?<div className="h-screen flex justify-center">
    <TailSpin
  height="80"
  width="80"
  color="#64B5F6"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></div>:(
  
    <div className="bg-inherit pb-10  overflow-hidden">        
          <>
          <form onSubmit={handleUpdate}>
          <div className="flex flex-col lg:flex-row items-center justify-center lg:gap-32  py-8 ">
            
            <div className="md:w-1/2">
            <h3 className="text-3xl font-bold text-FFFFFF ">Update your todo</h3>
            <textarea
             name="data"
             id="data"
             value={snippet.data}
              className="bg-[#1d1b1b]  border-[#64B5F6] border-[2px] focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-2  mt-4 px-4 py-2 rounded-lg w-full h-[40rem] custom-shadow"
              placeholder="Enter your code here..."
              onChange={handleChange}
              required
            ></textarea>
          </div>
           
            
            <div className="md:w-96 mt-8 lg:mt-0">
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-lg text-FFFFFF">Enter the todo title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
               value={snippet.title}
                  className="px-2 py-2 border bg-[#1d1b1b]   border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1  rounded-lg"
                  placeholder="Enter a title for your snippet..."
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-2 mt-2">
        <label htmlFor="title" className="text-lg text-FFFFFF">Select task status:</label>
          <select 
          name={"taskStatus"}
            className="px-4 py-2 border bg-[#1d1b1b]   border-[#64B5F6]  focus:border-none  focus:ring-[#64B5F6] focus:ring-offset-[#64B5F6] focus:ring-offset-1  rounded-lg"
          id="taskStatus"
          value={snippet.taskStatus}
          onChange={handleChange}
          >
          <option value={"Not Started"}>Not Started</option>
          <option value={"In Progress"}>In Progress</option>
          <option value={"Completed"}>Completed</option>
          </select>
        </div>
                    <div className="flex flex-col space-y-2 mt-4">
                  <button
                    className="px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600 w-full"
                  >
                    Update Todo
                  </button>
                  
                    <button
                    onClick={handleDelete}
                  type="button"
                    className=" px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600 w-full"
                  >
                      Remove Todo
                  </button>
                   
                  </div>
            </div>
          </div>
          </form>
          </>
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
};

export default TodoUpdate;

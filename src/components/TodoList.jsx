import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { BACKEND_API } from '../config'
import { TailSpin } from 'react-loader-spinner'

const TodoList = () => {

  const { logout } = useAuth()
  const navigate = useNavigate()
    const [currentList, setCurrentList] = useState([]);
    const [allTodos, setAllTodos] = useState([]);
    const [loading, setLoading] = useState(false)
    const [notFound,setNotFound]=useState(false)
    const [show,setShow]=useState(true)

  function handleButtonClick(category) {
    if (category == "Not Started") {
        setLoading(true)
        setShow(false)
        getFromDB(category)
    }
    else if (category == "In Progress") {
      setLoading(true)
      setShow(false)
        getFromDB(category)

    }
    else if (category == "Completed") {
      setLoading(true)
      setShow(false)
        getFromDB(category)
    }
    else if (category == "AllTask") {
      setLoading(true)
      setShow(true)
      setCurrentList([])
      getAllTodos()
    }
}
async function getFromDB(category)
{
  try {
        const token = localStorage.getItem('token')
        const res =await axios.get(`${BACKEND_API}/todo/taskStatus/${category}`, { headers: { 'Authorization': `Bearer ${token}` } })
          
            setLoading(false)
              setCurrentList(res.data)
              setNotFound(false)
            if(res.data.length===0)
            {
              setNotFound(true)
            }
            
      }
      catch(error)
      {
        logout()
        navigate('/unauthorized')
      }
}
async function getAllTodos()
    {
        try {
        const token=localStorage.getItem('token')
        const res=await axios.get(`${BACKEND_API}/todo`,{headers:{'Authorization':`Bearer ${token}`}})
        setLoading(false)
        setAllTodos(res.data)          
        setNotFound(false)
        if(res.data.length===0)
        {
          setNotFound(true)
        }
        } 
        catch (error) {
        setLoading(false)

             navigate('/unauthorized')
        }
    }
useEffect(()=>{
  setLoading(true)
getAllTodos()
},[])

  return (
    <>
    <section className="md:px-32 px-4 py-8 mt-2 overflow-hidden">
    <p className='text-center'>Please select the task you want to see.</p>

        <div className="flex md:flex-row flex-col justify-center gap-2 mt-4">
          <button
            onClick={() => handleButtonClick("Not Started")}
            className="px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600"
          >
            Not Started
          </button>
          <button
            className="px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600"
            onClick={() => handleButtonClick("In Progress")}
          >
            In Progress
          </button> 
          <button
            className="px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600 "
            onClick={() => handleButtonClick("Completed")}
          >
            Completed
          </button>
          <button
            className="px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600 "
            onClick={() => handleButtonClick("AllTask")}
          >
            All Task
          </button>
        </div>
        {
          loading &&
          <div className='flex justify-center mt-10'>
            <TailSpin
              height="80"
              width="80"
              color="#64B5F6"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /></div>
        }

        {
        show&& allTodos&&
         <div className={loading?'hidden':"mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "}>
         {
           allTodos.map(allTodo =><Link to={'/todoupdate/' + allTodo._id} key={allTodo._id}><Todo key={allTodo._id}  {...allTodo} /> </Link>)
         }
       </div> 
        }
        {
       currentList&&
         <div className={loading?'hidden':"mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 "}>
         {
           currentList.map(currentTodo =><Link to={'/todoupdate/' + currentTodo._id} key={currentTodo._id}><Todo key={currentTodo._id}  {...currentTodo} /> </Link>)
         }
       </div> 
        }
        {notFound &&
        <p className={loading?'hidden':'text-center mt-4'}>No items found.</p>
        } 
      </section>
     
    </>
    
  )
      
    
}

export default TodoList
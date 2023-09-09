import React from 'react'

const Todo = ({title,data,taskStatus}) => {
 
  return (
      <>
      <div className=" bg-[#2E2E2E]  p-4 rounded-lg shadow-lg flex flex-col ">
        <div className='flex justify-between'>
        <h4 className="mt-4 text-xl font-bold text-gray-200">{title}</h4>
        <h4 className="mt-4 text-xl font-bold text-gray-200">{taskStatus}</h4>

        </div>
        <p className="mt-2  border leading-7 overflow-hidden h-28 text-gray-300  p-2">
        {data.substring(0, 150)}...
        </p>
        <button
          className="mt-4 px-6 py-3 bg-blue-500 text-FFFFFF rounded-lg hover:bg-blue-600 w-full"
        >
          View/Edit
        </button>
      </div>
      </>
  
  )
}

export default Todo
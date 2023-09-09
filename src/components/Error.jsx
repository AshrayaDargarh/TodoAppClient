import React from 'react'
import { useRouteError } from 'react-router'
import { Link } from 'react-router-dom'
function Error() {
    const err=useRouteError()
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-[#2E2E2E] p-8 rounded-lg shadow-lg max-w-md">
        <h3 className="text-4xl font-bold text-red-600 text-center">OOPS!</h3>
        <p className="mt-4  text-gray-300 text-center">
          The page you are looking for does not exist. Maybe you typed the wrong address or followed a broken link. Don’t worry, you can go back to the homepage.
        </p>
       <Link to={'/'}> <button type="button" className="mt-4 px-6 py-3 bg-blue-500 text-[#FFFFFF] rounded-lg hover:bg-blue-600 w-full">Home</button></Link>
      </div>
    </div>
  )
}

export default Error
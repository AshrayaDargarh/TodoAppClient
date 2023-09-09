import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={appRouter} />
  </>,
)

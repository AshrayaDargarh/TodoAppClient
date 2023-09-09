import Header from './components/Header'
import Create from './components/Create'
import Profile from './components/Profile'
import Error from './components/Error'
import Login from './components/Login'
import Register from './components/Register'
import { createBrowserRouter,Outlet } from 'react-router-dom'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import { AuthProvider } from './context/AuthContext'
import TodoList from './components/TodoList'
import TodoUpdate from './components/TodoUpdate'
import Unauthorized from './components/Unauthorized'
function App() {
  
  return (
    <>
    <div className=" text-white  font-display">
    <AuthProvider>
    <Header/>
     <Outlet/>
     </AuthProvider>
    </div>
    </>
  )
} 
export const appRouter=createBrowserRouter([{
  path:"/",
  element:<App/>,
  errorElement:<Error/>,
  children:[
    {
      path:"/",
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Register/>
    },
   
   {
    path:'/forgotpassword',
    element:<ForgotPassword/>
   },
    {
    path:'/auth/reset-password/:resetToken',
    element:<ResetPassword/>
    }, 
    {
      path:"/create",
      element:<Create/>
    },
    {
      path:"/view",
      element:<TodoList/>
    },
    {
      path:"/todoupdate/:id",
      element:<TodoUpdate/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/error",
      element:<Error/>
    },
  ]
}
,
    {
      path:'/unauthorized',
      element:<Unauthorized/>,
    errorElement:<Error/>
    }

])
export default App

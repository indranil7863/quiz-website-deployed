import React, { useEffect } from 'react'

import DashboardPage from './pages/DashboardPage'
import FloatingShape from './components/FloatingShape'
import {Routes, Route, Navigate} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import {Toaster} from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import LoadingSpinner from './components/LoadingSpinner';
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'

import Home from './component/Home';
import Question from './component/Questions';
import Result from './component/Result';
import { ShowResult } from './component/ShowResult';


// protect routes that require authentication
const ProtectedRoute = ({children}) =>{
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to='/login' replace />
  }

  if(!user.isVerified){
    return <Navigate to='/verify-email' replace />
  }
  return children;
}


// redirect authenticated usrs to the home page
const RedirectAuthenticatedUser = ({children}) =>{
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
  return children;
}




function App() {
  const { checkAuth, isCheckingAuth ,isAuthenticated, user} = useAuthStore();

  useEffect(() =>{
    checkAuth();
  },[checkAuth]);
  if(isCheckingAuth) return <LoadingSpinner />
  console.log("isauthenticated", isAuthenticated);
  console.log("user: ", user);

  return (
    <div className='min-h-screen bg-gradient-to-br
    from-gray-500 via-blue-500 to-emerald-900 flex item-center justify-center  relative overflow-hidden'>

      <FloatingShape color='bg-green-900' size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color='bg-emerald-900' size="w-48 h-48" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-lime-900" size="w-32 h-32" top="40%" left="-10%" delay={2}/>

      <Routes>
        <Route  path='/' element={
          <ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute>
        } />
        <Route  path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
        } />
        <Route  path='/login' element={
          <RedirectAuthenticatedUser>
          <LoginPage/>
        </RedirectAuthenticatedUser>
        } />
        <Route  path='/verify-email' element={<EmailVerificationPage />}/>
        <Route  path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenticatedUser>
        }/>

        <Route
          path='/reset-password/:token'
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage/>
            </RedirectAuthenticatedUser>
          }
        />
        {/* catch all routes */}
        <Route path="*" element={<Navigate to='/' replace/>}>

        </Route>
        <Route path={'/home'} element={<Home/>}/>
        <Route path={'/questions'} element={<Question/>} />
        <Route path={'/result'} element={<Result/>} />
        <Route path={'/show-result'} element={<ShowResult/>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App

import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import CoursePage from './pages/CoursePage'
import Profile from './pages/Profile'
const PrivateRoute = ({children})=>{const token=localStorage.getItem('token');return token?children:<Navigate to='/'/>}
export default function App(){return (<div className='min-h-screen bg-gray-900 text-white'><Routes><Route path='/' element={<LoginPage/>}/><Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/><Route path='/course/:id' element={<PrivateRoute><CoursePage/></PrivateRoute>}/><Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/></Routes></div>)}
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.scss'
import MainPage from './pages/MainPage'
import UserPage from './pages/UserPage'
import ProtectedRoute from './utils/ProtectedRoute'
import Header from './components/Elements/Header/Header'
import Footer from './components/Elements/Footer/Footer'
import Loader from './components/Elements/Loader/Loader'
import PhotoGalary from './pages/PhotoGalary'
import { useAppDispatch } from './hooks/redux'
import { refresh } from './redux/actions/authActions'
import BlogPage from './pages/BlogPage'
import PostPage from './pages/PostPage'
import { AppProvider } from './provider/app'
import { AppRoutes } from './routes'

function App() {

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(refresh())
    }
  })

  return (
    <>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </>
  )
}

export default App

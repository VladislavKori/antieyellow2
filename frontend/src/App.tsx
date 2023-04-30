
// libs
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import { useAppDispatch } from './hooks/redux'
import { refresh } from './redux/actions/authActions'

import { AppProvider } from './provider/app'
import { AppRoutes } from './routes'

import './App.scss'

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

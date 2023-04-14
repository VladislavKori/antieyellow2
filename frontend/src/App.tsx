import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage'
import UserPage from './pages/UserPage'
import ProtectedRoute from './utils/ProtectedRoute'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import Header from './components/Elements/Header/Header'
import Footer from './components/Elements/Footer/Footer'
import Loader from './components/Elements/Loader/Loader'
import PhotoGalary from './pages/PhotoGalary'
import { useAppDispatch } from './hooks/redux'
import { refresh } from './redux/actions/userActions'

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(refresh())
    }
  }, [])

  return (
    <React.Suspense fallback={<Loader />}>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={
              <MainPage />
            } />
            <Route path="/galary" element={<PhotoGalary />} />
            <Route path="/:userId" element={<UserPage />} />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App

import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'

import HomePages from './pages/HomePages.jsx';
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx';
import SettingsPages from './pages/SettingPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { Loader2 } from 'lucide-react';

import {Routes, Route, Navigate} from "react-router-dom";
import { axiosInstance } from './lib/axios.js';
import { useAuthStore } from './store/useAuthStore.js';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const {authUser, checkAuth,isCheckingAuth}=useAuthStore()

  useEffect(() => {
    checkAuth();
  },[checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) return(
    <div className='flex justify-center items-center h-screen'>
      <Loader2 className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={authUser ?<HomePages /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ?<LoginPage />: <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPages />} />
        <Route path="/profile" element={authUser ?<ProfilePage />: <Navigate to="/login" />} />

      </Routes>

      <Toaster/>
    </div>
  )
}

export default App;